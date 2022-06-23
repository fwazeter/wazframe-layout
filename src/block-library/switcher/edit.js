/**
 * External dependencies
 */
import classnames from 'classnames';

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
import { FlexGrowEdit } from "../editor-components/flexGrow";
import LimitEdit from "./editor/limit";
import HTMLElementsInspector from "../utils/html-element-messages";

import { setLimitClassName, setCustomFlexGrow } from './setClassName'
import namespace from '../utils/namespace';
import {
    BlockGapPanel,
    blockGapOptions,
    getPresetClass,
    getInlineStyle,
} from "../editor-components";
import WidthPanel from "./editor/content-width";
import { options } from "./constants";


export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;
    const {
        width,
        flex,
        blockGap,
        limit,
        customChild,
        templateLock,
        tagName: TagName = 'div',
    } = attributes;

    const blockGapPresetClass = getPresetClass( blockGapOptions, blockGap )
    const blockGapInlineStyle = getInlineStyle( blockGapOptions, blockGap )
    const widthPresetClass = getPresetClass( options, width )
    const widthInlineStyle = getInlineStyle( options, width )

    const styleProps = {
        "--wf-switcher--space": blockGapInlineStyle,
        "--wf--content-width": widthInlineStyle
    }

    const newFlexGrow = flex?.flexGrow;

    const switchAfter = Number(limit) + 1;

    const limitStyle = setLimitClassName( switchAfter );

    const newChildGrowProp = setCustomFlexGrow( customChild, newFlexGrow );

    const appendStyles = customChild && newFlexGrow ?
        `${limitStyle} \n ${newChildGrowProp}` : limitStyle;

    const newClassNames = customChild && newFlexGrow ?
        `grow-${customChild} switch-${switchAfter}` :
        `switch-${switchAfter}`;

    const optionalClassNames = classnames(
        widthPresetClass,
        blockGapPresetClass,
        newClassNames
    )

    const blockProps = useBlockProps({
        className: optionalClassNames,
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
                <PanelBody title={ __('Space Settings', namespace ) } initialOpen={true}>
                    <WidthPanel { ...props } />
                    <BlockGapPanel { ...props } />
                </PanelBody>
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
