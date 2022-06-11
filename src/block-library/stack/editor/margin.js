/**
 * Handles the width component for wazframe dimensions panel.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    __experimentalBoxControl as BoxControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
    cleanEmptyObject,
    spaceUnits
} from "../../utils";
import namespace from "../namespace";

/**
 * Checks if there is a current value in the margin block support attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasValue( props ) {
    return props.attributes.style?.spacing?.margin !== undefined;
}

/**
 * Resets the margin attribute.
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
            spacing: {
                ...style?.spacing,
                margin: undefined,
            },
        } ),
    } );
}

/**
 * Inspector control panel containing the margin related configuration.
 *
 * @param {Object} props
 * @returns {WPElement} Margin edit element.
 */

export function MarginEdit( props ) {
    const {
        attributes: { style },
        setAttributes,
    } = props

    const onChange = ( modify ) => {

        const newStyle = {
            ...style,
            spacing: {
                ...style?.spacing,
                margin: modify,
            },
        };

        setAttributes( {
            style: cleanEmptyObject( newStyle ),
        } );
    };

    return (
        <>
            <BoxControl
                values={ style?.spacing?.margin }
                onChange={ onChange }
                label={ __( 'Custom Margin', namespace ) }
                sides={ [ 'top' ] }
                units={ spaceUnits }
            />
        </>
    );
}
