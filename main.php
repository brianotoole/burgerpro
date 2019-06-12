<?php
/*
Plugin Name: Burger Pro
Plugin URI: #
Description: Creates a hamburger navigation with off-canvas functionality for WordPress
Author: Brick & Monitor
Version: 1.0.0
Author URI: https://brickandmonitor.com
Text Domain: burgerpro
*/


if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
define( 'BURGERPRO__FILE__', __FILE__ );



/**
 * Initialize Plugin
 * 
 * @author Brian O'Toole <brian@brickandmonitor.com>
 *
 * @since 1.0.0
 */
function burgerpro_load() {

	// Load localization file
	load_plugin_textdomain( 'burgerpro' );

	// Require the main plugin file
	require( __DIR__ . '/burgerpro.php' );
}
add_action( 'plugins_loaded', 'burgerpro_load' );



/**
 * Enqueue Vendor Scripts and Styles
 * 
 * @author Brian O'Toole <brian@brickandmonitor.com>
 *
 * @since 1.0.0
 */
function burgerpro_include_vendor_files() {
	//wp_enqueue_script('burgerpro-vendor-script', plugins_url( '/assets/vendor/file.js', __FILE__ ), array('jquery'), '2.2.1', 'true' );
	wp_enqueue_style( 'burgerpro-vendor-style', plugins_url( '/assets/vendor/font-awesome-pro/css/all.min.css', __FILE__ ) );
}
add_action( 'wp_enqueue_scripts', 'burgerpro_include_vendor_files' );



/**
 * Enqueue Plugin Scripts and Styles
 * 
 * @author Brian O'Toole <brian@brickandmonitor.com>
 *
 * @since 1.0.0
 */
function burgerpro_include_files() {
		wp_enqueue_script('burgerpro-main-script', plugins_url( '/assets/dist/burger-pro.js', __FILE__ ), array('jquery'), '1.0.0', 'true');
		wp_enqueue_style('burgerpro-main-style', plugins_url( '/assets/dist/burger-pro.css', __FILE__), array(), '1.0.0' );
    
}
add_action( 'wp_enqueue_scripts','burgerpro_include_files');



/**
 * Include Plugin Core
 * 
 * @author Brian O'Toole <brian@brickandmonitor.com>
 *
 * @since 1.0.0
 */
//include_once ('blah/blah-file.php');