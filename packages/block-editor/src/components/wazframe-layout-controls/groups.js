/**
 * A fill for our custom configuration of panels in the
 * WordPress Inspector Controls.
 */

/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';

const LayoutControlsDimensions = createSlotFill('LayoutControlsDimensions');

const groups = {
	dimensions: LayoutControlsDimensions,
};

export default groups;
