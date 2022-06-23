/**
 * External dependencies
 */
import {
    getSize,
    getSizeObjectByValue,
    BlockOptionsPicker
} from "@wazframe/block-editor";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
/**
 * Internal dependencies
 */
import { options } from "../constants";



function WidthPanel( props) {
    const {
        attributes,
        setAttributes
    } = props

    const onChange = ( value ) => {
        const sizeSlug = getSizeObjectByValue( options, value ).slug;

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
        options,
        attributes.width,
        attributes?.width
    );

    const sizeValue = sizeObject?.size || attributes?.width || attributes.width

    const units = [
        { value: '%', label: '%', step: 0.1, a11yLabel: __( 'Percent (%)' ), },
    ];

    return (
        <BlockOptionsPicker
            sizeOptions={ options }
            panelName='Container Width'
            units={ units }
            onChange={ onChange }
            value={ sizeValue }
        />
    );
}

export default WidthPanel;