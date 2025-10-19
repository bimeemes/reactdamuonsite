<?php
// includes/install.php
if (!defined('ABSPATH')) exit;

function amroody_install() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'amroody_survey';
    $charset_collate = $wpdb->get_charset_collate();

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';

    $sql = "CREATE TABLE {$table_name} (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        submitted_at DATETIME NOT NULL,
        ip VARCHAR(45) NULL,
        page_url TEXT NULL,
        user_agent TEXT NULL,
        phone VARCHAR(32) NULL,
        dependents INT NULL,
        q1 TINYINT NULL,
        q2 TINYINT NULL,
        q3 TINYINT NULL,
        q4 TINYINT NULL,
        q5 TINYINT NULL,
        q6 TINYINT NULL,
        q7 TINYINT NULL,
        q8 TINYINT NULL,
        q9 TINYINT NULL,
        q10 TINYINT NULL,
        q11 TINYINT NULL,
        q12 TINYINT NULL,
        q13 TINYINT NULL,
        q14 TINYINT NULL,
        q15 TINYINT NULL,
        q16 TINYINT NULL,
        q17 VARCHAR(20) NULL,
        q18 VARCHAR(50) NULL,
        suggestions LONGTEXT NULL,
        PRIMARY KEY (id)
    ) {$charset_collate};";

    dbDelta($sql);

    // نسخه دیتابیس برای مدیریت تغییرات بعدی
    update_option('amroody_survey_db_version', '1.0');
}
