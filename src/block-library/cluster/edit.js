/**
 * External dependencies
 */
import classnames from 'classnames';

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

import {
	PanelBody
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import ClusterPanel from './editor/alignment';

import HTMLElementsInspector from '../utils/html-element-messages';
import {
	getInlineStyle,
	getPresetClass,
	BlockGapPanel,
	blockGapOptions,
} from "../editor-components";

export default function Edit(props) {
	const { attributes, clientId } = props;
	const {
		flex,
		blockGap,
		tagName: TagName = 'div',
		templateLock,
	} = attributes;

	const newClassNames = getPresetClass( blockGapOptions, blockGap );
	const inlineStyle = getInlineStyle( blockGapOptions, blockGap );

	const blockProps = useBlockProps(
		{ className: newClassNames }
	);

	const styleProps = {
		'--wf-cluster--space': inlineStyle
	}

	const justifyContentStyle = flex?.justifyContent;

	if ( justifyContentStyle !== 'flex-start' ) {
		Object.assign( styleProps, { '--wf--justify-content': justifyContentStyle } );
	}

	const alignItemsStyle = flex?.alignItems;

	if ( alignItemsStyle !== 'flex-start' ) {
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
				<ClusterPanel { ...props } />
				<PanelBody title="Spacing">
					<BlockGapPanel { ...props } />
				</PanelBody>
			</InspectorControls>
			<HTMLElementsInspector { ...props } />
			<TagName
				{ ...innerBlocksProps }
				className={
					classnames( blockProps.className )
				}
				style={ { ...styleProps } }
			/>
		</>
	)

}
