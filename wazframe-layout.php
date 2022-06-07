<?php
/**
 * Plugin Name:       WazFrame Layout
 * Description:       Block that enables side scrolling of content rather than wrapping.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Frank Wazeter
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wf-layout
 *
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', 'wf_enqueue_scripts' );

function wf_enqueue_scripts() {
	// When in production, use the plugin's version as the default asset version;
	// else (for development or test) default to use the current time.
	
	$default_version = defined( 'WF_LAYOUT_VERSION' ) && ! ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? WF_LAYOUT_VERSION : time();
	
	$enqueue_scripts= array(
		'block-editor'
	);
	
	foreach ( $enqueue_scripts as $script ) {
		wp_enqueue_script(
			$script,
			esc_url( plugins_url("/packages/{$script}/build/index.js", __FILE__ ) ),
			esc_url( plugins_url("/packages/{$script}/build/index.asset.php", __FILE__ ) ),
			$default_version,
			true
		);
	}
}



/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function wf_layout_block_init() {
	
	$blocks = array(
		'reel'
	);
	foreach ( $blocks as $block ) {
		register_block_type( __DIR__ . "/packages/block-library/build/{$block}" );
	}
	register_block_type( __DIR__ . "/packages/block-library/build" );
}
add_action( 'init', 'wf_layout_block_init' );
