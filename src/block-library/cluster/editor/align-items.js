// align-items property // vertical spacing.
import { __ } from '@wordpress/i18n';
import {
    justifySpaceBetween,
    fullscreen
} from '@wordpress/icons';

import {
    verticalAlignTop,
    verticalAlignCenter,
    verticalAlignBottom,
} from '../../utils/icons';

import { Button } from '@wordpress/components';
/**
 * Internal dependencies
 */
import {cleanEmptyObject} from '../../utils';
import namespace from '../../utils/namespace';

/**
 * Checks if there is a current value in align items attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasValue( props ) {
    return props.attributes.flex?.alignItems !== undefined;
}

export function reset( { attributes = {}, setAttributes } ) {
    const { flex } = attributes;

    setAttributes( {
        flex: cleanEmptyObject( {
            ...flex,
            alignItems: 'flex-start'
        }),
    });
}

export function AlignItemsEdit( props ) {
    const {
        attributes: { flex },
        setAttributes,
    } = props

    const alignItems = flex?.alignItems;

    const onChange = ( modify ) => {
        const newStyle = {
            ...flex,
            alignItems: modify,
        };

        setAttributes( {
            flex: cleanEmptyObject( newStyle ),
        });
    };

    const options = [
        {
            value: 'flex-start',
            icon: verticalAlignTop,
            label: __( 'Align items top', namespace ),
        },
        {
            value: 'center',
            icon: verticalAlignCenter,
            label: __( 'Align items center', namespace ),
        },
        {
            value: 'flex-end',
            icon: verticalAlignBottom,
            label: __( 'Align items bottom', namespace ),
        },
        {
            value: 'stretch',
            icon: fullscreen,
            label: __( 'Stretch items to fill container', namespace ),
        },
        {
            value: 'baseline',
            icon: justifySpaceBetween,
            label: __( 'Align items by their baseline', namespace ),
        }
    ];

    return (
        <>
            <fieldset className="block-editor-hooks__flex-layout-justification-controls">
                <legend>{ __( 'Align Items (Vertical)', namespace ) }</legend>
                <div>
                    { options.map( ( { value, icon, label } ) => {
                        return (
                            <Button
                                key={ value }
                                label={ label }
                                icon={ icon }
                                isPressed={ alignItems === value }
                                onClick={ () => onChange( value ) }
                            />
                        );
                    } ) }
                </div>
            </fieldset>
        </>
    )
}
