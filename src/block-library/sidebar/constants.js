import { __ } from "@wordpress/i18n";
/**
 * Default settings
 */
export const sidebarOptions = [
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

export const mainOptions = [
    {
        name: __('55'),
        size: '55%',
    },
    {
        name: __( '60' ),
        size: '60%'
    },
    {
        name: __('70' ),
        size: '70%'
    },
    {
        name: __('80' ),
        size: '80%'
    }
]