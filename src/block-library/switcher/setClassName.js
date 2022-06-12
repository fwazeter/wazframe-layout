export const setLimitClassName = ( limit ) => {

    return `.wp-block-wazframe-switcher.switch-${limit} > :nth-child(n+${limit}), .wp-block-wazframe-switcher.switch-${limit} > :nth-last-child(n+${limit}) ~ * { flex-basis: 100%; };`
}

export const setCustomFlexGrow = ( child, grow ) => {
    return `.wp-block-wazframe-switcher.grow-${child} > :nth-child(${child}) { --flex-grow: ${grow}};`
}