/**
 * A fill for our custom configuration of panels in the
 * WordPress Inspector Controls.
 */

/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';

const DimensionControl = createSlotFill('DimensionControl');

const groups = {
	dimensions: DimensionControl,
};

export default groups;
