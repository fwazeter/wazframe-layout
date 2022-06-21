/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	BlockControls,
} from '@wordpress/block-editor';

import {
	ToolbarGroup,
	ToolbarButton,
	PanelBody,
} from '@wordpress/components';

import { lineSolid } from '@wordpress/icons';

import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import HTMLElementsInspector from "../utils/html-element-messages";
import namespace from "../utils/namespace";

import ItemWidthPanel from './editor/reel-item-width'
import ReelHeight from "./editor/reel-height";

import { itemWidthOptions, heightOptions } from "./constants";

import {
	BlockGapPanel,
	blockGapOptions,
	getInlineStyle,
	getPresetClass,
} from "../editor-components";


function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const {
		itemWidth,
		height,
		blockGap,
		noBar,
		tagName: TagName = 'section',
		templateLock
	} = attributes;

	const heightClassNames = getPresetClass( heightOptions, height );
	const heightInlineStyle = getInlineStyle( heightOptions, height );

	const itemWidthClassNames = getPresetClass( itemWidthOptions, itemWidth );
	const itemWidthInlineStyle = getInlineStyle( itemWidthOptions, itemWidth );

	// NOTE: we aren't actually using gap prop in CSS, but the style is accomplishing the same
	const blockGapClassNames = getPresetClass( blockGapOptions, blockGap );
	const blockGapInlineStyle = getInlineStyle( blockGapOptions, blockGap );

	const toggleScrollbar = noBar ? 'no-scrollbar' : '';

	const styleProps = {
		"--wf--height": heightInlineStyle,
		"--wf--content-width": itemWidthInlineStyle,
		"--wf-reel--space": blockGapInlineStyle,
	}

	const blockProps = useBlockProps();

	const optionalClassNames = classnames(
		toggleScrollbar,
		blockGapClassNames,
		itemWidthClassNames,
		heightClassNames
	)

	const { hasInnerBlocks } = useSelect(
		(select) => {
			const { getBlock } = select(blockEditorStore);
			const block = getBlock(clientId);
			return {
				hasInnerBlocks: !!(block && block.innerBlocks.length),
			};
		},
		[clientId]
	);

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		templateLock,
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ lineSolid }
						title={ __( 'Toggle Scrollbar Display', namespace )}
						onClick={ () => setAttributes( { noBar: !noBar })}
						isActive={ !! noBar }
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Reel Settings', namespace ) }>
					<ItemWidthPanel { ...props } />
					<ReelHeight { ...props } />
					<BlockGapPanel { ...props } />
				</PanelBody>
			</InspectorControls>
			<HTMLElementsInspector { ...props } />
			<TagName {...innerBlocksProps}
					 className={ classnames(
						 blockProps.className,
						 optionalClassNames
					 ) }
					 style={ { ...styleProps } } />
		</>
	);
}

export default Edit;
