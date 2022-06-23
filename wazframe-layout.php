<?php
/**
 * Plugin Name:       WazFrame Layout
 * Description:       Block that enables side scrolling of content rather than wrapping.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.2.3
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

/**
 * Register package js files to the block editor.
 */
function wf_layout_block_editor_assets() {
	// JS file
	$script_path        = "build/packages/wazframe-block-editor.js";
	// WordPress dependencies
	$script_asset_path  = __DIR__ . "/build/packages/wazframe-block-editor.asset.php";
	
	$script_asset  = file_exists( $script_asset_path )
		? require( $script_asset_path )
		: array( 'dependencies' => array(), 'version' => filemtime( $script_path ) );
	
	$script_url         = plugins_url( $script_path, __FILE__ );
	
	wp_enqueue_script(
		'wazframe-block-editor',
		$script_url,
		$script_asset['dependencies'],
		$script_asset['version']
	);
}
add_action( 'enqueue_block_editor_assets', 'wf_layout_block_editor_assets' );

/**
 * Adds custom categories for blocks.
 *
 * @param $categories
 *
 * @return array
 */
function wazframe_block_categories( $categories ): array {
	return array_merge(
		$categories,
		[
			[
				'slug'  => 'layout-primitives',
				'title' => __( 'Layout Primitives', 'wf-layout' ),
			],
		]
	);
}
add_action( 'block_categories_all', 'wazframe_block_categories', 10, 2 );


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function wf_layout_block_init() {
	
	$blocks = array(
		'reel',
		'stack',
		'box',
		'center',
		'cluster',
		'sidebar',
		'switcher',
		'cover',
		'grid',
		'frame',
		'imposter',
	);
	foreach ( $blocks as $block ) {
		register_block_type( __DIR__ . "/build/{$block}" );
	}
	register_block_type( __DIR__ . "/build" );
}
add_action( 'init', 'wf_layout_block_init' );
