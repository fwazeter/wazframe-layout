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
} from "@wordpress/components";

import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import {
    HTMLElementsInspector,
    MinWidthPanel,
    BlockGapPanel,
    minWidthOptions,
    blockGapOptions,
    getInlineStyle,
    getPresetClass,
    namespace
} from '../../block-editor';


export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;
    const {
        minWidth,
        blockGap,
        templateLock,
        tagName: TagName = 'section',
    } = attributes;

    const minWidthClassName = getPresetClass( minWidthOptions, minWidth );
    const minWidthInlineStyle = getInlineStyle( minWidthOptions, minWidth );

    const blockGapClassName = getPresetClass( blockGapOptions, blockGap );
    const blockGapInlineStyle = getInlineStyle( blockGapOptions, blockGap );

    const styleProps = {
        "--wf-grid--space": blockGapInlineStyle,
        "--wf--min-width": minWidthInlineStyle,
    }

    const blockProps = useBlockProps();

    const optionalClassNames = classnames(
        minWidthClassName,
        blockGapClassName,
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
            <InspectorControls>
                <PanelBody title={ __('Grid Settings', namespace ) } initialOpen={true}>
                    <MinWidthPanel { ...props } />
                    <BlockGapPanel { ...props } />
                </PanelBody>
            </InspectorControls>
            <HTMLElementsInspector { ...props } />
            <TagName { ...innerBlocksProps }
                     className={ classnames(
                         blockProps.className,
                         optionalClassNames
                     ) }
                     style={ { ...styleProps } } />
        </>
    );
}
