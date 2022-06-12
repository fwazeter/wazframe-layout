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
    cleanEmptyObject
} from "../../utils";
import namespace from "../../utils/namespace";

/**
 * Checks if there is a current value for main content min width attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasValue( props ) {
    return props.attributes.style?.size?.minWidth !== undefined;
}

/**
 * Resets the min width attribute.
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
                minWidth: undefined
            }
        } ),
    } );
}

/**
 * Inspector control panel containing the min width related configuration.
 *
 * @param {Object} props
 * @returns {WPElement} min width edit element.
 */

export function MinWidthEdit( props ) {
    const {
        attributes: { style },
        setAttributes,
    } = props

    const onChange = ( modify ) => {

        const newStyle = {
            ...style,
            size: {
                ...style?.size,
                minWidth: modify,
            },
        };

        setAttributes( {
            style: cleanEmptyObject( newStyle ),
        } );
    };

    const units = [
        { value: '%', label: '%', step: 0.1, a11yLabel: __( 'Percent (%)' ), },
    ];

    return (
        <>
            <UnitControl
                value={ style?.size?.minWidth }
                onChange={ onChange }
                label={ __( 'Main Section Min Width', namespace ) }
                __unstableInputWidth="80px"
                units={ units }
            />
        </>
    );
}