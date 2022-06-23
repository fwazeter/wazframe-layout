/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	getInlineStyle,
	getPresetClass
} from "@wazframe/block-editor";

/**
 * WordPress dependencies
 */
import {
	useInnerBlocksProps,
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { options } from "./constants";


export default function save( { attributes, className }
) {
	const {
		tagName: Tag,
		style,
		padding,
	} = attributes

	const newClassNames = getPresetClass( options, padding )

	const inlineStyle = getInlineStyle( options, padding )

	const borderProps = getBorderClassesAndStyles( attributes );
	const colorProps = getColorClassesAndStyles( attributes );

	const borderStyle = style?.border?.style;

	const borderRadius = style?.border?.radius;

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

	const boxClasses = classnames(
			className,
			newClassNames,
			colorProps.className,
			borderProps.className,
		)

	return <Tag
			{...useInnerBlocksProps.save(
				useBlockProps.save(
					{ className: boxClasses }
				)
			) } style={ { ...styleProps  } }
		/>;
}
