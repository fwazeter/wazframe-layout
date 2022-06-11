/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */

import ClusterPanel from './editor/alignment';
import SpacingPanel from './editor/spacing';

import HTMLElementsInspector from '../utils/html-element-messages';

export default function Edit(props) {
	const { attributes, clientId } = props;
	const {
		style,
		tagName: TagName = 'div',
		templateLock,
	} = attributes;

	const blockProps = useBlockProps();

	const styleProps = {
		'--space': style?.spacing?.blockGap
	}

	const justifyContentStyle = style?.flex?.justifyContent;

	if ( justifyContentStyle !== 'flex-start' ) {
		Object.assign( styleProps, { '--justify-content': justifyContentStyle } );
	}

	const alignItemsStyle = style?.flex?.alignItems;

	if ( alignItemsStyle !== 'flex-start' ) {
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
				<ClusterPanel { ...props } />
				<SpacingPanel { ...props } />
			</InspectorControls>
			<HTMLElementsInspector { ...props } />
			<TagName
				{ ...innerBlocksProps }
				style={ { ...styleProps } }
			/>
		</>
	)

}
