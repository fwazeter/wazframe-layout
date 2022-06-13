/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    __experimentalToolsPanelItem as ToolsPanelItem,
    __experimentalToolsPanel as ToolsPanel,
    Flex, FlexItem,
} from '@wordpress/components';

import {
    store as blockEditorStore,
} from '@wordpress/block-editor';
import {useCallback } from "@wordpress/element";
import { useDispatch, useSelect } from '@wordpress/data';


/**
 * Internal Dependencies
 */
import {
    hasValue as hasTranslateX,
    reset as resetTranslateX,
    TranslateXEdit
} from './translate-x';

import {
    hasValue as hasTranslateY,
    reset as resetTranslateY,
    TranslateYEdit
} from './translate-y';

import {
    hasValue as hasBlockStart,
    reset as resetBlockStart,
    BlockStartEdit
} from './block-start';

import {
    hasValue as hasInlineStart,
    reset as resetInlineStart,
    InlineStartEdit
} from './inline-start';


import {
    cleanEmptyObject
} from "../../utils";
import namespace from '../../utils/namespace';


function PositionPanel( props ) {

    const { updateBlockAttributes } = useDispatch( blockEditorStore );
    const {
        getBlockAttributes,
        getSelectedBlockClientId
    } = useSelect( blockEditorStore );

    const panelId = getSelectedBlockClientId();

    /**
     * Uses the block editor data store to get the clientId's for
     * each panel, associated with the block and panel area, then
     * allows for the createResetAllFilters function on individual blocks to work.
     *
     * This is slightly complicated, but could be basis for extending
     * global styles.
     * @url https://github.com/WordPress/gutenberg/blob/8675f86f885ca389f3bca39971b22cb897bab61b/packages/block-editor/src/components/inspector-controls/block-support-tools-panel.js
     * @url https://github.com/WordPress/gutenberg/blob/6215bbcba156793eeaec2c77f8ae6b78876670eb/packages/block-editor/src/hooks/dimensions.js
     * @type {(function(*=): void)|*}
     */
    const resetAll = useCallback(
        ( resetFilters = [] ) => {
            const newAttributes = {};

            const clientIds = [ panelId ];

            clientIds.forEach( ( clientId ) => {
                const { style } = getBlockAttributes( clientId );
                let newBlockAttributes = { style };

                resetFilters.forEach( ( resetFilter ) => {
                    newBlockAttributes = {
                        ...newBlockAttributes,
                        ...resetFilter( newBlockAttributes ),
                    };
                } );

                newBlockAttributes = {
                    ...newBlockAttributes,
                    style: cleanEmptyObject( newBlockAttributes.style ),
                };

                newAttributes[ clientId ] = newBlockAttributes;
            } )

            updateBlockAttributes( clientIds, newAttributes, true );
        },
        [
            cleanEmptyObject,
            getBlockAttributes,
            panelId,
            updateBlockAttributes,
        ]
    );

    const createResetAllFilter = ( attribute ) => ( newAttributes ) => ( {
        ...newAttributes,
        style: {
            ...newAttributes.style,
            position: {
                ...newAttributes.style?.position,
                [ attribute ]: undefined,
            }
        }
    } );

    return (
        <>
            <ToolsPanel
                label={ __( 'Position on Screen', namespace ) }
                resetAll={ resetAll }
                className={ 'wp-block-wazframe-space-panel' }
                panelId={ props.clientId }
            >
                <Flex justify='space-between' direction={ ['row']} wrap={ true }>
                    <FlexItem>
                        <ToolsPanelItem
                            hasValue={ () => hasInlineStart( props ) }
                            label={ __( 'Horizontal Start', namespace ) }
                            onDeselect={ () => resetInlineStart( props ) }
                            resetAllFilter={ createResetAllFilter( 'inlineStart' ) }
                            isShownByDefault={ true }
                            panelId={ props.clientId }
                        >
                            <InlineStartEdit { ...props } />
                        </ToolsPanelItem>
                    </FlexItem>
                    <FlexItem>
                        <ToolsPanelItem
                            hasValue={ () => hasTranslateX( props ) }
                            label={ __( 'Translate X', namespace ) }
                            onDeselect={ () => resetTranslateX( props ) }
                            resetAllFilter={ createResetAllFilter( 'translateX' ) }
                            isShownByDefault={ true }
                            panelId={ props.clientId }
                        >
                            <TranslateXEdit { ...props } />
                        </ToolsPanelItem>
                    </FlexItem>
                </Flex>
                <Flex justify='space-between' direction={ ['row']} wrap={ true }>
                    <FlexItem>
                        <ToolsPanelItem
                            hasValue={ () => hasBlockStart( props ) }
                            label={ __( 'Vertical Start', namespace ) }
                            onDeselect={ () => resetBlockStart( props ) }
                            resetAllFilter={ createResetAllFilter( 'blockStart' ) }
                            isShownByDefault={ true }
                            panelId={ props.clientId }
                        >
                            <BlockStartEdit { ...props } />
                        </ToolsPanelItem>
                    </FlexItem>
                    <FlexItem>
                        <ToolsPanelItem
                            hasValue={ () => hasTranslateY( props ) }
                            label={ __( 'Translate Y', namespace ) }
                            onDeselect={ () => resetTranslateY( props ) }
                            resetAllFilter={ createResetAllFilter( 'translateY' ) }
                            isShownByDefault={ true }
                            panelId={ props.clientId }
                        >
                            <TranslateYEdit { ...props } />
                        </ToolsPanelItem>
                    </FlexItem>
                </Flex>
            </ToolsPanel>
        </>
    )
}

export default PositionPanel;
