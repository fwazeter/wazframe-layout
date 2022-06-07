/**
 * External dependencies
 */
import { omit } from 'lodash';
import { getCSSRules } from '@wazframe/style-engine';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { getBlockSupport, hasBlockSupport } from '@wordpress/blocks';

import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import useDisplayBlockControls from '../components/use-display-block-controls';

import { DIMENSION_SUPPORT_KEY, DimensionsPanel } from './dimensions';

const styleSupportKeys = [DIMENSION_SUPPORT_KEY];

const hasWazFrameSupport = (blockType) =>
	styleSupportKeys.some((key) =>
		hasBlockSupport(blockType, key, false)
	);

/**
 * Returns the inline CSS styles to override
 * depending on the style object.
 *
 * @param {Object} wazframe Style configuration.
 *
 * @return {Object} Flattened CSS variables declaration.
 */
export function getInlineStyles(wazframe = {}) {
	const output = {};

	// eventually WordPress intends to move this to server side generated styles.
	// likely won't affect here, but might be good to follow suit.
	const rules = getCSSRules( wazframe );
	rules.forEach((rule) => {
		output[rule.key] = rule.value;
	});

	return output;
}

/**
 * Filters registered block settings, extending attributes to include `style`
 * attribute.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
function addAttribute(settings) {
	if (!hasWazFrameSupport(settings)) {
		return settings;
	}

	// Allow blocks to specify their own attribute definition with default values if needed.
	if (!settings.attributes.wazframe) {
		Object.assign(settings.attributes, {
			wazframe: {
				type: 'object',
			},
		});
	}
	return settings;
}

/**
 * Dictionary of paths to flag skipping block support serialization as key
 * with values providing the style paths to be omitted from serialization.
 *
 * @constant
 * @type {Record<string, string[]>}
 */
const skipSerializationPathsEdit = {
	[`${DIMENSION_SUPPORT_KEY}.__experimentalSkipSerialization`]: ['dimension'],
};

/**
 * Dictionary of paths to flag skipping block support serialization as the key
 * with values providing the style paths to be omitted from serialization.
 *
 * Extends the Edit skip paths to enable skipping additional paths in just
 * the Save component. Allows a block support to be serialized within the
 * editor, while using an alternate approach, such as server-side rendering, when
 * the support is saved.
 *
 * @constant
 * @type {Record<string, string[]>}
 */
const skipSerializationPathsSave = {
	...skipSerializationPathsEdit,
};

/**
 * Override props assigned to save component to inject CSS
 * variables definition.
 *
 * @param {Object} props        Additional props applied to save element.
 * @param blockType             Block type.
 * @param attributes            Block attributes.
 * @param {?Record<string, string[]>} skipPaths An object of keys and paths to skip serialization.
 * @return {Object}             Filtered props to applied to save element.
 */
export function addSaveProps(
	props,
	blockType,
	attributes,
	skipPaths = skipSerializationPathsSave
) {
	if (!hasWazFrameSupport(blockType)) {
		return props;
	}

	let { wazframe } = attributes;
	Object.entries(skipPaths).forEach(([indicator, path]) => {
		const skipSerialization = getBlockSupport(blockType, indicator);

		if (skipSerialization === true) {
			wazframe = omit(wazframe, path);
		}

		if (Array.isArray(skipSerialization)) {
			skipSerialization.forEach((featureName) => {
				wazframe = omit(wazframe, [[...path, featureName]]);
			});
		}
	});

	props.wazframe = {
		...getInlineStyles(wazframe),
		...props.wazframe,
	};

	return props;
}

/**
 * Filters registered block settings to extend the block edit wrapper
 * to apply the desired styles and classnames properly.
 *
 * @param {Object}  settings    Original block settings.
 *
 * @return {Object}             Filtered block settings.
 */
export function addEditProps(settings) {
	if (!hasWazFrameSupport(settings)) {
		return settings;
	}

	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = (attributes) => {
		let props = {};
		if (existingGetEditWrapperProps) {
			props = existingGetEditWrapperProps(attributes);
		}

		return addSaveProps(
			props,
			settings,
			attributes,
			skipSerializationPathsEdit
		);
	};

	return settings;
}

/**
 * Override the default edit UI to include new inspector controls for
 * all the custom styles configs.
 *
 * @param {Function} BlockEdit Original component.
 *
 * @return {Function} Wrapped component.
 */
export const withBlockControls = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const shouldDisplayControls = useDisplayBlockControls();

		return (
			<>
				{shouldDisplayControls && (
					<>
						<DimensionsPanel {...props} />
					</>
				)}
				<BlockEdit {...props} />
			</>
		);
	},
	'withBlockControls'
);

addFilter(
	'blocks.registerBlockType',
	'wazframe/layout/addAttribute',
	addAttribute
);

addFilter(
	'blocks.getSaveContent.extraProps',
	'wazframe/layout/addSaveProps',
	addSaveProps
);

addFilter(
	'blocks.registerBlockType',
	'wazframe/layout/addEditProps',
	addEditProps
);

addFilter(
	'editor.BlockEdit',
	'wazframe/layout/with-block-controls',
	withBlockControls
);
