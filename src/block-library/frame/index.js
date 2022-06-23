import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

registerBlockType('wazframe/frame', {
    /**
     * @see ./edit.js
     */
    edit: Edit,

    /**
     * @see ./save.js
     */
    save,
});