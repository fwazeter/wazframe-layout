/**
 * Internal dependencies
 */
import { getInlineStyles } from './layout-styles';

// This utility is intended to assist where the serialization of the spacing
// block support is being skipped for a block but the spacing related CSS
// styles still need to be generated so they can be applied to inner elements.

/**
 * Provides the CSS class names and inline styles for a block's spacing support
 * attributes.
 *
 * @param {Object} attributes Block attributes.
 *
 * @return {Object} Dimension block support derived CSS classes & styles.
 */
export function getDimensionClassesAndStyles(attributes) {
	const { layoutStyle } = attributes;

	// Collect inline styles for spacing from block obj.
	const spacingStyles = layoutStyle?.dimensions || {};
	// search through dimensions specifically.
	const styleProp = getInlineStyles({ dimensions: spacingStyles });

	return {
		layoutStyle: styleProp,
	};
}
