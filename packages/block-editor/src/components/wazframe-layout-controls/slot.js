/**
 * WordPress dependencies
 */
import { __experimentalUseSlot as useSlot } from '@wordpress/components';
import warning from '@wordpress/warning';

/**
 * Internal dependencies
 */
import CustomSupportToolsPanel from "./custom-support-tools-panel";
import CustomSupportSlotContainer from "./custom-support-slot-container";
import groups from './groups';

export default function WazFrameLayoutControlsSlot( { group, label, ...props } )
{
    const Slot = groups[ group ]?.Slot;
    const slot = useSlot( Slot?.__unstableName );
    if ( ! Slot || ! slot ) {
        warning( `Unknown WazFrameLayoutControls group "${ group }" provided.` );
        return null;
    }

    const hasFills = Boolean( slot.fills && slot.fills.length );
    if ( ! hasFills ) {
        return null;
    }

    if ( label ) {
        return (
            <CustomSupportToolsPanel group={ group } label={ label }>
                <CustomSupportSlotContainer { ...props } Slot={ Slot } />
            </CustomSupportToolsPanel>
        );
    }

    return <Slot { ...props } bubblesVirtually />;
}