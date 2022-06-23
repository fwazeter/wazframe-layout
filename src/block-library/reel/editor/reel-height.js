/**
 * Internal dependencies
 */
import {getSize, getSizeObjectByValue} from "../../editor-components";
import { BlockOptionsPicker } from "../../editor-components";
import { heightUnits } from "../../utils";
import { heightOptions } from "../constants";


function ReelHeightPanel( props) {
    const {
        attributes,
        setAttributes
    } = props

    const onChange = ( value ) => {
        const sizeSlug = getSizeObjectByValue( heightOptions, value ).slug;

        if ( ! sizeSlug ) {
            setAttributes( {
                height: sizeSlug ? undefined : value
            } )
        }
        setAttributes( {
            height: sizeSlug ? sizeSlug : value

        } );
    };

    const sizeObject = getSize(
        heightOptions,
        attributes.height,
        attributes?.height
    );

    const sizeValue = sizeObject?.size || attributes?.height || attributes.height

    return (
        <BlockOptionsPicker
            sizeOptions={ heightOptions }
            panelName='Reel Height'
            units={ heightUnits }
            onChange={ onChange }
            value={ sizeValue }
        />
    );
}

export default ReelHeightPanel;