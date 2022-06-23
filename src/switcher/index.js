import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import './style.scss';


registerBlockType( 'wazframe/switcher', {
    edit: Edit,
    save,
} );