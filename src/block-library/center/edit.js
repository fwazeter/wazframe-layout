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
    __experimentalUseBorderProps as useBorderProps,
    __experimentalUseColorProps as useColorProps,
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

    const paddingValue = spaceValue === 'custom' ? customValue : spaceValue;

    const isIntrinsic = intrinsic ? 'intrinsic' : '';
    const isTextAlignCenter = textAlignCenter ? 'and-text-center': '';

    const blockProps = useBlockProps();
    const optionalClassNames = classnames(
        isIntrinsic,
        isTextAlignCenter
    )

    const styleProps = {
        "--space": paddingValue,
    }

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
