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
import SpacingPanel from '../editor-components/spacing';
import { WidthEdit } from '../editor-components/width';
import HTMLElementsInspector from "../utils/html-element-messages";

import namespace from '../utils/namespace';


export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;
    const {
        style,
        templateLock,
        tagName: TagName = 'section',
    } = attributes;

    const styleProps = {
        "--wf-grid--space": style?.spacing?.blockGap,
        "--wf--content-width": style?.size?.width,
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
                <PanelBody title={ __('Grid Column Width', namespace ) } initialOpen={true}>
                    <WidthEdit { ...props } />
                </PanelBody>
                <SpacingPanel { ...props } />
            </InspectorControls>
            <HTMLElementsInspector { ...props } />
            <TagName { ...innerBlocksProps } style={ { ...styleProps } } />
        </>
    );
}
