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
    PanelBody, ToggleControl,
} from "@wordpress/components";

import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import SpacingPanel from '../editor-components/spacing';
import PositionPanel from './editor/position-panel';
import namespace from '../utils/namespace';
import { BlockPositionControl } from "../../block-editor";


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
        "--wf--block-start": style?.position?.blockStart,
        "--wf--inline-start": style?.position?.inlineStart,
        "--wf--translate-x": style?.position?.translateX,
        "--wf--translate-y": style?.position?.translateY,
    }

    if ( position ) {
        Object.assign(styleProps, { '--wf--positioning': 'fixed' })
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
                <PanelBody title={ __('Breakout of Parent Container', namespace ) } initialOpen={true}>
                    <ToggleControl
                        label={__('Position to Viewport', namespace)}
                        help={ position ? "Imposter position is relative to viewport instead of container" : "Imposter position is relative to parent container"}
                        checked={ position }
                        onChange={() => setAttributes({ position: !position})}
                    />
                </PanelBody>
                <PositionPanel { ...props } />
                <SpacingPanel { ...props } />
            </InspectorControls>
            <div { ...innerBlocksProps } style={ { ...styleProps } } />
        </>
    );
}
