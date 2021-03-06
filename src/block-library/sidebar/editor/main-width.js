/**
 * Internal dependencies
 */
import {getSize, getSizeObjectByValue} from "../../editor-components";
import { BlockOptionsPicker } from "../../editor-components";
import { mainOptions } from "../constants";
import {__} from "@wordpress/i18n";


function MainWidthPanel( props) {
    const {
        attributes,
        setAttributes
    } = props

    const onChange = ( value ) => {
        const sizeSlug = getSizeObjectByValue( mainOptions, value ).slug;

        if ( ! sizeSlug ) {
            setAttributes( {
                contentWidth: sizeSlug ? undefined : value
            } )
        }
        setAttributes( {
            contentWidth: sizeSlug ? sizeSlug : value

        } );
    };

    const sizeObject = getSize(
        mainOptions,
        attributes.contentWidth,
        attributes?.contentWidth
    );

    const sizeValue = sizeObject?.size || attributes?.contentWidth || attributes.contentWidth

    const units = [
        { value: '%', label: '%', step: 0.1, a11yLabel: __( 'Percent (%)' ), },
    ];

    return (
        <BlockOptionsPicker
            sizeOptions={ mainOptions }
            panelName='Main Content Width'
            units={ units }
            onChange={ onChange }
            value={ sizeValue }
        />
    );
}

export default MainWidthPanel;