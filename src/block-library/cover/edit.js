/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    InspectorControls,
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
import SpacingPanel from './editor/spacing';
import { HeightEdit } from '../editor-components/height';
import HTMLElementsInspector from "../utils/html-element-messages";

import namespace from '../utils/namespace';


export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;
    const {
        style, // CSS margin value for margin-block-start.
        templateLock,
        tagName: TagName = 'section',
    } = attributes;

    const spaceValue = style?.spacing?.preset;
    const spaceCustomValue = style?.spacing?.padding?.top;

    const parentSpaceValue = style?.spacing?.parentPreset;
    const parentSpaceCustomValue = style?.spacing?.parentPadding?.top;

    const spacePaddingValue = spaceValue === 'custom' ? spaceCustomValue : spaceValue;
    const parentSpacePaddingValue = parentSpaceValue === 'custom' ? parentSpaceCustomValue : parentSpaceValue;

    const styleProps = {
        "--space": spacePaddingValue,
        "--space-parent": parentSpacePaddingValue,
        "--height": style?.size?.height,
    }

    const blockProps = useBlockProps();

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

    return (
        <>
            <InspectorControls>
                <SpacingPanel { ...props } />
                <PanelBody title={ __('Cover Height', namespace ) } initialOpen={true}>
                    <HeightEdit { ...props } />
                </PanelBody>
            </InspectorControls>
            <HTMLElementsInspector { ...props } />
            <TagName { ...innerBlocksProps } style={ { ...styleProps } } />
        </>
    );
}
