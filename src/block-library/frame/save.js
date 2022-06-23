/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';


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
