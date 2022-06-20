import { __ } from '@wordpress/i18n';
import {
    justifyLeft,
    justifyCenter,
    justifyRight,
    justifySpaceBetween,
    lineDotted,
    grid
} from '@wordpress/icons';

import { Button } from '@wordpress/components';
/**
 * Internal dependencies
 */
import {cleanEmptyObject} from '../../utils';
import namespace from '../../utils/namespace';

/**
 * Checks if there is a current value in the justify content attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasValue( props ) {
    return props.attributes.flex?.justifyContent !== undefined;
}

export function reset( { attributes = {}, setAttributes } ) {
    const { flex } = attributes;

    setAttributes( {
        flex: cleanEmptyObject( {
            ...flex,
            justifyContent: 'flex-start'
        }),
    });
}

export function JustifyContentEdit( props ) {
    const {
        attributes: { flex },
        setAttributes,
    } = props

    const justifyContent = flex?.justifyContent;

    const onChange = ( modify ) => {
        const newStyle = {
            ...flex,
            justifyContent: modify,
        };

        setAttributes( {
            flex: cleanEmptyObject( newStyle ),
        });
    };

    const options = [
        {
            value: 'flex-start',
            icon: justifyLeft,
            label: __( 'Justify items left', namespace ),
        },
        {
            value: 'center',
            icon: justifyCenter,
            label: __( 'Justify items center', namespace ),
        },
        {
            value: 'flex-end',
            icon: justifyRight,
            label: __( 'Justify items right', namespace ),
        },
        {
            value: 'space-between',
            icon: justifySpaceBetween,
            label: __( 'Space between items', namespace ),
        },
        {
            value: 'space-around',
            icon: lineDotted,
            label: __( 'Items evenly distributed in the line', namespace ),
        },
        {
            value: 'space-evenly',
            icon: grid,
            label: __( 'Spacing between any 2 items is equal', namespace ),
        }
    ];

    return (
        <>
            <fieldset className="block-editor-hooks__flex-layout-justification-controls">
                <legend>{ __( 'Justify Content (Horizontal)', namespace ) }</legend>
                <div>
                    { options.map( ( { value, icon, label } ) => {
                        return (
                            <Button
                                key={ value }
                                label={ label }
                                icon={ icon }
                                isPressed={ justifyContent === value }
                                onClick={ () => onChange( value ) }
                            />
                        );
                    } ) }
                </div>
            </fieldset>
        </>
    )
}