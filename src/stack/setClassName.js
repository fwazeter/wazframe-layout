export const setClassName = ( splitAfter ) => {

    return `.wp-block-wazframe-stack.split-${splitAfter} > :nth-child(${splitAfter}) { margin-block-end: auto }`
}