/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

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
        aspectRatio,
        portraitRatio,
        mediaURL,
        mediaAlt,
        mediaCaption,
        url,
        rel,
        linkClass,
        linkTarget,
        title,
    } = attributes;

    const ratioValue = aspectRatio;
    const portraitValue = portraitRatio;

    const styleProps = {}

    if ( ratioValue !== '16 / 9' ) {
        Object.assign( styleProps, { '--wf--ratio': ratioValue } );
    }

    if ( portraitValue !== '16 / 9' ) {
        Object.assign( styleProps, { '--wf--portrait-ratio': portraitValue } );
    }

    const newRel = isEmpty( rel ) ? undefined : rel;

    const image = (
        <img
            src={ mediaURL }
            alt={ mediaAlt }
            title={ title }
        />
    );

    const figure = (
        <>
            { url ? (
                <a
                    className={ linkClass }
                    href={ url }
                    target={ linkTarget }
                    rel={ newRel }
                >
                    { image }
                </a>
            ) : (
                image
            ) }
            { ! RichText.isEmpty( mediaCaption ) && (
                <RichText.Content tagName="figcaption" value={ mediaCaption } />
            ) }
        </>
    );

    return (
        <figure { ...useBlockProps.save( { style: styleProps } ) }>
            { figure }
        </figure>
    );
}
