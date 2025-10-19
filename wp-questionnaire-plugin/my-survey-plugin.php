<?php
/*
Plugin Name: Amroody Damoun Send Code (Pro)
Description: پرسشنامه با ارسال و تایید کد SMS — نسخه بهینه‌سازی شده
Version: 2.0
Author: Milad Amroody
Text Domain: damoun-questionnaire
*/

if (!defined('ABSPATH')) exit;

// مسیرها
define('AMROODY_PLUGIN_URL', plugin_dir_url(__FILE__));
define('AMROODY_PLUGIN_PATH', plugin_dir_path(__FILE__));
require_once AMROODY_PLUGIN_PATH . 'includes/form-handler.php';
require_once AMROODY_PLUGIN_PATH . 'includes/admin-page.php';
require_once AMROODY_PLUGIN_PATH . 'includes/install.php';

// Ensure DB table is created on plugin activation
register_activation_hook(__FILE__, 'amroody_install');

// شروع Session
add_action('init', function() {
    if (!session_id()) {
        @session_start();
    }
});

// بارگذاری CSS/JS فقط اگر شورتکد وجود دارد
add_action('wp_enqueue_scripts', function () {
    if (!is_singular()) return;
    global $post;
    if (!$post) return;

    $check = has_shortcode($post->post_content, 'damoun_quiz') 
          || has_shortcode($post->post_content, 'amroody_survey') 
          || has_shortcode($post->post_content, 'survey_form');

    if ($check) {
        wp_enqueue_style('amroody-style', AMROODY_PLUGIN_URL . 'css/style.css', [], '2.0');
        wp_enqueue_script('amroody-script', AMROODY_PLUGIN_URL . 'js/script.js', ['jquery'], '2.0', true);
        wp_localize_script('amroody-script', 'amroody_ajax', [
            'url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('amroody_nonce'),
        ]);
    }
});

// شورتکد
function amroody_render_form_shortcode() {
    ob_start();
    include AMROODY_PLUGIN_PATH . 'templates/form.php';
    return ob_get_clean();
}
add_shortcode('damoun_quiz', 'amroody_render_form_shortcode');
add_shortcode('amroody_survey', 'amroody_render_form_shortcode');
add_shortcode('survey_form', 'amroody_render_form_shortcode');

// ارسال کد
add_action('wp_ajax_amroody_send_code', 'amroody_send_code');
add_action('wp_ajax_nopriv_amroody_send_code', 'amroody_send_code');
function amroody_send_code() {
    check_ajax_referer('amroody_nonce', 'nonce');

    $phone = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
    if (!preg_match('/^09\d{9}$/', $phone)) {
        wp_send_json_error('شماره موبایل معتبر نیست');
    }

    // جلوگیری از اسپم (یک کد در هر دقیقه)
    if (get_transient('amroody_rate_' . $phone)) {
        wp_send_json_error('لطفا کمی بعد دوباره تلاش کنید.');
    }
    set_transient('amroody_rate_' . $phone, 1, 60);

    $verify_code = rand(1000, 9999);
    set_transient('amroody_verify_' . $phone, $verify_code, 5 * MINUTE_IN_SECONDS);

    // اتصال به SMS.ir
    $apiKey     = 'BCOj4GooJuMdHAtVpS18kvqUbsKQY0cccd7EukCPmUAZIhcz';
    $templateId = 954512;
    $url = 'https://api.sms.ir/v1/send/verify';

    $body = [
        "mobile"     => $phone,
        "templateId" => intval($templateId),
        "parameters" => [
            ["name" => "CODE", "value" => (string)$verify_code]
        ]
    ];

    $response = wp_remote_post($url, [
        'headers' => [
            'Content-Type' => 'application/json',
            'Accept'       => 'application/json',
            'x-api-key'    => $apiKey
        ],
        'body' => wp_json_encode($body),
        'timeout' => 15
    ]);

    if (is_wp_error($response)) {
        wp_send_json_error('خطا در اتصال به سامانه پیامکی');
    }

    $code = wp_remote_retrieve_response_code($response);
    if ($code >= 200 && $code < 300) {
        wp_send_json_success('کد تایید ارسال شد');
    } else {
        wp_send_json_error('خطا در ارسال پیامک');
    }
}

// تایید کد
add_action('wp_ajax_amroody_verify_code', 'amroody_verify_code');
add_action('wp_ajax_nopriv_amroody_verify_code', 'amroody_verify_code');
function amroody_verify_code() {
    check_ajax_referer('amroody_nonce', 'nonce');

    $phone = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
    $code  = isset($_POST['code']) ? sanitize_text_field($_POST['code']) : '';

    if (!preg_match('/^09\d{9}$/', $phone)) {
        wp_send_json_error('شماره موبایل نامعتبر');
    }

    $saved = get_transient('amroody_verify_' . $phone);
    if ($saved && (string)$saved === (string)$code) {
        delete_transient('amroody_verify_' . $phone);
        $_SESSION['phone_verified'] = true;
        $_SESSION['verified_phone'] = $phone;
        wp_send_json_success('ok');
    } else {
        wp_send_json_error('کد اشتباه است یا منقضی شده');
    }
}
