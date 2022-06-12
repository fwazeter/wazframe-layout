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
 * Checks if there is a current value in the padding block support attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasValue( props ) {
    return props.attributes.style?.spacing?.parentPreset !== undefined;
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
                parentPreset: undefined,
            },
        } ),
    } );
}

/**
 * Inspector control panel containing the padding related configuration.
 *
 * @param {Object} props
 * @returns {WPElement} Padding edit element.
 */

export function ParentPresetEdit( props ) {
    const {
        attributes: { style },
        setAttributes,
    } = props

    const onChange = ( modify ) => {

        const newStyle = {
            ...style,
            spacing: {
                ...style?.spacing,
                parentPreset: modify,
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
                    <strong>{ __('Cover Padding', namespace ) }</strong>
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
                label={ __('Choose padding option', namespace) }
                isBlock
            >

                <ToggleGroupControlOption
                    label={ __('Default', namespace ) }
                    value='1rem'
                />
                <ToggleGroupControlOption
                    label={ __('Medium', namespace ) }
                    value='2rem'
                />
                <ToggleGroupControlOption
                    label={ __('None', namespace ) }
                    value='0'
                />
                <ToggleGroupControlOption
                    label={ __('Custom', namespace ) }
                    value='custom'
                />
            </ToggleGroupControl>
        </>
    );
}