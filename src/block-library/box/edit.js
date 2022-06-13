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

	const paddingValue = spaceValue === 'custom' ? customValue : spaceValue;

	const borderStyle = style?.border?.style;

	const borderRadius = style?.border?.radius;

	// This is a great candidate for a function.

	const topLeft = borderRadius?.topLeft;
	const topRight = borderRadius?.topRight;
	const bottomRight = borderRadius?.bottomRight;
	const bottomLeft = borderRadius?.bottomLeft;

	// without a value it's null. If the value is edited it becomes undefined.
	const topLeftValue = typeof topLeft === 'string' ? topLeft : 0;
	const topRightValue = typeof topRight === 'string' ? topRight : 0;
	const bottomRightValue = typeof bottomRight === 'string' ? bottomRight : 0;
	const bottomLeftValue = typeof bottomLeft === 'string' ? bottomLeft : 0;

	const borderRadiusStyle =
		typeof borderRadius === 'object'
			? `${topLeftValue} ${topRightValue} ${bottomRightValue} ${bottomLeftValue}`
			: borderRadius

	// We have to split up the border-width / color properties rather than shorthand
	// because of the way WordPress generates border properties using the border supports API.
	const styleProps = {
		"--wf-box--space": paddingValue,
		"--wf--color": style?.color?.text,
		"--wf--background": style?.color?.background || style?.color?.gradient,
		"--wf--border-width": style?.border?.width,
		"--wf--border-color": style?.border?.color,
		"--wf--border-radius": borderRadiusStyle
	}
	if ( borderStyle !== 'solid' ) {
		Object.assign( styleProps, { '--wf--border-style': borderStyle } );
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
				style={ { ...styleProps } }
			/>
		</>
	);
}
