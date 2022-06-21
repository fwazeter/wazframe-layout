/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	BlockControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore
} from '@wordpress/block-editor';

import {
	PanelBody,
	ToolbarGroup,
	ToolbarButton
} from '@wordpress/components';

import {
	positionLeft
} from '@wordpress/icons';

import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import AlignmentPanel from "./editor/alignment";
import HTMLElementsInspector from '../utils/html-element-messages';
import namespace from '../utils/namespace';
import SidebarWidthPanel from "./editor/sidebar-width";
import MainWidthPanel from "./editor/main-width";
import {
	BlockGapPanel,
	getInlineStyle,
	getPresetClass,
	blockGapOptions,
} from "../editor-components";
import { sidebarOptions } from "./constants";

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		flex,
		blockGap,
		width,
		contentWidth,
		sidebarRight,
		tagName: TagName = 'div',
		templateLock,
	} = attributes;

	const hasSidebarRight = sidebarRight ? 'sidebar-right' : 'sidebar-left';

	const sidebarWidthClassNames = getPresetClass( sidebarOptions, width );
	const sidebarInlineStyle = getInlineStyle( sidebarOptions, width );

	const blockGapClassNames = getPresetClass( blockGapOptions, blockGap );
	const blockGapInlineStyle = getInlineStyle( blockGapOptions, blockGap );

	const blockProps = useBlockProps();

	const optionalClassNames = classnames(
		hasSidebarRight,
		sidebarWidthClassNames,
		blockGapClassNames
	)

	const styleProps = {
		'--wf-sidebar--space': blockGapInlineStyle,
		'--wf--width': sidebarInlineStyle,
		'--wf--content-width': contentWidth
	}

	const alignItemsStyle = flex?.alignItems;

	if ( alignItemsStyle !== 'stretch' ) {
		Object.assign( styleProps, { '--wf--align-items': alignItemsStyle } );
	}

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
			<InspectorControls>
				<AlignmentPanel { ...props } />
				<PanelBody title={ __( 'Space Settings' ) }>
					<SidebarWidthPanel { ...props } />
					<MainWidthPanel { ...props } />
					<BlockGapPanel { ...props } />
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ positionLeft }
						title={ __( 'Sidebar on Right', namespace )}
						onClick={ () => setAttributes( { sidebarRight: !sidebarRight })}
						isActive={ !! sidebarRight }
					/>
				</ToolbarGroup>
			</BlockControls>
			<HTMLElementsInspector { ...props } />
			<TagName
				{ ...innerBlocksProps }
				className={
					classnames(
						blockProps.className,
						optionalClassNames
					)
				}
				style={ { ...styleProps } }
			/>
		</>
	)

}
