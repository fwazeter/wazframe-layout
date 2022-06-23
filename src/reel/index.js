/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { row as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import './style.scss';


registerBlockType( 'wazframe/reel', {
	icon: icon,
	edit: Edit,
	save,
} );