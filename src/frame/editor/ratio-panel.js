/**
 * External dependencies
 */
import {
    cleanEmptyObject,
    namespace
} from "@wazframe/block-editor";

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
    hasValue as hasAspectRatio,
    reset as resetAspectRatio,
    AspectRatioEdit
} from './aspect-ratio';

import {
    hasValue as hasPortraitRatio,
    reset as resetPortraitRatio,
    PortraitRatioEdit
} from './portrait-ratio';


function RatioPanel( props ) {

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
                const { attributes } = getBlockAttributes( clientId );
                let newBlockAttributes = { attributes };

                resetFilters.forEach( ( resetFilter ) => {
                    newBlockAttributes = {
                        ...newBlockAttributes,
                        ...resetFilter( newBlockAttributes ),
                    };
                } );

                newBlockAttributes = {
                    ...newBlockAttributes,
                    attributes: cleanEmptyObject( newBlockAttributes.attributes ),
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
        attributes: {
            ...newAttributes,
            [ attribute ]: '16 / 9'
        }
    } );

    return (
        <>
            <ToolsPanel
                label={ __( 'Aspect Ratio', namespace ) }
                resetAll={ resetAll }
                className={ 'wp-block-wazframe-space-panel' }
                panelId={ props.clientId }
            >
                <ToolsPanelItem
                    hasValue={ () => hasAspectRatio( props ) }
                    label={ __( 'Default Aspect Ratio', namespace ) }
                    onDeselect={ () => resetAspectRatio( props ) }
                    resetAllFilter={ createResetAllFilter( 'aspectRatio' ) }
                    isShownByDefault={ true }
                    panelId={ props.clientId }
                >
                    <AspectRatioEdit { ...props } />
                </ToolsPanelItem>
                <ToolsPanelItem
                    hasValue={ () => hasPortraitRatio( props ) }
                    label={ __( 'Portrait (Mobile) Ratio', namespace ) }
                    onDeselect={ () => resetPortraitRatio( props ) }
                    resetAllFilter={ createResetAllFilter( 'portraitRatio' ) }
                    isShownByDefault={ true }
                    panelId={ props.clientId }
                >
                    <PortraitRatioEdit { ...props } />
                </ToolsPanelItem>
            </ToolsPanel>
        </>
    )
}

export default RatioPanel;
