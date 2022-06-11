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
import {useCallback, useState} from "@wordpress/element";
import { useDispatch, useSelect } from '@wordpress/data';


/**
 * Internal Dependencies
 */
import {
    MarginEdit,
    hasValue as hasMargin,
    reset as resetMargin,
} from "./margin";

import {
    PresetMarginEdit,
    hasValue as hasPresetMargin,
    reset as resetPresetMargin,
} from "./preset-margin";

import {
    cleanEmptyObject
} from "../../utils";
import namespace from '../../utils/namespace';


function SpacingPanel( props ) {

    const { updateBlockAttributes } = useDispatch( blockEditorStore );
    const {
        getBlockAttributes,
        getSelectedBlockClientId
    } = useSelect( blockEditorStore );

    const panelId = getSelectedBlockClientId();

    const presetValue = props.attributes.style?.spacing?.preset;


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
            spacing: {
                ...newAttributes.style?.spacing,
                [ attribute ]: undefined,
            }
        }
    } );

    const [ recursive, setRecursive ] = useState();

    return (
        <>
            <ToolsPanel
                label={ __( 'Spacing' ) }
                resetAll={ resetAll }
                className={ 'wp-block-wazframe-space-panel' }
                panelId={ props.clientId }
            >
                <ToolsPanelItem
                    hasValue={ () => hasPresetMargin( props ) }
                    label={ __( 'Preset Margin', namespace ) }
                    onDeselect={ () => resetPresetMargin( props ) }
                    resetAllFilter={ createResetAllFilter( 'preset' ) }
                    isShownByDefault={ true }
                    panelId={ props.clientId }
                >
                    <PresetMarginEdit { ...props } />
                </ToolsPanelItem>
                { presetValue === 'custom' &&
                    <ToolsPanelItem
                        hasValue={ () => hasMargin( props ) }
                        label={ __( 'Margin Controls', namespace ) }
                        onDeselect={ () => resetMargin( props ) }
                        resetAllFilter={ createResetAllFilter( 'margin' ) }
                        isShownByDefault={ true }
                        panelId={ props.clientId }
                    >
                        <MarginEdit { ...props } />
                    </ToolsPanelItem>
                }
            </ToolsPanel>
        </>
    )
}

export default SpacingPanel;
