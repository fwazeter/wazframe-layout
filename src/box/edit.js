/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	HTMLElementsInspector,
	BlockOptions,
	Padding,
	getPresetClass,
	getInlineStyle
} from "@wazframe/block-editor";

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

import {
	PanelBody,
	PanelRow,
} from "@wordpress/components";

import { useSelect } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import { options } from './constants';




export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		style, // CSS margin value for margin-block-start.
		padding,
		templateLock,
		tagName: TagName = 'div',
	} = attributes;

	const newClassNames = getPresetClass( options, padding )

	const blockProps = useBlockProps(
		{ className: newClassNames }
	);

	const inlineStyle = getInlineStyle( options, padding )

	// we need to refactor border & color props.
	const borderProps = useBorderProps( attributes );
	const colorProps = useColorProps( attributes );

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
		"--wf-box--space": inlineStyle,
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
				<PanelBody title='Spacing'>
					<BlockOptions props={ props } options={ options } attributeName='padding' />
					<PanelRow>
						<Padding { ...props } />
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<HTMLElementsInspector { ...props } />
			<TagName
				{ ...innerBlocksProps }
				className={
					classnames(
						blockProps.className,
						colorProps.className,
						borderProps.className
					)
				}
				style={ { ...styleProps } }
			/>
		</>
	);
}
