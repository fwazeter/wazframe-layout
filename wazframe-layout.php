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

function wf_enqueue_scripts( $scripts ) {
	// When in production, use the plugin's version as the default asset version;
	// else (for development or test) default to use the current time.
	
	$default_version = defined( 'WF_LAYOUT_VERSION' ) && ! ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? WF_LAYOUT_VERSION : time();
	
	$enqueue_scripts= array(
		'block-editor',
		'style-engine'
	);
	
/*	foreach ( $enqueue_scripts as $script ) {
		wp_register_script(
		
		);
	}*/
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
		'cluster',
		'reel'
	);
	foreach ( $blocks as $block ) {
		register_block_type( __DIR__ . "/build/block-library/{$block}" );
	}
}
add_action( 'init', 'wf_layout_block_init' );
