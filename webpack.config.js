const CopyWebpackPlugin = require('copy-webpack-plugin' );
const { flatMap } = require( 'lodash' );
const DependencyExtractionWebpackPlugin = require( '@wazframe/dependency-extraction-webpack-plugin' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const {defaultRequestToHandle} = require("@wazframe/dependency-extraction-webpack-plugin/src/utils");

// list where the packages are located in node_modules
/*
const packages = {
    'wazframe-block-editor': [
        '@wazframe/block-editor/build/index.js',
        '@wazframe/block-editor/build/index.asset.php'
    ]
}

const packagesCopyConfig = flatMap(
    packages,
    // jsFileName = the first entry in Array, phpFileName = second entry, key = wazframe.
    ( [ jsFileName, phpFileName ], key ) => {
        // This should output wazframe.js & wazframe.asset.php in build/packages
        return [
            {
                from: `node_modules/${jsFileName}`,
                to: `packages/${ key }.js`,
            },
            {
                from: `node_modules/${phpFileName}`,
                to: `packages/${ key }.asset.php`
            }
        ]
    }
)

module.exports = {
    // extend default Config
    ...defaultConfig,
    plugins: [
        // Add new pattern to copy.
        ...defaultConfig.plugins,
        new CopyWebpackPlugin( {
            patterns: packagesCopyConfig
            }
        ),
    ],
};*/
