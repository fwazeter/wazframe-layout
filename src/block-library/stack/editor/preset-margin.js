/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    Button,
    Flex,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
    cleanEmptyObject
} from "../../utils";
import namespace from "../../utils/namespace";

/**
 * Checks if there is a current value in the margin block support attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasValue( props ) {
    return props.attributes.style?.spacing?.preset !== undefined;
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
                preset: undefined,
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

export function PresetMarginEdit( props ) {
    const {
        attributes: { style },
        setAttributes,
    } = props

    const onChange = ( modify ) => {

        const newStyle = {
            ...style,
            spacing: {
                ...style?.spacing,
                preset: modify,
            },
        };

        setAttributes( {
            style: cleanEmptyObject( newStyle ),
        } );
    };

    return (
        <>
            <Flex justify='space-between' align='baseline'>
                <p className="component-box-control__label">
                    <strong>{ __('Margin Settings', namespace ) }</strong>
                </p>
                <Button
                    className="component-box-control__reset-button"
                    isSecondary
                    isSmall
                    onClick={ () => onChange( reset ) }
                >
                    { __( 'Reset', namespace ) }
                </Button>
            </Flex>
            <ToggleGroupControl
                onChange={ onChange }
                label={ __('Choose margin option', namespace) }
                isBlock
            >

                <ToggleGroupControlOption
                    label={ __('Small', namespace ) }
                    value='0.5rem'
                />
                <ToggleGroupControlOption
                    label={ __('Large', namespace ) }
                    value='3rem'
                />
                <ToggleGroupControlOption
                    label={ __('Custom', namespace ) }
                    value='custom'
                />
            </ToggleGroupControl>
        </>
    );
}