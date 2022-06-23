/**
 * Internal dependencies
 */
import { widthUnits} from "../../utils";
import {getSize, getSizeObjectByValue} from "./utils";
import BlockOptionsPicker from "./block-options-picker";
import { options } from "../../sidebar/constants";

/**
 * Custom setting for default options provided
 * to blocks.
 */
/**
 *
 * @param {Object} props            Block Props
 */
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

    return (
        <BlockOptionsPicker
            sizeOptions={ options }
            panelName='Set Width'
            units={ widthUnits }
            onChange={ onChange }
            value={ sizeValue }
        />
    );
}

export default WidthPanel;