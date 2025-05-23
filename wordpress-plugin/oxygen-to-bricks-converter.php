<?php
/**
 * Plugin Name: Oxygen to Bricks Converter
 * Plugin URI: https://yourdomain.com/plugins/oxygen-to-bricks-converter
 * Description: A tool that converts Oxygen 4.9 JSON to Bricks Builder format
 * Version: 1.1.1
 * Author: Philipp - Levels.dev
 * Author URI: https://wpconverters.com/
 * Text Domain: oxygen-to-bricks-converter
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class OxygenToBricksConverter {
    
    /**
     * Constructor
     */
    public function __construct() {
        // Register shortcode
        add_shortcode('oxygen_to_bricks', array($this, 'render_shortcode'));
        
        // Enqueue scripts and styles
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
    }
    
    /**
     * Enqueue necessary assets
     */
    public function enqueue_assets() {
        // Only enqueue on pages that have our shortcode
        global $post;
        if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'oxygen_to_bricks')) {
            // Register and enqueue styles
            wp_register_style(
                'oxygen-to-bricks-styles', 
                plugin_dir_url(__FILE__) . 'assets/style.css',
                array(),
                '1.1.1'
            );
            wp_enqueue_style('oxygen-to-bricks-styles');
            
            // Register and enqueue scripts
            wp_register_script(
                'oxygen-to-bricks-script',
                plugin_dir_url(__FILE__) . 'assets/main.js',
                array(),
                '1.1.1',
                true
            );
            
            // Add module type attribute for ES6 modules
            add_filter('script_loader_tag', function($tag, $handle, $src) {
                if ('oxygen-to-bricks-script' === $handle) {
                    $tag = str_replace('<script ', '<script type="module" ', $tag);
                }
                return $tag;
            }, 10, 3);
            
            wp_enqueue_script('oxygen-to-bricks-script');
            
            // Add script localization if needed
            wp_localize_script('oxygen-to-bricks-script', 'otb_data', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('otb_nonce'),
                'plugin_url' => plugin_dir_url(__FILE__)
            ));
        }
    }
    
    /**
     * Render the converter via shortcode
     */
    public function render_shortcode($atts) {
        // Extract attributes
        $atts = shortcode_atts(
            array(
                'title' => 'Oxygen 4.9 → Bricks Converter',
                'description' => 'Convert Oxygen JSON to Bricks-compatible format',
            ),
            $atts,
            'oxygen_to_bricks'
        );
        
        // Start output buffering
        ob_start();
        
        // Include template
        include plugin_dir_path(__FILE__) . 'templates/converter.php';
        
        // Return the buffered content
        return ob_get_clean();
    }
    
    /**
     * Plugin activation hook
     */
    public static function activate() {
        // Create plugin directories if they don't exist
        $upload_dir = wp_upload_dir();
        $plugin_upload_dir = $upload_dir['basedir'] . '/oxygen-to-bricks';
        
        if (!file_exists($plugin_upload_dir)) {
            wp_mkdir_p($plugin_upload_dir);
        }
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation hook
     */
    public static function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }
}

// Initialize the plugin
$oxygen_to_bricks_converter = new OxygenToBricksConverter();

// Register activation and deactivation hooks
register_activation_hook(__FILE__, array('OxygenToBricksConverter', 'activate'));
register_deactivation_hook(__FILE__, array('OxygenToBricksConverter', 'deactivate'));
