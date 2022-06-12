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
import namespace from "../../utils/namespace";

/**
 * Checks if there is a current value in the padding block support attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasValue( props ) {
    return props.attributes.style?.spacing?.parentPadding !== undefined;
}

/**
 * Resets the padding attribute.
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
                parentPadding: undefined,
            },
        } ),
    } );
}

/**
 * Inspector control panel containing the padding related configuration.
 *
 * @param {Object} props
 * @returns {WPElement} padding edit element.
 */

export function ParentPaddingEdit( props ) {
    const {
        attributes: { style },
        setAttributes,
    } = props

    const onChange = ( modify ) => {

        const newStyle = {
            ...style,
            spacing: {
                ...style?.spacing,
                parentPadding: modify,
            },
        };

        setAttributes( {
            style: cleanEmptyObject( newStyle ),
        } );
    };

    return (
        <>
            <BoxControl
                values={ style?.spacing?.parentPadding }
                onChange={ onChange }
                label={ __( 'Cover Padding', namespace ) }
                units={ spaceUnits }
            />
        </>
    );
}
