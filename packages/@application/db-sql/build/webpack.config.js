'use strict';

const Webpack = require( 'webpack' ),
   path = require( 'path' ),
   nodeExternals = require( 'webpack-node-externals' ),
   DIST = path.resolve( `${ __dirname }/../dist` );

module.exports = {

   target: 'node',
   mode: 'production',
   node: {

      __dirname: false,
      __filename: false,
   },
   optimization: {

      nodeEnv: false,
   },
   stats: {

      all: false,
      colors: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      builtAt: true,
   },
   entry: {

      index: './index',
   },
   output: {

      path: DIST,
      filename: '[name].js',
      libraryTarget: 'umd',
   },
   externals: [

      nodeExternals(),
   ],
   plugins: [

      new Webpack.ProgressPlugin(),
      new Webpack.IgnorePlugin( new RegExp( '(mssql|mysql|mysql2|oracledb|sqlite3|pg-native|pg-query-stream)' )),
   ],
};
