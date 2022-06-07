/**
 * Reference file in core:
 * https://github.com/WordPress/gutenberg/blob/09cccc212bc57a71ef23bec74788d069b69b883b/packages/block-editor/src/components/inspector-controls/block-support-tools-panel.js
 */

/**
 * WordPress dependencies
 */
import { __experimentalToolsPanel as ToolsPanel } from '@wordpress/components';
import { useDispatch, useSelect } from "@wordpress/data";
import { useCallback } from "@wordpress/element";
import { store as blockEditorStore } from "@wordpress/block-editor";

/**
 * Internal dependencies.
 */
import { cleanEmptyObject } from "../../hooks/utils";

export default function CustomSupportToolsPanel( { children, group, label } ) {
    const {updateBlockAttributes} = useDispatch(blockEditorStore)
    const {
        getBlockAttributes,
        getMultiSelectedBlockClientIds,
        getSelectedBlockClientId,
        hasMultiSelection,
    } = useSelect( blockEditorStore );

    const panelId = getSelectedBlockClientId();

    const resetAll = useCallback(
        (resetFilters = []) => {
            const newAttributes = {};

            const clientIds = hasMultiSelection()
                ? getMultiSelectedBlockClientIds()
                : [panelId];

            clientIds.forEach((clientId) => {
                const { wazframe } = getBlockAttributes(clientId);
                let newBlockAttributes = { wazframe };

                resetFilters.forEach((resetFilter) => {
                    newBlockAttributes = {
                        ...newBlockAttributes,
                        ...resetFilter(newBlockAttributes),
                    };
                });

                // Enforce a cleaned style object.
                newBlockAttributes = {
                    ...newBlockAttributes,
                    wazframe: cleanEmptyObject(newBlockAttributes.wazframe),
                };

                newAttributes[clientId] = newBlockAttributes;
            });

            updateBlockAttributes(clientIds, newAttributes, true);
        },
        [
            cleanEmptyObject,
            getBlockAttributes,
            getMultiSelectedBlockClientIds,
            hasMultiSelection,
            panelId,
            updateBlockAttributes,
        ]
    );

    return (
        <ToolsPanel
            className={ `${ group }-custom-support-panel` }
            label={ label }
            resetAll={ resetAll }
            key={ panelId }
            hasInnerWrapper={ true }
            shouldRenderPlaceholderItems={ true } // Required to maintain fills ordering.
            __firstVisibleItemCSS="first"
            __lastVisibleItemClass="last"
        >
            { children }
        </ToolsPanel>
    )

}