/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps,
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,

} from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes, className }
) {
	const {
		tagName: Tag,
		style,
	} = attributes

	const borderProps = getBorderClassesAndStyles( attributes );
	const colorProps = getColorClassesAndStyles( attributes );

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
		"--box-space": paddingValue,
		"--color": style?.color?.text,
		"--background": style?.color?.background || style?.color?.gradient,
		...borderStyleProps,
		"--border-radius": style?.border?.radius
	}

	const boxClasses = classnames(
			className,
			colorProps.className,
			borderProps.className,
		)

	return <Tag
			{...useInnerBlocksProps.save(
				useBlockProps.save(
					{ className: boxClasses }
				)
			)} style={ { ...styleProps } }
		/>;
}
