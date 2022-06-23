import { registerBlockType } from '@wordpress/blocks';
import { stack as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import './style.scss';


registerBlockType( 'wazframe/stack', {
	icon: icon,
	edit: Edit,
	save,
} );