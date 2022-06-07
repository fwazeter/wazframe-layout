const fastGlob = require( 'fast-glob' );
const { escapeRegExp } = require( 'lodash' );
const { join, sep } = require( 'path' );

const blockIndexRegex = new RegExp(
    /(?<filename>.*\/index).js$/
)

const createEntryPoints = () => {

    const blockScriptPaths = fastGlob.sync(
        './src/block-library/**/index.js'
    );

    return blockScriptPaths.reduce( ( entries, scriptPath ) )
}

module.exports = {
    name: 'blocks',

}