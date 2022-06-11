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

import { useSelect } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import SpacingPanel from "./editor/spacing";
import HTMLElementsInspector from "../utils/html-element-messages";
import namespace from './namespace';
import {PanelBody, ToggleControl} from "@wordpress/components";

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		style, // CSS margin value for margin-block-start.
		recursive, // bool whether spaces apply recursively.
		templateLock,
		tagName: TagName = 'section',
	} = attributes;

	const spaceValue = style?.spacing?.preset;
	const customValue = style?.spacing?.margin?.top;

	const marginValue = spaceValue === 'custom' ? customValue : spaceValue;

	const styleProps = {
		"--space": marginValue
	}

	const isRecursive = recursive ? 'recursive' : '';

	const blockProps = useBlockProps({ className: isRecursive });

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
				<PanelBody title={ __('Even Spacing', namespace ) } initialOpen={false}>
					<ToggleControl
						label={__('Make recursive?', namespace)}
						help={ recursive ? "Makes spacing even regardless of nesting depth" : "Is not recursive"}
						checked={ recursive }
						onChange={() => setAttributes({ recursive: !recursive})}
					/>
				</PanelBody>
			</InspectorControls>
			<HTMLElementsInspector { ...props } />
			<TagName { ...innerBlocksProps } style={ { ...styleProps } } />
		</>
	);
}
