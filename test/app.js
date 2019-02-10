'use strict';

const express = require( 'express' );
const exegesisExpress = require( 'exegesis-express' );
const http = require( 'http' );
const path = require( 'path' );
const fs = require( 'fs-extra' );

const require_helper = require( './require_helper' );

async function createServer() {
    const app = express();

    const options = {
        controllers: {
            PetController: {
                listPets( context ) {
                    return( `Context contains ${context.extraContext.myParam}` );
                },
                createPets() {
                    return null;
                }
            }
        },
        allowMissingControllers: true,
        plugins: [
            require_helper( 'index.js' )({
                myParam: 'test123'
            })
        ]
    };

    const exegesisMiddleware = await exegesisExpress.middleware(
        path.resolve( __dirname, './petstore.yaml' ),
        options
    );

    app.use( exegesisMiddleware );
    // Return a 404
    app.use( ( req, res ) => {
        res.status( 404 ).json({ message: `Not found` });
    });

    // Handle any unexpected errors
    app.use( ( err, req, res, next ) => {
        res.status( 500 ).json({ message: `Internal error: ${err.message}` });
        next();
    });

    const server = http.createServer( app );

    return server;
}

if( process.env.REPORT_DIR_FOR_CODE_COVERAGE ) {
    const dumpCoverage = () => {
        console.warn( 'Outputting code coverage information to ' + process.env.REPORT_DIR_FOR_CODE_COVERAGE );
        fs.ensureDirSync( process.env.REPORT_DIR_FOR_CODE_COVERAGE );
        fs.writeFileSync(
            process.env.REPORT_DIR_FOR_CODE_COVERAGE + '/app.json',
            JSON.stringify( global['__coverage__'] ), 'utf8'
        );
    };
    process.on( 'exit', dumpCoverage );
    process.on( 'SIGINT', process.exit );
    process.on( 'SIGTERM', process.exit );
}

createServer()
.then( server => {
    server.listen( 3000 );
    console.log( 'Listening on port 3000' );
    console.log( 'Try visiting http://localhost:3000/api-docs' );
})
.catch( err => {
    console.error( err.stack );
    process.exit( 1 );
});
