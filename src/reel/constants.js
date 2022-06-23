import {__} from "@wordpress/i18n";

/**
 * Default settings for reel height
 */
export const heightOptions = [
    {
        name: __('Small'),
        slug: 'height-small',
        size: '15vh',
    },
    {
        name: __( 'Medium' ),
        slug: 'height-medium',
        size: '20vh'
    },
    {
        name: __('Large' ),
        slug: 'height-large',
        size: '30vh'
    }
]

/**
 * Default settings for item width
 */
export const itemWidthOptions = [
    {
        name: __('Small'),
        slug: 'size-small',
        size: '10rem',
    },
    {
        name: __( 'Medium' ),
        slug: 'size-medium',
        size: '15rem'
    },
    {
        name: __('Large' ),
        slug: 'size-large',
        size: '20rem'
    }
]