import { __ } from "@wordpress/i18n";

/**
 * Default settings for blockGap
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

/**
 * Default settings for padding
 */
export const paddingOptions = [
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
    }
]

/**
 * Default settings for minWidth.
 * Used in Grid block.
 */
export const minWidthOptions = [
    {
        name: __('Medium'),
        slug: 'size-medium',
        size: '22rem',
    },
    {
        name: __( 'Large' ),
        slug: 'size-large',
        size: '29rem'
    },
    {
        name: __('Content' ),
        slug: 'size-content',
        size: '65ch'
    }
]