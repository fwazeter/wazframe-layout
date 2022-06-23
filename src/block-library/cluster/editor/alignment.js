/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    __experimentalToolsPanelItem as ToolsPanelItem,
    __experimentalToolsPanel as ToolsPanel,
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
    hasValue as hasJustifyContent,
    reset as resetJustifyContent,
    JustifyContentEdit
} from './justify-content';

import {
    hasValue as hasAlignItems,
    reset as resetAlignItems,
    AlignItemsEdit
} from './align-items';

import {
    cleanEmptyObject
} from "../../utils";
import namespace from '../../utils/namespace';


function ClusterPanel( props ) {

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
                const { flex } = getBlockAttributes( clientId );
                let newBlockAttributes = { flex };

                resetFilters.forEach( ( resetFilter ) => {
                    newBlockAttributes = {
                        ...newBlockAttributes,
                        ...resetFilter( newBlockAttributes ),
                    };
                } );

                newBlockAttributes = {
                    ...newBlockAttributes,
                    flex: cleanEmptyObject( newBlockAttributes.flex ),
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
        flex: {
            ...newAttributes.flex,
            [ attribute ]: 'flex-start',
        }
    } );

    return (
        <>
            <ToolsPanel
                label={ __( 'Alignment', namespace ) }
                resetAll={ resetAll }
                className={ 'wp-block-wazframe-space-panel' }
                panelId={ props.clientId }
            >
                <ToolsPanelItem
                    hasValue={ () => hasJustifyContent( props ) }
                    label={ __( 'Justify Content Property', namespace ) }
                    onDeselect={ () => resetJustifyContent( props ) }
                    resetAllFilter={ createResetAllFilter( 'justifyContent' ) }
                    isShownByDefault={ true }
                    panelId={ props.clientId }
                >
                    <JustifyContentEdit { ...props } />
                </ToolsPanelItem>
                <ToolsPanelItem
                    hasValue={ () => hasAlignItems( props ) }
                    label={ __( 'Align Items Property', namespace ) }
                    onDeselect={ () => resetAlignItems( props ) }
                    resetAllFilter={ createResetAllFilter( 'alignItems' ) }
                    isShownByDefault={ true }
                    panelId={ props.clientId }
                >
                    <AlignItemsEdit { ...props } />
                </ToolsPanelItem>
            </ToolsPanel>
        </>
    )
}

export default ClusterPanel;
