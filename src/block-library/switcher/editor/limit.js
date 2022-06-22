/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
    RangeControl
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { namespace } from "../../../block-editor";


export function LimitEdit( props ) {
    const {
        attributes,
        setAttributes,
    } = props

    const onChange = ( modify ) => {

        setAttributes( {
            limit: modify
        } );
    };

    return (
        <>
            <RangeControl
                label={ __('Width after items should switch to vertical', namespace) }
                allowReset={ true }
                initialPosition={ 3 }
                marks={ true }
                min={ 1 }
                max={ 10 }
                step={ 1 }
                resetFallbackValue={ 3 }
                value={ attributes.limit }
                onChange={ onChange }
            />
        </>
    );
}

export default LimitEdit;