/**
 * WordPress dependencies
 */
import { useSelect } from "@wordpress/data";
import {
    useBlockEditContext,
    store as blockEditorStore
} from "@wordpress/block-editor";

export default function useDisplayBlockControls() {
    const { isSelected, clientId, name } = useBlockEditContext();
    return useSelect(
        ( select ) => {
            if ( isSelected ) {
                return true;
            }

            const {
                getBlockName,
                isFirstMultiSelectedBlock,
                getMultiSelectedBlockClientIds,
            } = select( blockEditorStore );

            if ( isFirstMultiSelectedBlock( clientId ) ) {
                return getMultiSelectedBlockClientIds().every(
                    ( id ) => getBlockName( id ) === name
                );
            }

            return false;
        },
        [ clientId, isSelected, name ]
    );
}
