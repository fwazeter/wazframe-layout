/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import {setCustomFlexGrow, setLimitClassName} from "./setClassName";
import {blockGapOptions, getInlineStyle, getPresetClass} from "../editor-components";
import {options} from "./constants";

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
        width,
        flex,
        blockGap,
        limit,
        customChild,
        tagName: Tag,
    } = attributes

    const blockGapPresetClass = getPresetClass( blockGapOptions, blockGap )
    const blockGapInlineStyle = getInlineStyle( blockGapOptions, blockGap )
    const widthPresetClass = getPresetClass( options, width )
    const widthInlineStyle = getInlineStyle( options, width )

    const styleProps = {
        "--wf-switcher--space": blockGapInlineStyle,
        "--wf--content-width": widthInlineStyle
    }

    const newFlexGrow = flex?.flexGrow;

    const switchAfter = Number(limit) + 1;

    const limitStyle = setLimitClassName( switchAfter );

    const newChildGrowProp = setCustomFlexGrow( customChild, newFlexGrow );

    const appendStyles = customChild && newFlexGrow ?
        `${limitStyle} \n ${newChildGrowProp}` : limitStyle;

    const newClassNames = customChild && newFlexGrow ?
        `grow-${customChild} switch-${switchAfter}` :
        `switch-${switchAfter}`;

    const optionalClassNames = classnames(
        widthPresetClass,
        blockGapPresetClass,
        newClassNames
    )

    return (
        <>
            <style>{ appendStyles }</style>
            <Tag
                { ...useInnerBlocksProps.save(
                    useBlockProps.save( { className: optionalClassNames, style: styleProps } )
                )}
            />
        </>
    );
}
