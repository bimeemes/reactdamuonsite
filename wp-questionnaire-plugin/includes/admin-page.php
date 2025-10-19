<?php
// includes/admin-page.php
if (!defined('ABSPATH')) exit;

function amroody_register_admin_menu() {
    add_menu_page(
        'پاسخ‌های پرسشنامه دامون',
        'پرسشنامه دامون',
        'manage_options',
        'amroody_survey_admin',
        'amroody_render_admin_page',
        'dashicons-feedback',
        26
    );
}
add_action('admin_menu', 'amroody_register_admin_menu');

/**
 * صفحه نمایش لیست + خروجی CSV
 */
function amroody_render_admin_page() {
    global $wpdb;
    $table = $wpdb->prefix . 'amroody_survey';

    // خروجی CSV
    if (isset($_GET['export']) && $_GET['export'] === 'csv' && current_user_can('manage_options')) {
        amroody_export_csv($table);
    }

    $per_page = 20;
    $paged = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
    $offset = ($paged - 1) * $per_page;

    $total = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$table}");
    $rows = $wpdb->get_results(
        $wpdb->prepare("SELECT * FROM {$table} ORDER BY id DESC LIMIT %d OFFSET %d", $per_page, $offset),
        ARRAY_A
    );

    $total_pages = max(1, ceil($total / $per_page));

    echo '<div class="wrap">';
    echo '<h1>پاسخ‌های پرسشنامه دامون</h1>';

    echo '<p><a class="button button-primary" href="' . esc_url(add_query_arg(['export' => 'csv'])) . '">دانلود CSV</a></p>';

    if (!$rows) {
        echo '<p>هنوز پاسخی ثبت نشده است.</p>';
        echo '</div>';
        return;
    }

    // ...existing code...

    echo '<table class="widefat striped">';
    echo '<thead><tr>
        <th>کد</th>
        <th>زمان</th>
        <th>IP</th>
        <th>موبایل</th>
        <th>تکفل</th>
        <th>q1</th>
        <th>q2</th>
        <th>q3</th>
        <th>q4</th>
        <th>q5</th>
        <th>q6</th>
        <th>q7</th>
        <th>q8</th>
        <th>q9</th>
        <th>q10</th>
        <th>q11</th>
        <th>q12</th>
        <th>q13</th>
        <th>q14</th>
        <th>q15</th>
        <th>q16</th>
        <th>q17</th>
        <th>q18</th>
        <th>پیشنهادات</th>
    </tr></thead><tbody>';
    foreach ($rows as $r) {
        echo '<tr>';
        echo '<td>' . intval($r['id']) . '</td>';
        echo '<td>' . esc_html($r['submitted_at']) . '</td>';
        echo '<td>' . esc_html($r['ip']) . '</td>';
        echo '<td>' . esc_html($r['phone']) . '</td>';
        echo '<td>' . esc_html($r['dependents']) . '</td>';
        for ($i = 1; $i <= 16; $i++) {
            echo '<td>' . esc_html($r['q'.$i]) . '</td>';
        }
        echo '<td>' . esc_html($r['q17']) . '</td>';
        echo '<td>' . esc_html($r['q18']) . '</td>';
        echo '<td>' . esc_html($r['suggestions']) . '</td>';
        echo '</tr>';
    }
    echo '</tbody></table>';

    // Pagination
    if ($total_pages > 1) {
        echo '<div class="tablenav"><div class="tablenav-pages">';
        for ($p = 1; $p <= $total_pages; $p++) {
            $class = $p == $paged ? ' class="button button-primary"' : ' class="button"';
            echo '<a' . $class . ' href="' . esc_url(add_query_arg('paged', $p)) . '">' . $p . '</a> ';
        }
        echo '</div></div>';
    }

    echo '</div>'; // .wrap
}

/**
 * خروجی CSV
 */
function amroody_export_csv($table) {
    global $wpdb;

    $rows = $wpdb->get_results("SELECT * FROM {$table} ORDER BY id DESC", ARRAY_A);
    if (!$rows) {
        wp_die('داده‌ای برای خروجی یافت نشد.');
    }

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=amroody_survey.csv');

    $output = fopen('php://output', 'w');

    // Persian headers (short labels)
    $headers = [
        'کد', 'زمان', 'IP', 'موبایل', 'تکفل',
        'q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16',
        'q17','q18','پیشنهادات'
    ];
    fputcsv($output, $headers);

    foreach ($rows as $r) {
        $row = [
            $r['id'], $r['submitted_at'], $r['ip'], $r['phone'], $r['dependents']
        ];
        for ($i = 1; $i <= 16; $i++) {
            $row[] = $r['q'.$i];
        }
        $row[] = $r['q17'];
        $row[] = $r['q18'];
        $row[] = $r['suggestions'];
        fputcsv($output, $row);
    }
    fclose($output);
    exit;
}
