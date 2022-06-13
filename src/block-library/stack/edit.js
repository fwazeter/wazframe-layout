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
	ToggleControl,
	Flex,
	__experimentalNumberControl as NumberControl
} from "@wordpress/components";

import { useSelect } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import SpacingPanel from "./editor/spacing";
import HTMLElementsInspector from "../utils/html-element-messages";
import namespace from './../utils/namespace';
import {setClassName} from "./setClassName";


export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		style, // CSS margin value for margin-block-start.
		recursive, // bool whether spaces apply recursively.
		splitAfter,
		templateLock,
		tagName: TagName = 'section',
	} = attributes;

	const spaceValue = style?.spacing?.preset;
	const customValue = style?.spacing?.margin?.top;

	const marginValue = spaceValue === 'custom' ? customValue : spaceValue;

	const styleProps = {
		"--stack-space": marginValue
	}

	const isRecursive = recursive ? 'recursive' : '';

	const splitAfterValue = splitAfter;

	const splitClassStyle = setClassName( splitAfterValue );

	const newClassNames = splitAfterValue ? `split-${splitAfterValue} ${isRecursive}` : isRecursive;

	const blockProps = useBlockProps({ className: newClassNames });

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
				<SpacingPanel { ...props } />
				<PanelBody title={ __('Spacing', namespace ) } initialOpen={false}>
					<Flex justify='space-between' align='flex-start'>
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
			<TagName { ...innerBlocksProps } style={ { ...styleProps } } />
		</>
	);
}
