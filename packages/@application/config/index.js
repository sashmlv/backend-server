'use strict';

const path = require( 'path' ),
   fs = require( 'fs' ),
   dotenv = require( 'dotenv' ),
   APP_ROOT = process.env.PWD || process.cwd();

/* Get environment variables */
let env = {

   NODE_ENV: process.env.NODE_ENV,
};

if( ! env.NODE_ENV ){

   env = dotenv.config().parsed || env;
};

if( ! env || ! env.NODE_ENV ){

   env = dotenv.config({ path: path.resolve( `${ APP_ROOT }/.env` )}).parsed || env;
};

/* defaults */
env.NODE_ENV = env.NODE_ENV || 'development';

/* Get application config */
let config = {

   HOST: "0.0.0.0",
   PORT: "3000",
   DB: {

      CLIENT: "pg",
      VERSION: "12",
      HOST: "0.0.0.0",
      USER: "user",
      PASSWORD: "password",
      DATABASE: "dbname"
   },
   STORAGE: {

      HOST: "0.0.0.0",
      PORT: "6379",
      PASSWORD: ""
   },
   LOG: {

      LEVEL: "debug"
   }
};

const configFile = path.resolve( `${ APP_ROOT }/config.${ env.NODE_ENV }.js` );

if( fs.existsSync( configFile )){

   config = Object.assign(
      config,
      JSON.parse( fs.readFileSync( configFile, 'utf8' ))
   );
};

config.NODE_ENV = env.NODE_ENV;
config.env = env;

module.exports = config;