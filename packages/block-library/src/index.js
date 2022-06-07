/**
 * WordPress dependencies
 */
import {
    registerBlockType, setDefaultBlockName
} from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import * as reel from './reel';

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 */
const registerBlock = ( block ) => {
    if ( ! block ) {
        return;
    }
    const { metadata, settings, name } = block;
    registerBlockType( { name, ...metadata }, settings );
};

/**
 * Function to get all block-library blocks in an array
 */
const getAllBlocks = () => [
    reel,
];

export const registerWFLayoutBlocks = (
    blocks = getAllBlocks()
) => {
    blocks.forEach( registerBlock );
}