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
        sidebarRight,
    } = attributes

    const hasSidebarRight = sidebarRight ? 'sidebar-right' : 'sidebar-left';

    const styleProps = {
        '--wf-sidebar--space': style?.spacing?.blockGap,
        '--wf--flex-basis': style?.size?.flexBasis,
        '--wf--content-width': style?.size?.minWidth
    }

    const alignItemsStyle = style?.flex?.alignItems;

    if ( alignItemsStyle !== 'stretch' ) {
        Object.assign( styleProps, { '--wf--align-items': alignItemsStyle } );
    }

    return <Tag
        { ...useInnerBlocksProps.save(
            useBlockProps.save( { className: hasSidebarRight, style: styleProps } )
        )}
    />;
}
