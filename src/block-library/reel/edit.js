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
} from '@wordpress/components';

import { lineSolid } from '@wordpress/icons';

import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import HTMLElementsInspector from "../utils/html-element-messages";
import SizePanel from './editor/size';
import SpacingPanel from '../editor-components/spacing';
import namespace from "../utils/namespace";


function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { tagName: TagName = 'section', templateLock, noBar, style } = attributes;

	const styleProps = {
		"--reel-space": style?.spacing?.blockGap,
		"--measure": style?.size?.width,
		"--height": style?.size?.height
	}

	const toggleScrollbar = noBar ? 'no-scrollbar' : '';

	/* adding another className here duplicates default className */
	const blockProps = useBlockProps({ className: toggleScrollbar });

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
				<SizePanel { ...props } />
				<SpacingPanel { ...props } />
			</InspectorControls>
			<HTMLElementsInspector { ...props } />
			<TagName {...innerBlocksProps} style={ { ...styleProps } }/>
		</>
	);
}

export default Edit;
