/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    InspectorControls,
    BlockControls,
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
    store as blockEditorStore
} from '@wordpress/block-editor';

import {
    PanelBody,
} from "@wordpress/components";

import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import SpacingPanel from '../editor-components/spacing';

import {
    BlockPositionControl,
    PositionPicker
} from "../../block-editor";


export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;
    const {
        position,
        positionType,
        contain,
        margin,
        style,
        templateLock,
    } = attributes;

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

    const blockProps = useBlockProps({
        className: isContained
    });

    const { hasInnerBlocks } = useSelect(
        (select) => {
            const { getBlock } = select(blockEditorStore);
            const block = getBlock(clientId);
            return {
                hasInnerBlocks: !!(block && block.innerBlocks.length),
            };
        },
        [clientId]
    );

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        templateLock,
        renderAppender: hasInnerBlocks
            ? undefined
            : InnerBlocks.ButtonBlockAppender,
    });

    /**
     * Todo: Make this into a Hook.
     * @param nextPosition
     */
    const updatePositionType = ( nextPosition ) => {
        if ( ! nextPosition ) {
            nextPosition = undefined;
        }
        setAttributes( { positionType: nextPosition } );
    }

    return (
        <>
            <BlockControls>
                <BlockPositionControl
                    value={ positionType }
                    onChange={ updatePositionType }
                />
            </BlockControls>
            <InspectorControls>
                <PanelBody title={ __('Position' ) }>
                    <PositionPicker { ...props } />
                </PanelBody>
                <SpacingPanel { ...props } />
            </InspectorControls>
            <div { ...innerBlocksProps } style={ { ...styleProps } } />
        </>
    );
}
