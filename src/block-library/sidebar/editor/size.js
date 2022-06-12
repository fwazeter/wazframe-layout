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
    hasValue as hasFlexBasis,
    reset as resetFlexBasis,
    FlexBasisEdit
} from './flex-basis';

import {
    hasValue as hasMinWidth,
    reset as resetMinWidth,
    MinWidthEdit
} from './min-width';

import {
    cleanEmptyObject
} from "../../utils";
import namespace from '../../utils/namespace';


function SizePanel( props ) {

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
            size: {
                ...newAttributes.style?.size,
                [ attribute ]: undefined,
            }
        }
    } );

    return (
        <>
            <ToolsPanel
                label={ __( 'Height & Width Sizes', namespace ) }
                resetAll={ resetAll }
                className={ 'wp-block-wazframe-space-panel' }
                panelId={ props.clientId }
            >
                <ToolsPanelItem
                    hasValue={ () => hasFlexBasis( props ) }
                    label={ __( 'Sidebar Width', namespace ) }
                    onDeselect={ () => resetFlexBasis( props ) }
                    resetAllFilter={ createResetAllFilter( 'flexBasis' ) }
                    isShownByDefault={ true }
                    panelId={ props.clientId }
                >
                    <FlexBasisEdit { ...props } />
                </ToolsPanelItem>
                <ToolsPanelItem
                    hasValue={ () => hasMinWidth( props ) }
                    label={ __( 'Main Content Min Width', namespace ) }
                    onDeselect={ () => resetMinWidth( props ) }
                    resetAllFilter={ createResetAllFilter( 'minWidth' ) }
                    isShownByDefault={ true }
                    panelId={ props.clientId }
                >
                    <MinWidthEdit { ...props } />
                </ToolsPanelItem>
            </ToolsPanel>
        </>
    )
}

export default SizePanel;
