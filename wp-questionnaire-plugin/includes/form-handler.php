<?php
// includes/form-handler.php
if (!defined('ABSPATH')) exit;

/**
 * ثبت اکشن‌های فرم (برای کاربران لاگین و مهمان)
 */
add_action('admin_post_amroody_save_survey',        'amroody_save_survey_handler');
add_action('admin_post_nopriv_amroody_save_survey', 'amroody_save_survey_handler');

function amroody_save_survey_handler() {
    global $wpdb;

    // 1) nonce check
    if (empty($_POST['amroody_nonce']) || !wp_verify_nonce($_POST['amroody_nonce'], 'amroody_form_submit')) {
        amroody_redirect_back(['err' => 'invalid_nonce']);
    }

    // 2) session check for phone verification
    if (empty($_SESSION['phone_verified']) || $_SESSION['phone_verified'] !== true) {
        amroody_redirect_back(['err' => 'not_verified']);
    }

    $table = $wpdb->prefix . 'amroody_survey';

    // 3) Gather meta info
    $ip         = isset($_SERVER['REMOTE_ADDR'])     ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '';
    $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_USER_AGENT'])) : '';

    // Determine page_url: priority: hidden _page_url > HTTP_REFERER > current permalink > home
    $page_url_post = isset($_POST['_page_url']) ? esc_url_raw($_POST['_page_url']) : '';
    $referer       = isset($_SERVER['HTTP_REFERER']) ? esc_url_raw(wp_unslash($_SERVER['HTTP_REFERER'])) : '';
    $page_url      = $page_url_post ?: ($referer ?: (is_singular() ? get_permalink() : home_url('/')));

    // 4) phone (from session if present)
    $phone = '';
    if (!empty($_SESSION['verified_phone'])) {
        $phone = sanitize_text_field($_SESSION['verified_phone']);
    } elseif (!empty($_POST['phone'])) {
        // fallback if posted
        $phone = sanitize_text_field($_POST['phone']);
    }

    // 5) Base field: dependents (with fallback)
    $dependents = null;
    if (isset($_POST['dependents']) && $_POST['dependents'] !== '') {
        $dependents = intval($_POST['dependents']);
    } else {
        // fallback: if q2 is numeric, treat as dependents
        if (isset($_POST['q2']) && ctype_digit((string)$_POST['q2'])) {
            $dependents = intval($_POST['q2']);
        }
    }

    // 6) Scale fields q1..q16 (allow null if not provided)
    $scales = [];
    for ($i = 1; $i <= 16; $i++) {
        $key = 'q' . $i;
        if (isset($_POST[$key]) && $_POST[$key] !== '' && ctype_digit((string)$_POST[$key])) {
            $scales[$key] = intval($_POST[$key]);
        } else {
            $scales[$key] = null;
        }
    }

    // 7) Extra fields
    $q17 = isset($_POST['q17']) ? sanitize_text_field($_POST['q17']) : '';
    $q18 = isset($_POST['q18']) ? sanitize_text_field($_POST['q18']) : '';
    $suggestions = isset($_POST['suggestions']) ? sanitize_textarea_field($_POST['suggestions']) : '';

    // 8) Minimal validation (only for critical inputs)
    if ($dependents === null || $dependents < 0) {
        amroody_redirect_back(['err' => 'required']);
    }

    // 9) Insert into DB
    $data = [
        'submitted_at' => current_time('mysql'),
        'ip'           => $ip,
        'page_url'     => $page_url,
        'user_agent'   => $user_agent,
        'phone'        => $phone,
        'dependents'   => $dependents,
        'q1'  => $scales['q1'],
        'q2'  => $scales['q2'],
        'q3'  => $scales['q3'],
        'q4'  => $scales['q4'],
        'q5'  => $scales['q5'],
        'q6'  => $scales['q6'],
        'q7'  => $scales['q7'],
        'q8'  => $scales['q8'],
        'q9'  => $scales['q9'],
        'q10' => $scales['q10'],
        'q11' => $scales['q11'],
        'q12' => $scales['q12'],
        'q13' => $scales['q13'],
        'q14' => $scales['q14'],
        'q15' => $scales['q15'],
        'q16' => $scales['q16'],
        'q17' => $q17,
        'q18' => $q18,
        'suggestions' => $suggestions,
    ];

    $inserted = $wpdb->insert($table, $data);

    if ($inserted === false) {
        // Log DB error in debug mode
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('[Amroody Survey] DB Insert Error: ' . $wpdb->last_error);
            error_log('[Amroody Survey] Data: ' . print_r($data, true));
        }
        amroody_redirect_back(['err' => 'db']);
    }

    // success
    amroody_redirect_back(['ok' => 1]);
    exit;
}

/**
 * Helper to redirect back with query params
 */
function amroody_redirect_back($params = []) {
    // preferred URL from hidden _page_url, then referer, then home
    $page_url_post = isset($_POST['_page_url']) ? esc_url_raw($_POST['_page_url']) : '';
    $referer       = isset($_SERVER['HTTP_REFERER']) ? esc_url_raw(wp_unslash($_SERVER['HTTP_REFERER'])) : '';
    $base_url      = $page_url_post ?: ($referer ?: home_url('/'));

    $sep = (strpos($base_url, '?') === false) ? '?' : '&';
    wp_safe_redirect($base_url . $sep . http_build_query($params));
    exit;
}
