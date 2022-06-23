import {__} from "@wordpress/i18n";

/**
 * Default settings for height
 */
export const options = [
    {
        name: __('25'),
        slug: 'height-25',
        size: '25vh',
    },
    {
        name: __( '50' ),
        slug: 'height-50',
        size: '50vh'
    },
    {
        name: __('75' ),
        slug: 'height-75',
        size: '75vh'
    },
    {
        name: __( 'None' ),
        slug: 'height-0',
        size: '0'
    }
]