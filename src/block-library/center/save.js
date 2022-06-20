/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps,
    useBlockProps
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {getInlineStyle, getPresetClass} from "../editor-components/style-engine";
import {paddingOptions, widthOptions} from "./constants";

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
        width,
        padding,
        intrinsic,
        textAlignCenter,
    } = attributes

    const widthClassNames = getPresetClass( widthOptions, width )
    const widthInlineStyle = getInlineStyle( widthOptions, width )
    const paddingClassNames = getPresetClass( paddingOptions, padding )
    const paddingInlineStyle = getInlineStyle( paddingOptions, padding )


    const styleProps = {
        "--wf--content-width": widthInlineStyle,
        "--wf-center--space": paddingInlineStyle,
    }

    const isIntrinsic = intrinsic ? 'intrinsic' : '';
    const isTextAlignCenter = textAlignCenter ? 'and-text-center': '';

    const optionalClassNames = classnames(
        className,
        widthClassNames,
        paddingClassNames,
        isIntrinsic,
        isTextAlignCenter
    )

    return <div
        {...useInnerBlocksProps.save(
            useBlockProps.save(
                { className: optionalClassNames }
            )
        ) } style={ { ...styleProps } }
    />;
}
