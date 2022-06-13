// align-items property // vertical spacing.
import { __ } from '@wordpress/i18n';
import {
    stretchFullWidth,
    stretchWide,
    positionCenter,
    create,
} from '@wordpress/icons';

import { Button } from '@wordpress/components';
/**
 * Internal dependencies
 */
import {cleanEmptyObject} from '../utils';
import namespace from '../utils/namespace';

/**
 * Checks if there is a current value in align items attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasValue( props ) {
    return props.attributes.style?.size?.contentWidth !== undefined;
}

export function reset( { attributes = {}, setAttributes } ) {
    const { style } = attributes;

    setAttributes( {
        style: cleanEmptyObject( {
            ...style,
            size: {
                ...style?.size,
                contentWidth: '65ch'
            },
        }),
    });
}

export function ContentWidthEdit( props ) {
    const {
        attributes: { style },
        setAttributes,
    } = props

    const contentWidth = style?.size?.contentWidth;

    const onChange = ( modify ) => {
        const newStyle = {
            ...style,
            size: {
                ...style?.size,
                contentWidth: modify,
            },
        };

        setAttributes( {
            style: cleanEmptyObject( newStyle ),
        });
    };

    const options = [
        {
            value: '65ch',
            icon: positionCenter,
            label: __( 'Default Text Content Width', namespace ),
        },
        {
            value: '67.5rem',
            icon: stretchWide,
            label: __( 'Wide Content Width', namespace ),
        },
        {
            value: '75rem',
            icon: stretchFullWidth,
            label: __( 'Extra Wide Width', namespace ),
        },
        {
            value: 'custom',
            icon: create,
            label: __( 'Enter Custom Width', namespace ),
        },
    ];

    return (
        <>
            <fieldset>
                <legend>{ __( 'Max Content Width', namespace ) }</legend>
                <div>
                    { options.map( ( { value, icon, label } ) => {
                        return (
                            <Button
                                key={ value }
                                label={ label }
                                icon={ icon }
                                isPressed={ contentWidth === value }
                                onClick={ () => onChange( value ) }
                            />
                        );
                    } ) }
                </div>
            </fieldset>
        </>
    )
}
