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
import {getInlineStyle, getPresetClass} from "../editor-components/style-engine";
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
export default function save( { attributes, className } ) {
    const {
        tagName: Tag,
        flex,
        blockGap,
    } = attributes

    const newClassNames = getPresetClass( options, blockGap );
    const inlineStyle = getInlineStyle( options, blockGap );

    const addClassNames = classnames(
        className,
        newClassNames
    );

    const styleProps = {
        '--wf-cluster--space': inlineStyle
    }


    const justifyContentStyle = flex?.justifyContent;

    if ( justifyContentStyle !== 'flex-start' ) {
        Object.assign( styleProps, { '--wf--justify-content': justifyContentStyle } );
    }

    const alignItemsStyle = flex?.alignItems;

    if ( alignItemsStyle !== 'flex-start' ) {
        Object.assign( styleProps, { '--wf--align-items': alignItemsStyle } );
    }

    return <Tag
            { ...useInnerBlocksProps.save(
                useBlockProps.save( { className: addClassNames, style: styleProps } )
            )}
        />;
}
