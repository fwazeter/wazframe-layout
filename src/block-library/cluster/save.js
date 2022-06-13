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

    const styleProps = {
        '--wf-cluster--space': style?.spacing?.blockGap
    }

    const justifyContentStyle = style?.flex?.justifyContent;

    if ( justifyContentStyle !== 'flex-start' ) {
        Object.assign( styleProps, { '--wf--justify-content': justifyContentStyle } );
    }

    const alignItemsStyle = style?.flex?.alignItems;

    if ( alignItemsStyle !== 'flex-start' ) {
        Object.assign( styleProps, { '--wf--align-items': alignItemsStyle } );
    }

    return <Tag
            { ...useInnerBlocksProps.save(
                useBlockProps.save( { style: styleProps } )
            )}
        />;
}
