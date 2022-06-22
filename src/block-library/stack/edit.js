/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore, InspectorControls
} from "@wordpress/block-editor";

import {
	PanelBody,
	PanelRow,
	ToggleControl,
	Flex,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

import { useSelect } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import {
	HTMLElementsInspector,
	namespace,
	getInlineStyle,
	getPresetClass,
	BlockOptions,
	Margin
} from "../../block-editor";
import { setClassName } from "./setClassName";
import { options } from "./constants";


export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		margin,
		recursive, // bool whether spaces apply recursively.
		splitAfter,
		templateLock,
		tagName: TagName = 'section',
	} = attributes;

	const newClassNames = getPresetClass( options, margin )

	const inlineStyle = getInlineStyle( options, margin )

	const styleProps = {
		"--wf-stack--space": inlineStyle
	}

	const isRecursive = recursive ? 'recursive' : '';

	const splitAfterValue = splitAfter;

	const splitClassStyle = setClassName( splitAfterValue );

	const splitClassNames = splitAfterValue ? `split-${splitAfterValue} ${isRecursive}` : isRecursive;

	const blockProps = useBlockProps(
		{ className: newClassNames }
	);

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
				<PanelBody title='Spacing'>
					<BlockOptions props={ props } options={ options } attributeName='margin' />
					<PanelRow>
						<Margin { ...props } />
					</PanelRow>
				</PanelBody>
				<PanelBody title={ __('Stack Options', namespace ) } initialOpen={false}>
					<Flex justify='space-between' align='flex-start' direction='column'>
						<ToggleControl
							label={__('Make recursive?', namespace)}
							help={ recursive ? "Makes spacing even regardless of nesting depth" : "Is not recursive"}
							checked={ recursive }
							onChange={() => setAttributes({ recursive: !recursive})}
						/>
						<NumberControl
							value={ splitAfter }
							label={ __( 'Split Stack', namespace )}
							isDragEnabled
							isShiftStepEnabled
							shiftStep={10}
							step={1}
							onChange={ (value) => setAttributes({splitAfter: value}) }
						/>
					</Flex>
				</PanelBody>
			</InspectorControls>
			<HTMLElementsInspector { ...props } />
			{ splitAfterValue &&
				<style>{ splitClassStyle }</style>
			}
			<TagName
				{ ...innerBlocksProps }
				className={
					classnames(
						blockProps.className,
						splitClassNames
					)
				}
					 style={ { ...styleProps } } />
		</>
	);
}
