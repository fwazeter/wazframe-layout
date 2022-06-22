/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
    KeyboardShortcuts,
    ToolbarButton,
    Popover,
} from '@wordpress/components';
import {
    BlockControls,
    __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';


function URLPicker( {
                        isSelected,
                        url,
                        setAttributes,
                        opensInNewTab,
                        onToggleOpenInNewTab,
                        anchorRef,
                    } ) {
    const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );
    const urlIsSet = !! url;
    const urlIsSetandSelected = urlIsSet && isSelected;
    const openLinkControl = () => {
        setIsURLPickerOpen( true );
        return false; // prevents default behaviour for event
    };
    const unlinkButton = () => {
        setAttributes( {
            url: undefined,
            linkTarget: undefined,
            rel: undefined,
        } );
        setIsURLPickerOpen( false );
    };
    const linkControl = ( isURLPickerOpen || urlIsSetandSelected ) && (
        <Popover
            position="bottom center"
            onClose={ () => setIsURLPickerOpen( false ) }
            anchorRef={ anchorRef?.current }
        >
            <LinkControl
                className="wp-block-navigation-link__inline-link-input"
                value={ { url, opensInNewTab } }
                onChange={ ( {
                                 url: newURL = '',
                                 opensInNewTab: newOpensInNewTab,
                             } ) => {
                    setAttributes( { url: newURL } );

                    if ( opensInNewTab !== newOpensInNewTab ) {
                        onToggleOpenInNewTab( newOpensInNewTab );
                    }
                } }
            />
        </Popover>
    );
    return (
        <>
            <BlockControls group="block">
                { ! urlIsSet && (
                    <ToolbarButton
                        name="link"
                        icon={ link }
                        title={ __( 'Link' ) }
                        shortcut={ displayShortcut.primary( 'k' ) }
                        onClick={ openLinkControl }
                    />
                ) }
                { urlIsSetandSelected && (
                    <ToolbarButton
                        name="link"
                        icon={ linkOff }
                        title={ __( 'Unlink' ) }
                        shortcut={ displayShortcut.primaryShift( 'k' ) }
                        onClick={ unlinkButton }
                        isActive={ true }
                    />
                ) }
            </BlockControls>
            { isSelected && (
                <KeyboardShortcuts
                    bindGlobal
                    shortcuts={ {
                        [ rawShortcut.primary( 'k' ) ]: openLinkControl,
                        [ rawShortcut.primaryShift( 'k' ) ]: unlinkButton,
                    } }
                />
            ) }
            { linkControl }
        </>
    );
}

export default URLPicker;