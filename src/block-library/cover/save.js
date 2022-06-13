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
        tagName: Tag,
        style,
    } = attributes

    const spaceValue = style?.spacing?.preset;
    const spaceCustomValue = style?.spacing?.padding?.top;

    const parentSpaceValue = style?.spacing?.parentPreset;
    const parentSpaceCustomValue = style?.spacing?.parentPadding?.top;

    const spacePaddingValue = spaceValue === 'custom' ? spaceCustomValue : spaceValue;
    const parentSpacePaddingValue = parentSpaceValue === 'custom' ? parentSpaceCustomValue : parentSpaceValue;

    const styleProps = {
        "--wf-cover--space": spacePaddingValue,
        "--wf-cover--parent-space": parentSpacePaddingValue,
        "--wf--height": style?.size?.height,
    }

    return <Tag
        { ...useInnerBlocksProps.save(
            useBlockProps.save( { style: styleProps } )
        )}
    />;
}
