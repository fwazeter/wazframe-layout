


const DEFAULT_CONTROLS = [ 'none', 'relative', 'fixed' ];
const EXTRA_CONTROLS = [ 'absolute', 'sticky' ];
const ELEMENT_DEFAULT = [ 'static' ];

export default function useAvailablePositions( controls = DEFAULT_CONTROLS ) {
    // Always add a 'none' option if it doesn't exist.
    if ( ! controls.includes( 'none' ) ) {
        controls = [ 'none', ...controls ];
    }

    const enabledControls = controls.map( ( enabledControl ) => ( { name: enabledControl } ) );

    if (
        enabledControls.length === 1 &&
        enabledControls[ 0 ].name === 'none'
    ) {
        return [];
    }

    return enabledControls;
}