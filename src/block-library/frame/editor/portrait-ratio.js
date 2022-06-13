/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
    panoramicRatio,
    squareRatio,
    landscapeRatio,
    verticalRatio,
    portraitRatio,
} from '../../utils/icons';
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
    return props.attributes.style?.size?.portraitRatio !== undefined;
}

export function reset( { attributes = {}, setAttributes } ) {
    const { style } = attributes;

    setAttributes( {
        style: cleanEmptyObject( {
            ...style,
            size: {
                ...style?.size,
                portraitRatio: undefined
            },
        }),
    });
}

export function PortraitRatioEdit( props ) {
    const {
        attributes: { style },
        setAttributes,
    } = props

    const aspectRatio = style?.size?.portraitRatio;

    const onChange = ( modify ) => {
        const newStyle = {
            ...style,
            size: {
                ...style?.size,
                portraitRatio: modify,
            },
        };

        setAttributes( {
            style: cleanEmptyObject( newStyle ),
        });
    };

    const options = [
        {
            value: '16 / 9',
            icon: panoramicRatio,
            label: __( '16:9 Panoramic', namespace ),
        },
        {
            value: '1 / 1',
            icon: squareRatio,
            label: __( '1:1 Square', namespace ),
        },
        {
            value: '3 / 2',
            icon: landscapeRatio,
            label: __( '3:2 Landscape', namespace ),
        },
        {
            value: '9 / 16',
            icon: verticalRatio,
            label: __( '9:16 Vertical', namespace ),
        },
        {
            value: '4 / 5',
            icon: portraitRatio,
            label: __( '4:5 Portrait', namespace ),
        }
    ];

    return (
        <>
            <fieldset className="block-editor-hooks__flex-layout-justification-controls">
                <legend>{ __( 'Portrait (Mobile) Ratio', namespace ) }</legend>
                <div>
                    { options.map( ( { value, icon, label } ) => {
                        return (
                            <Button
                                key={ value }
                                label={ label }
                                icon={ icon }
                                isPressed={ aspectRatio === value }
                                onClick={ () => onChange( value ) }
                            />
                        );
                    } ) }
                </div>
            </fieldset>
        </>
    )
}
