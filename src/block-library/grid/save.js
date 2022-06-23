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
    getInlineStyle,
    getPresetClass,
    blockGapOptions,
    minWidthOptions
} from "../../block-editor";

export default function save( { attributes } ) {
    const {
        minWidth,
        blockGap,
        tagName: Tag,
    } = attributes

    const minWidthClassName = getPresetClass( minWidthOptions, minWidth );
    const minWidthInlineStyle = getInlineStyle( minWidthOptions, minWidth );

    const blockGapClassName = getPresetClass( blockGapOptions, blockGap );
    const blockGapInlineStyle = getInlineStyle( blockGapOptions, blockGap );

    const styleProps = {
        "--wf-grid--space": blockGapInlineStyle,
        "--wf--min-width": minWidthInlineStyle,
    }

    const optionalClassNames = classnames(
        minWidthClassName,
        blockGapClassName,
    )

    return (
        <>
            <Tag
                { ...useInnerBlocksProps.save(
                    useBlockProps.save( { className: optionalClassNames, style: styleProps } )
                )}
            />
        </>
    );
}
