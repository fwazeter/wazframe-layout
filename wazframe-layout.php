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
	);
	foreach ( $blocks as $block ) {
		register_block_type( __DIR__ . "/build/block-library/{$block}" );
	}
	register_block_type( __DIR__ . "/build/block-library" );
}
add_action( 'init', 'wf_layout_block_init' );
