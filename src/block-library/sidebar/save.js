/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import {blockGapOptions, getInlineStyle, getPresetClass} from "../editor-components";
import {sidebarOptions} from "./constants";
import classnames from "classnames";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
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
