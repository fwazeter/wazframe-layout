/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import {setCustomFlexGrow, setLimitClassName} from "./setClassName";

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
        limit,
        customChild,
    } = attributes

    const styleProps = {
        '--space': style?.spacing?.blockGap,
        '--measure': style?.size?.width
    }

    const newFlexGrow = style?.flex?.flexGrow;

    const switchAfter = Number(limit) + 1;

    const limitStyle = setLimitClassName( switchAfter );

    const newChildGrowProp = setCustomFlexGrow( customChild, newFlexGrow );

    const appendStyles = customChild && newFlexGrow ?
        `${limitStyle} \n ${newChildGrowProp}` : limitStyle;

    const newClassNames = customChild && newFlexGrow ?
        `grow-${customChild} switch-${switchAfter}` :
        `switch-${switchAfter}`;


    return (
        <>
            <style>{ appendStyles }</style>
            <Tag
                { ...useInnerBlocksProps.save(
                    useBlockProps.save( { className: newClassNames } )
                )}
                style={ { ...styleProps } }
            />
        </>
    );
}
