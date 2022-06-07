<?php

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

function wf_layout_register_blocks() {
	$blocks_dirs = array(
		__DIR__ . '/../build/block-library/' => array(
			'block_folders' => array(
				'reel',
			),
			'block_names'   => array(
				'reel.php'      => 'wazframe/reel'
			),
		),
	);
	foreach ( $blocks_dirs as $blocks_dir => $details ) {
		$blocks_folders = $details['block_folders'];
		$block_names = $details['block_names'];
		
		foreach ( $blocks_folders as $folder_name ) {
			$block_json_file = $blocks_dir . $folder_name . '/block.json';
			
			$metadata = json_decode( file_get_contents( $block_json_file ), true );
			if ( ! is_array( $metadata ) || $metadata['name'] ) {
				continue;
			}
			
			wf_layout_register_block_assets( $folder_name );
			
			register_block_type_from_metadata( $block_json_file );
			
		}
		
		foreach ( $block_names as $file => $sub_block_names ) {
			if ( ! file_exists( $blocks_dir . $file ) ) {
				continue;
			}
			
			$sub_block_names_normalized = is_string( $sub_block_names ) ? array( $sub_block_names ) : $sub_block_names;
			foreach ( $sub_block_names_normalized as $block_name ) {
				wf_layout_register_block_assets( $block_name );
			}
			
			require_once $blocks_dir . $file;
		}
	}
}
add_action( 'init', 'wf_layout_register_blocks' );


/**
 * Registers block styles
 *
 * @param string $block_name    The block name.
 *
 * @return void
 */
function wf_layout_register_block_assets( string $block_name ) {
	if ( ! wp_should_load_separate_core_block_assets() ) {
		return;
	}
	$default_version = defined( 'WF_LAYOUT_VERSION' ) && ! ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? WF_LAYOUT_VERSION : time();
	
	$style_path     = "build/block-library/$block_name/style.css";
	$editor_style_path  = "build/block-library/$block_name/style-editor.css";
	
	if ( file_exists( wf_layout_dir_path() . $style_path ) ) {
		wp_register_style(
			"wp-block-{$block_name}",
			wf_layout_url( $style_path ),
			array(),
			$default_version
		);
		
		// add reference to stylesheet path for inline styles in wp_head.
		wp_style_add_data( "wp-block-{$block_name}", 'path', wf_layout_dir_path() . $style_path );
	} else {
		wp_register_style( "wp-block-{$block_name}", false );
	}
	
	if ( file_exists( wf_layout_dir_path() . $editor_style_path ) ) {
		wp_register_style(
			"wp-block-{$block_name}-editor",
			wf_layout_url( $editor_style_path ),
			array(),
			$default_version
		);
		
		// add reference to stylesheet path for inline styles in wp_head.
		wp_style_add_data( "wp-block-{$block_name}", 'path', wf_layout_dir_path() . $editor_style_path );
	} else {
		wp_register_style( "wp-block-{$block_name}", false );
	}
	
}