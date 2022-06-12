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
    Flex,
    __experimentalNumberControl as NumberControl
} from "@wordpress/components";

import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import SpacingPanel from '../editor-components/spacing';
import { WidthEdit } from '../editor-components/width';
import { FlexGrowEdit } from "../editor-components/flexGrow";
import LimitEdit from "./editor/limit";
import HTMLElementsInspector from "../utils/html-element-messages";

import { setLimitClassName, setCustomFlexGrow } from './setClassName'
import namespace from '../utils/namespace';


export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;
    const {
        style, // CSS margin value for margin-block-start.
        limit,
        customChild,
        templateLock,
        tagName: TagName = 'div',
    } = attributes;

    const styleProps = {
        "--space": style?.spacing?.blockGap,
        "--measure": style?.size?.width
    }

    const newFlexGrow = style?.flex?.flexGrow;

    const switchAfter = Number(limit) + 1;

    const limitStyle = setLimitClassName( switchAfter );

    const newChildGrowProp = setCustomFlexGrow( customChild, newFlexGrow );

    const appendStyles = customChild && newFlexGrow ?
        `${limitStyle} \n ${newChildGrowProp}` : limitStyle;

    const newClassNames = customChild && newFlexGrow ?
        `grow-${customChild} switch-${switchAfter}` :
        `switch-${switchAfter}`;

    const blockProps = useBlockProps({
        className: newClassNames,
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

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __('Horizontal Item Limit', namespace ) } initialOpen={true}>
                    <LimitEdit { ...props } />
                </PanelBody>
                <PanelBody title={ __('Container Breakpoint', namespace ) } initialOpen={true}>
                    <WidthEdit { ...props } />
                </PanelBody>
                <SpacingPanel { ...props } />
                <PanelBody title={ __('Custom Child Length', namespace) } initialOpen={false}>
                    <Flex justify='space-between' align='baseline'>
                        <NumberControl
                            value={ customChild }
                            label={ __( 'Child Block Number' )}
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={10}
                            step={1}
                            onChange={ (value) => setAttributes({customChild: value}) }
                        />
                        <FlexGrowEdit { ...props } />
                    </Flex>
                </PanelBody>
            </InspectorControls>
            <HTMLElementsInspector { ...props } />
            <style>{ appendStyles }</style>
            <TagName { ...innerBlocksProps } style={ { ...styleProps } } />
        </>
    );
}
