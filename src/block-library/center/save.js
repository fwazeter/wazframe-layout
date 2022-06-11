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
        style,
        intrinsic,
        textAlignCenter,
    } = attributes


    const spaceValue = style?.spacing?.preset;
    const customValue = style?.spacing?.padding?.top;

    const paddingValue = spaceValue === 'custom' ? customValue : spaceValue;


    const styleProps = {
        "--space": paddingValue,
    }

    const isIntrinsic = intrinsic ? 'intrinsic' : '';
    const isTextAlignCenter = textAlignCenter ? 'and-text-center': '';

    const optionalClassNames = classnames(
        className,
        isIntrinsic,
        isTextAlignCenter
    )

    return <div
        {...useInnerBlocksProps.save(
            useBlockProps.save(
                { className: optionalClassNames }
            )
        )} style={ { ...styleProps } }
    />;
}
