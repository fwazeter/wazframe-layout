/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';


export default function save( { attributes } ) {
    const {
        position,
        positionType,
        contain,
        margin,
        style,
    } = attributes

    const styleProps = {
        "--wf-imposter--space": style?.spacing?.blockGap,
    }

    if ( positionType ) {
        Object.assign(styleProps, { '--wf--position': positionType })
    }

    // When we reset the value from the position picker (focal point picker under the hood)
    // while the position: value ends up undefined, the calculations here still run
    // and return NaN (not number). This prevents that.
    if ( typeof position?.x && position?.y !== 'undefined' ) {
        const numX = parseInt( position?.x, 10 );
        const numY = parseInt( position?.y, 10 );

        if ( ! isNaN( numX ) && ! isNaN( numY ) ) {
            Object.assign(styleProps, {
                '--wf--inline-start': `${ position?.x * 100 }%`,
                '--wf--block-start': `${ position?.y * 100 }%`,
                '--wf--translate': `${ position?.x * -100 }%,${ position?.y * -100 }%`
            })
        }
    }

    const isContained = style?.spacing?.blockGap ? 'contain' : '';

    return (
        <>
            <div
                { ...useInnerBlocksProps.save(
                    useBlockProps.save( { className: isContained, style: styleProps } )
                )}
            />
        </>
    );
}
