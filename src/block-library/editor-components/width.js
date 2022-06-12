/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
    cleanEmptyObject,
    widthUnits
} from "../utils";
import namespace from "../utils/namespace";

/**
 * Checks if there is a current value for width attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasValue( props ) {
    return props.attributes.style?.size?.width !== undefined;
}

/**
 * Resets the width attribute.
 *
 * @param {Object} props		Block props.
 * @param {Object} props.attributes	Block's attributes.
 * @param {Object} props.setAttributes Function to set block's attribute.
 */
export function reset( { attributes = {}, setAttributes } ) {
    const { style }	= attributes;

    setAttributes( {
        style: cleanEmptyObject( {
            ...style,
            size: {
                ...style?.size,
                width: undefined,
            },
        } ),
    } );
}

/**
 * Inspector control panel containing the width related configuration.
 *
 * @param {Object} props
 * @returns {WPElement} width edit element.
 */

export function WidthEdit( props ) {
    const {
        attributes: { style },
        setAttributes,
    } = props

    const onChange = ( modify ) => {

        const newStyle = {
            ...style,
            size: {
                ...style?.size,
                width: modify,
            },
        };

        setAttributes( {
            style: cleanEmptyObject( newStyle ),
        } );
    };

    return (
        <>
            <UnitControl
                value={ style?.size?.width }
                onChange={ onChange }
                label={ __( 'Content Width', namespace ) }
                units={ widthUnits }
                __unstableInputWidth="80px"
            />
        </>
    );
}