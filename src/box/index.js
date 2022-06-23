import { registerBlockType } from '@wordpress/blocks';
import { group as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import './style.scss';

registerBlockType( 'wazframe/box', {
	icon: icon,
	edit: Edit,
	save,
} );