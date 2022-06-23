/**
 * External dependencies
 */
import classnames from "classnames";
import {
    blockGapOptions,
    getInlineStyle,
    getPresetClass
} from "@wazframe/block-editor";

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';


/**
 * Internal dependencies
 */
import { sidebarOptions } from "./constants";


export default function save( { attributes, className } ) {
    const {
        flex,
        blockGap,
        width,
        contentWidth,
        sidebarRight,
        tagName: Tag,
    } = attributes

    const hasSidebarRight = sidebarRight ? 'sidebar-right' : 'sidebar-left';

    const sidebarWidthClassNames = getPresetClass( sidebarOptions, width );
    const sidebarInlineStyle = getInlineStyle( sidebarOptions, width );

    const blockGapClassNames = getPresetClass( blockGapOptions, blockGap );
    const blockGapInlineStyle = getInlineStyle( blockGapOptions, blockGap );

    const optionalClassNames = classnames(
        className,
        hasSidebarRight,
        sidebarWidthClassNames,
        blockGapClassNames
    )

    const styleProps = {
        '--wf-sidebar--space': blockGapInlineStyle,
        '--wf--width': sidebarInlineStyle,
        '--wf--content-width': contentWidth
    }

    const alignItemsStyle = flex?.alignItems;

    if ( alignItemsStyle !== 'stretch' ) {
        Object.assign( styleProps, { '--wf--align-items': alignItemsStyle } );
    }

    return <Tag
        { ...useInnerBlocksProps.save(
            useBlockProps.save( { className: optionalClassNames, style: styleProps } )
        )}
    />;
}
