import { registerBlockType } from '@wordpress/blocks';
import { positionCenter as icon } from '@wordpress/icons';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';


registerBlockType('wazframe/center', {
    icon: icon,
    /**
     * @see ./edit.js
     */
    edit: Edit,

    /**
     * @see ./save.js
     */
    save,
});