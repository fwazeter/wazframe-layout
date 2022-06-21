/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    BlockControls,
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
    store as blockEditorStore, InspectorControls,
} from "@wordpress/block-editor";

import {
    PanelBody,
    PanelRow,
    ToolbarGroup,
    ToolbarButton
} from "@wordpress/components";

import { alignCenter, positionCenter } from '@wordpress/icons';

import { useSelect } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import namespace from "../utils/namespace";
import { getInlineStyle, getPresetClass } from "../editor-components";
import { paddingOptions, widthOptions } from "./constants";
import BlockOptions from "../editor-components/options"
import { Padding } from "../editor-components/options/padding";
import { CustomWidth } from "../editor-components/options/custom-width";



export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;
    const {
        width,
        padding,
        intrinsic,
        textAlignCenter,
        templateLock,
    } = attributes;

    const widthClassNames = getPresetClass( widthOptions, width )
    const widthInlineStyle = getInlineStyle( widthOptions, width )
    const paddingClassNames = getPresetClass( paddingOptions, padding )
    const paddingInlineStyle = getInlineStyle( paddingOptions, padding )


    const styleProps = {
        "--wf--content-width": widthInlineStyle,
        "--wf-center--space": paddingInlineStyle,
    }

    const isIntrinsic = intrinsic ? 'intrinsic' : '';
    const isTextAlignCenter = textAlignCenter ? 'and-text-center': '';

    const blockProps = useBlockProps();
    const optionalClassNames = classnames(
        widthClassNames,
        paddingClassNames,
        isIntrinsic,
        isTextAlignCenter
    )

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
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={ positionCenter }
                        title={ __('Center Elements Intrinsically', namespace)}
                        onClick={ () => setAttributes( {intrinsic: ! intrinsic } )}
                        isActive={ !! intrinsic }
                    />
                    <ToolbarButton
                        icon={ alignCenter }
                        title={ __('Align Text Center', namespace)}
                        onClick={ () => setAttributes( { textAlignCenter: ! textAlignCenter})}
                        isActive={ !! textAlignCenter }
                    />
                </ToolbarGroup>
            </BlockControls>
            <InspectorControls>
                <PanelBody title='Content Width'>
                    <BlockOptions props={ props } options={ widthOptions } attributeName='width' />
                    <PanelRow>
                        <CustomWidth { ...props } />
                    </PanelRow>
                </PanelBody>
                <PanelBody title='Horizontal Spacing'>
                    <BlockOptions props={ props } options={ paddingOptions } attributeName='padding' />
                    <PanelRow>
                        <Padding { ...props } />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <div
                { ...innerBlocksProps }
                className={
                    classnames(
                        blockProps.className,
                        optionalClassNames
                    )
                }
                style={ { ...styleProps } } />
        </>
    );
}
