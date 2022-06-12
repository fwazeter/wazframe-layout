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
} from "../../utils";
import namespace from "../../utils/namespace";

/**
 * Checks if there is a current value in the flex basis attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasValue( props ) {
    return props.attributes.style?.size?.flexBasis !== undefined;
}

/**
 * Resets the flex basis attribute.
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
                flexBasis: undefined,
            },
        } ),
    } );
}

/**
 * Inspector control panel containing the flex basis related configuration.
 *
 * @param {Object} props
 * @returns {WPElement} flex basis edit element.
 */

export function FlexBasisEdit( props ) {
    const {
        attributes: { style },
        setAttributes,
    } = props

    const onChange = ( modify ) => {

        const newStyle = {
            ...style,
            size: {
                ...style?.size,
                flexBasis: modify,
            },
        };

        setAttributes( {
            style: cleanEmptyObject( newStyle ),
        } );
    };

    return (
        <>
            <UnitControl
                value={ style?.size?.flexBasis }
                onChange={ onChange }
                label={ __( 'Sidebar Width', namespace ) }
                units={ widthUnits }
                __unstableInputWidth="80px"
            />
        </>
    );
}