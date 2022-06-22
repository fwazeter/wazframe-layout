/**
 * Internal dependencies
 */
import {
    getSize,
    getSizeObjectByValue,
    BlockOptionsPicker,
    widthUnits
} from "../../../block-editor";
import { itemWidthOptions } from "../constants";


function ItemWidthPanel( props) {
    const {
        attributes,
        setAttributes
    } = props

    const onChange = ( value ) => {
        const sizeSlug = getSizeObjectByValue( itemWidthOptions, value ).slug;

        if ( ! sizeSlug ) {
            setAttributes( {
                itemWidth: sizeSlug ? undefined : value
            } )
        }
        setAttributes( {
            itemWidth: sizeSlug ? sizeSlug : value

        } );
    };

    const sizeObject = getSize(
        itemWidthOptions,
        attributes.itemWidth,
        attributes?.itemWidth
    );

    const sizeValue = sizeObject?.size || attributes?.itemWidth || attributes.itemWidth

    return (
        <BlockOptionsPicker
            sizeOptions={ itemWidthOptions }
            panelName='Item Width'
            units={ widthUnits }
            onChange={ onChange }
            value={ sizeValue }
        />
    );
}

export default ItemWidthPanel;