<?php

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

function wf_layout_dir_path() {
	return plugin_dir_path( __DIR__ );
}

function wf_layout_url( $path ) {
	return plugins_url( $path, __DIR__ );
}