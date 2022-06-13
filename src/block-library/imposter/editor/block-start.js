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
    return props.attributes.style?.position?.blockStart !== undefined;
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
            position: {
                ...style?.position,
                blockStart: undefined
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

export function BlockStartEdit( props ) {
    const {
        attributes: { style },
        setAttributes,
    } = props

    const onChange = ( modify ) => {

        const newStyle = {
            ...style,
            position: {
                ...style?.position,
                blockStart: modify,
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
                value={ style?.position?.blockStart }
                onChange={ onChange }
                label={ __( 'Y Start', namespace ) }
                units={ units }
            />
        </>
    );
}
