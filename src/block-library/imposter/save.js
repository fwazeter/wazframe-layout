/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
    const {
        position,
        style,
    } = attributes

    const styleProps = {
        "--wf-imposter--space": style?.spacing?.blockGap,
        "--wf--block-start": style?.position?.blockStart,
        "--wf--inline-start": style?.position?.inlineStart,
        "--wf--translate-x": style?.position?.translateX,
        "--wf--translate-y": style?.position?.translateY,
    }

    if ( position ) {
        Object.assign(styleProps, { '--wf--positioning': 'fixed' })
    }

    const isContained = style?.spacing?.blockGap ? 'contain' : '';

    return (
        <>
            <div
                { ...useInnerBlocksProps.save(
                    useBlockProps.save( { className: isContained, style: styleProps } )
                )}
            />
        </>
    );
}
