/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore, InspectorControls,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalUseColorProps as useColorProps,
} from "@wordpress/block-editor";

import { useSelect } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import SpacingPanel from "./editor/spacing";
import HTMLElementsInspector from "../utils/html-element-messages";


export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		style, // CSS margin value for margin-block-start.
		templateLock,
		tagName: TagName = 'div',
	} = attributes;

	const blockProps = useBlockProps();

	const borderProps = useBorderProps( attributes );
	const colorProps = useColorProps( attributes );

	const spaceValue = style?.spacing?.preset;
	const customValue = style?.spacing?.padding?.top;
	const borderStyle = style?.border?.style;

	const paddingValue = spaceValue === 'custom' ? customValue : spaceValue;

	const borderCustomProps = {
		"--border-width": style?.border?.width,
		"--border-color": style?.border?.color,
	}

	const borderWithCustomStyleProps = {
		"--border-width": style?.border?.width,
		"--border-color": style?.border?.color,
		"--border-style": borderStyle
	}

	const borderStyleProps = borderStyle === 'solid' ? borderCustomProps : borderWithCustomStyleProps;

	const styleProps = {
		"--space": paddingValue,
		"--color": style?.color?.text,
		"--background": style?.color?.background || style?.color?.gradient,
		...borderStyleProps,
		"--border-radius": style?.border?.radius
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
				<SpacingPanel { ...props } />
			</InspectorControls>
			<HTMLElementsInspector { ...props } />
			<TagName
				{ ...innerBlocksProps }
				className={
					classnames(
						blockProps.className,
						colorProps.className,
						borderProps.className,
					)
				}
				style={ { ...styleProps } } />
		</>
	);
}
