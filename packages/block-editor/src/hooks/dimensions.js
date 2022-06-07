/**
 * The dimensions panel controls spacing properties such as
 * margin, padding and blockGap. We use the 'dimensions'
 * naming convention because this is what WordPress calls it
 * when using their default dimensions panel.
 */
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { getBlockSupport } from '@wordpress/blocks';
import { __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	hasSupport as hasMarginSupport,
	hasValue as hasMarginValue,
	reset as resetMargin,
	disabled as marginDisabled,
	Edit as MarginEdit,
} from './margin';

import WazFrameLayoutControls from '../components';

export const DIMENSION_SUPPORT_KEY = 'dimensions';
export const ALL_SIDES = [
	'block-start',
	'inline-end',
	'block-end',
	'inline-start',
];
export const AXIAL_SIDES = ['block', 'inline'];

/**
 * Determines whether there is dimensions related block support.
 *
 * @param {string} blockName Block name.
 *
 * @return {boolean} Whether there is support.
 */
export function hasSupport(blockName) {
	return (
		// hasGapSupport( blockName ) ||
		// hasPaddingSupport( blockName ) ||
		hasMarginSupport(blockName)
	);
}

/**
 * Determines whether the dimensions support have been disabled.
 *
 * @param{Object} props Block props.
 *
 * @return{boolean} If the dimensions support is completely disabled.
 */
const disabled = (props = {}) => {
	const isMarginDisabled = marginDisabled(props);

	// gapDisabled && marginDisabled && etc.
	return isMarginDisabled;
};

/**
 * Hook that retrieves which padding/margin/blockGap is supported
 * e.g. block-start, inline-end, block-end, inline-start
 *
 * @param {string} blockName Block name.
 * @param {string} feature  The feature custom sides relate to, e.g. padding or margin.
 *
 * @return {?string[]} Strings representing custom sides available.
 */
export function useCustomSides(blockName, feature) {
	const support = getBlockSupport(
		blockName,
		DIMENSION_SUPPORT_KEY,
		AXIAL_SIDES
	);

	// Skip when setting is boolean as theme isn't setting arbitrary sides.
	if (!support || typeof support[feature] === 'boolean') {
		return;
	}

	// Return if the setting is an array of sides
	if (Array.isArray(support[feature])) {
		return support[feature];
	}

	// Finally attempt to return `.sides` if setting is an object.
	if (support[feature]?.sides) {
		return support[feature].sides;
	}
}

/**
 * Custom hook that determines whether the sides configured in
 * the block support are valid. Dimension property cannot declare
 * support for a mix of axial and individual sides.
 *
 * @param{string} blockName Block name.
 * @param{string} feature The feature custom sides relate to e.g. padding or margin.
 *
 * @return {boolean} If the feature has a valid configuration of sides.
 */
export function isSupportValid(blockName, feature) {
	const sides = useCustomSides(blockName, feature);

	if (
		sides &&
		sides.some((side) => ALL_SIDES.includes(side)) &&
		sides.some((side) => AXIAL_SIDES.includes(side))
	) {
		console.warn(
			`The ${feature} support for the "${blockName}" block can not be configured to support both axial and arbitrary sides.`
		);
		return false;
	}

	return true;
}

/**
 * Inspector controls for the dimensions panel.
 *
 * @param {Object} props Block props.
 *
 * @return {WPElement} Inspector controls for dimension support features.
 */
export function DimensionsPanel(props) {
	const isMarginDisabled = marginDisabled(props);
	const isDisabled = disabled(props);
	const isSupported = hasSupport(props.name);

	if (isDisabled || !isSupported) {
		return null;
	}

	const defaultDimensionControls = getBlockSupport(props.name, [
		DIMENSION_SUPPORT_KEY,
		'__dimensionLayoutControls',
	]);

	const createResetAllFilter = (attribute) => (newAttributes) => ({
		...newAttributes,
		layoutStyle: {
			...newAttributes.layoutStyle,
			dimensions: {
				...newAttributes.layoutStyle?.dimensions,
				[attribute]: undefined,
			},
		},
	});

	return (
		<>
			<InspectorControls>
				<WazFrameLayoutControls group="dimensions">
					{!isMarginDisabled && (
						<ToolsPanelItem
							hasValue={() => hasMarginValue(props)}
							label={__('Margin')}
							onDeselect={() => resetMargin(props)}
							resetAllFilter={createResetAllFilter('margin')}
							isShownByDefault={defaultDimensionControls?.margin}
							panelId={props.clientId}
						>
							<MarginEdit {...props} />
						</ToolsPanelItem>
					)}
				</WazFrameLayoutControls>
			</InspectorControls>
		</>
	);
}
