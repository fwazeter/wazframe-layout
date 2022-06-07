/**
 * Adds a margin control component for the block editor.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalBoxControl as BoxControl,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';
import { cleanEmptyObject } from './utils';

import { useSetting } from '@wordpress/block-editor';

import { getBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import {
	AXIAL_SIDES,
	DIMENSION_SUPPORT_KEY,
	useCustomSides,
	isSupportValid,
} from './dimensions';

/**
 * Determines if there is margin support
 * @param {string|Object} blockType Block name or Block Type object.
 *
 * @return {boolean} Whether there is support.
 */
export function hasSupport(blockType) {
	const support = getBlockSupport(blockType, DIMENSION_SUPPORT_KEY);
	return !!(true === support || support?.margin);
}

/**
 * Checks if there is a current value in the margin block support attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasValue(props) {
	return props.attributes.wazframe?.dimensions.margin !== undefined;
}

/**
 * Resets the margin attribute.
 *
 * @param {Object} props		Block props.
 * @param {Object} props.attributes	Block's attributes.
 * @param {Object} props.setAttributes Function to set block's attribute.
 */
export function reset({ attributes = {}, setAttributes }) {
	const { wazframe } = attributes;

	setAttributes({
		wazframe: cleanEmptyObject({
			...wazframe,
			dimensions: {
				...wazframe?.dimensions,
				margin: undefined,
			},
		}),
	});
}

/**
 * Custom hook that checks if margin settings have been disabled.
 *
 * @param {string} name The name of the block.
 *
 * @return {boolean} Whether margin setting is disabled.
 */
export function disabled({ name: blockName } = {}) {
	const isDisabled = !useSetting('dimensions.margin');
	const isInvalid = !isSupportValid(blockName, 'margin');

	return !hasSupport(blockName) || isDisabled || isInvalid;
}

/**
 * Inspector control panel containing the margin related configuration.
 *
 * @param {Object} props
 * @returns {WPElement} Height edit element.
 */

export function Edit(props) {
	const {
		name: blockName,
		attributes: { wazframe },
		setAttributes,
	} = props;

	const units = useCustomUnits({
		availableUnits: useSetting('spacing.units') || ['em', 'rem', '%', 'px'],
	});

	const sides = useCustomSides(blockName, 'margin');
	const splitOnAxis =
		sides && sides.some((side) => AXIAL_SIDES.includes(side));

	const onChange = (modify) => {
		const newStyle = {
			...wazframe,
			dimensions: {
				...wazframe?.dimensions,
				margin: modify,
			},
		};

		setAttributes({
			wazframe: cleanEmptyObject(newStyle),
		});
	};

	return (
		<>
			<BoxControl
				values={wazframe?.dimensions?.margin}
				onChange={onChange}
				label={__('Margin')}
				sides={sides}
				unites={units}
				allowReset={false}
				splitOnAxis={splitOnAxis}
			/>
		</>
	);
}
