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
    paddingOptions,
    getPresetClass,
    getInlineStyle,
} from "../editor-components";

import { options } from "./constants";

export default function save( { attributes, className } ) {
    const {
        padding,
        height,
        noParentPadding,
        centerElement, // placeholder for later.
        tagName: Tag,
    } = attributes

    const removeParentPadding = noParentPadding ? 'wf-parent-space-none' : '';

    const heightClassNames = getPresetClass( options, height );
    const heightInlineStyle = getInlineStyle( options, height );

    const paddingClassNames = getPresetClass( paddingOptions, padding );
    const paddingInlineStyle = getInlineStyle( paddingOptions, padding );

    const styleProps = {
        "--wf-cover--space": paddingInlineStyle,
        "--wf--height": heightInlineStyle,
    }

    const optionalClassNames = classnames(
        className,
        removeParentPadding,
        heightClassNames,
        paddingClassNames
    )

    return <Tag
        { ...useInnerBlocksProps.save(
            useBlockProps.save( {
                className: optionalClassNames
            })
        ) } style={ { ...styleProps } }
    />;
}
