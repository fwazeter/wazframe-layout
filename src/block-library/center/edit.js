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
    ToolbarGroup,
    ToolbarButton
} from "@wordpress/components";

import { alignCenter, positionCenter } from '@wordpress/icons';

import { useSelect } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import SpacingPanel from "./editor/spacing";
import MeasurePanel from "../editor-components/measure-panel";
import namespace from "../utils/namespace";


export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;
    const {
        style, // CSS margin value for margin-block-start.
        templateLock,
        intrinsic,
        textAlignCenter,
    } = attributes;

    const spaceValue = style?.spacing?.preset;
    const customValue = style?.spacing?.padding?.left;

    const contentWidth = style?.size?.contentWidth;
    const customWidth = style?.size?.width;

    const widthValue = contentWidth === 'custom' ? customWidth : contentWidth;

    const paddingValue = spaceValue === 'custom' ? customValue : spaceValue;

    const styleProps = {
        "--wf-center--space": paddingValue,
        "--wf--content-width": widthValue,
    }

    const isIntrinsic = intrinsic ? 'intrinsic' : '';
    const isTextAlignCenter = textAlignCenter ? 'and-text-center': '';

    const blockProps = useBlockProps();
    const optionalClassNames = classnames(
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
                <MeasurePanel { ...props } />
                <SpacingPanel { ...props } />
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
