/**
 * External dependencies
 */
import {
    widthUnits,
    getSize,
    getSizeObjectByValue,
    BlockOptionsPicker
} from "@wazframe/block-editor";

/**
 * Internal dependencies
 */
import { sidebarOptions } from "../constants";


function SidebarWidthPanel( props) {
    const {
        attributes,
        setAttributes
    } = props

    const onChange = ( value ) => {
        const sizeSlug = getSizeObjectByValue( sidebarOptions, value ).slug;

        if ( ! sizeSlug ) {
            setAttributes( {
                width: sizeSlug ? undefined : value
            } )
        }
        setAttributes( {
            width: sizeSlug ? sizeSlug : value

        } );
    };

    const sizeObject = getSize(
        sidebarOptions,
        attributes.width,
        attributes?.width
    );

    const sizeValue = sizeObject?.size || attributes?.width || attributes.width

    return (
        <BlockOptionsPicker
            sizeOptions={ sidebarOptions }
            panelName='Sidebar Width'
            units={ widthUnits }
            onChange={ onChange }
            value={ sizeValue }
        />
    );
}

export default SidebarWidthPanel;