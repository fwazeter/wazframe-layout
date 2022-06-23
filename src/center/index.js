import { registerBlockType } from '@wordpress/blocks';
import { positionCenter as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import './style.scss';


registerBlockType( 'wazframe/center', {
    icon: icon,
    edit: Edit,
    save,
} );