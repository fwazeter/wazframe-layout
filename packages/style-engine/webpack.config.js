/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/**
 * Local dependencies
 */
const path = require( 'path' );

module.exports = [
    {
        ...defaultConfig,
        entry: {
            'style-engine': path.resolve( process.cwd(), 'src', 'index' )
        },
        output: {
            filename: 'index.js',
            path: path.resolve( process.cwd(), 'build' )
        }
    }
];