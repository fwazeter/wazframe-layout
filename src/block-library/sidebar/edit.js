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
import SizePanel from './editor/size';
import AlignmentPanel from "./editor/alignment";
import SpacingPanel from '../editor-components/spacing';
import HTMLElementsInspector from '../utils/html-element-messages';
import namespace from '../utils/namespace';

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		style,
		sidebarRight,
		tagName: TagName = 'div',
		templateLock,
	} = attributes;

	const hasSidebarRight = sidebarRight ? 'sidebar-right' : 'sidebar-left';

	const blockProps = useBlockProps(
		{ className: hasSidebarRight }
	);

	const styleProps = {
		'--space': style?.spacing?.blockGap,
		'--flex-basis': style?.size?.flexBasis,
		'--measure': style?.size?.minWidth
	}

	const alignItemsStyle = style?.flex?.alignItems;

	if ( alignItemsStyle !== 'stretch' ) {
		Object.assign( styleProps, { '--align-items': alignItemsStyle } );
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
				<SizePanel { ...props } />
				<SpacingPanel { ...props } />
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
				style={ { ...styleProps } }
			/>
		</>
	)

}
