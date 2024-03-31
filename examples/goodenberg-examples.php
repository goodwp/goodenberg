<?php
/**
 * Plugin Name:       Goodenberg Examples
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       .
 *
 * @package           create-block
 */

namespace GoodWP\Goodenberg\Examples;

use GoodWP\Goodenberg\Utils\Assets;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

require_once __DIR__ . '/vendor/autoload.php';

add_action(
    'admin_menu',
    function () {
        add_menu_page(
            __('Goodenberg Examples', 'goodenberg-examples'),
            __('Goodenberg Examples', 'goodenberg-examples'),
            'manage_options',
            'goodenberg-examples',
            __NAMESPACE__ . '\render_page',
        );

        add_submenu_page(
            'goodenberg-examples',
            __('Page with Tabs', 'goodenberg-examples'),
            __('Page with Tabs', 'goodenberg-examples'),
            'manage_options',
            'goodenberg-examples-tabs',
            __NAMESPACE__ . '\render_tabs_page'
        );

        add_submenu_page(
            'goodenberg-examples',
            __('Page with Router', 'goodenberg-examples'),
            __('Page with Router', 'goodenberg-examples'),
            'manage_options',
            'goodenberg-examples-router',
            __NAMESPACE__ . '\render_router_page'
        );
    }
);

add_action('admin_notices', function () {
    wp_admin_notice('test notice for admin-notices component', ['type' => 'info']);
    wp_admin_notice('test notice for admin-notices component', ['type' => 'error']);
});

function render_page()
{
    Assets::enqueue_script_from_asset(
        'goodenberg-examples-admin-page',
        plugin_dir_path(__FILE__) . '/build/admin-page',
        []
    );

    wp_enqueue_style('wp-components');

    echo '<div id="goodenberg-examples-admin-page"></div>';
}

function render_tabs_page()
{
    Assets::enqueue_script_from_asset(
        'goodenberg-examples-admin-page-tabs',
        plugin_dir_path(__FILE__) . '/build/admin-page-tabs',
        []
    );

    wp_enqueue_style('wp-components');

    echo '<div id="goodenberg-examples-admin-page"></div>';
}

function render_router_page()
{
    Assets::enqueue_script_from_asset(
        'goodenberg-examples-admin-page-router',
        plugin_dir_path(__FILE__) . '/build/admin-page-router',
        []
    );

    wp_enqueue_style('wp-components');

    echo '<div id="goodenberg-examples-admin-page"></div>';
}
