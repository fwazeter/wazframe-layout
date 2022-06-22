/**
 * Internal dependencies
 */
import {
    getSize,
    getSizeObjectByValue,
    BlockOptionsPicker,
    heightUnits
} from "../../../block-editor";
import { options } from "../constants";


function HeightPanel( props) {
    const {
        attributes,
        setAttributes
    } = props

    const onChange = ( value ) => {
        const sizeSlug = getSizeObjectByValue( options, value ).slug;

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
        options,
        attributes.height,
        attributes?.height
    );

    const sizeValue = sizeObject?.size || attributes?.height || attributes.height

    return (
        <BlockOptionsPicker
            sizeOptions={ options }
            panelName='Cover Height'
            units={ heightUnits }
            onChange={ onChange }
            value={ sizeValue }
        />
    );
}

export default HeightPanel;