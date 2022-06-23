/**
 * External dependencies
 */
import classnames from 'classnames';
import {
    HTMLElementsInspector,
    PaddingPanel,
    paddingOptions,
    getPresetClass,
    getInlineStyle,
    namespace
} from "@wazframe/block-editor";

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
    ToggleControl
} from "@wordpress/components";

import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import HeightPanel from "./editor/height";
import { options } from "./constants";



export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;
    const {
        padding,
        height,
        noParentPadding,
        centerElement, // placeholder for later.
        templateLock,
        tagName: TagName = 'section',
    } = attributes;

    const removeParentPadding = noParentPadding ? 'wf-parent-space-none' : '';

    const heightClassNames = getPresetClass( options, height );
    const heightInlineStyle = getInlineStyle( options, height );

    const paddingClassNames = getPresetClass( paddingOptions, padding );
    const paddingInlineStyle = getInlineStyle( paddingOptions, padding );

    const styleProps = {
        "--wf-cover--space": paddingInlineStyle,
        "--wf--height": heightInlineStyle,
    }

    const blockProps = useBlockProps();

    const optionalClassNames = classnames(
        removeParentPadding,
        heightClassNames,
        paddingClassNames
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
                <PanelBody title={ __('Cover Settings', namespace ) } initialOpen={true}>
                    <HeightPanel { ...props } />
                    <PaddingPanel { ...props } />
                    <ToggleControl
                        label={__('Remove Parent Spacing?', namespace)}
                        help={ noParentPadding ? "Padding is removed from the cover" : "Cover has padding"}
                        checked={ noParentPadding }
                        onChange={ () => setAttributes({ noParentPadding: ! noParentPadding }) }
                    />
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
