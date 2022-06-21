import {__} from "@wordpress/i18n";

/**
 * Default settings
 */
export const blockGapOptions = [
    {
        name: __('Small'),
        slug: 'space-small',
        size: '0.75rem',
    },
    {
        name: __( 'Medium' ),
        slug: 'space-medium',
        size: '1.5rem'
    },
    {
        name: __('Large' ),
        slug: 'space-large',
        size: '2rem'
    },
    {
        name: __( 'None' ),
        slug: 'space-none',
        size: '0'
    },
]