/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
    blockGapOptions,
    getInlineStyle,
    getPresetClass
} from "../../block-editor";
import {
    setCustomFlexGrow,
    setLimitClassName
} from "./setClassName";

import { options } from "./constants";


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
