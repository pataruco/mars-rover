const MissionControl = require('./src/mission-control.js');
const Robot = require('./src/robot.js');
const prompt = require('prompt');

prompt.start( );

const mission = new MissionControl( );

const dimensionsSchema = {
    properties: {
        coordinates: {
            description:'Please, enter grid dimensions' ,
            pattern: /^\d{1,2}?\s\d{1,2}?$/g,
            message: 'dimensions must be a pair of integers separated by a space',
            required: true
        }
    }
};

function getWorldDimensions( ) {
    prompt.get( dimensionsSchema, ( error, result ) => {
        if ( result ) {
            mission.coordinates = result.coordinates;
        }
    })
}

function start ( ) {
    getWorldDimensions( );
}

start( )
