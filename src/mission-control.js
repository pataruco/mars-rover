module.exports = class MissionControl {
    constructor( ) {
        this.data = {
            coordinates: {
                x: 0,
                y: 0
            },
            robotPosition: {
                x: 0,
                y: 0,
                orientation: 'n'
            },
            robotDirection: false,
        }
    }

    set coordinates( string ) {
        const pattern = /^\d{1,2}?\s\d{1,2}?$/g;
        const isACoordinateString = pattern.test( string );
        if ( isACoordinateString ) {
            return this.setCoordinatesObject( string )
        }
        return this.data.coordinates = false;
    }

    setCoordinatesObject( string ) {
        this.data.coordinates.x = parseInt( string.split(' ')[0] );
        this.data.coordinates.y = parseInt( string.split(' ')[1] );
    }

    get coordinates( ) {
        return this.data.coordinates;
    }

    set robotPosition( string ) {
        const pattern = /^\d{1,2}?\s\d{1,2}\s[NnEeSsWw]$/g;
        const isARobotPositionString = pattern.test( string );
        if ( isARobotPositionString ){
            return this.setRobotPositionObject( string )
        }
        return this.data.robotPosition = false;
    }

    get robotPosition( ) {
        return this.data.robotPosition;
    }

    setRobotPositionObject( string ){
        this.data.robotPosition.x = parseInt( string.split(' ')[0] );
        this.data.robotPosition.y = parseInt( string.split(' ')[1] );
        this.data.robotPosition.orientation = string.split(' ')[2].toLowerCase( );
        return this.checkRobotPositionOnTheGrid();
    }

    checkRobotPositionOnTheGrid( ) {
        if ( this.data.robotPosition.x > this.data.coordinates.x ) {
            return this.data.robotPosition = null;
        }

        if ( this.data.robotPosition.y > this.data.coordinates.y ) {
            return this.data.robotPosition = null;
        }
        return this.checkRobotPositionCoordinates()
    }

    checkRobotPositionCoordinates( ) {
        if ( this.data.robotPosition.x > 50) {
            this.data.robotPosition.x = 50;
        }

        if ( this.data.robotPosition.y > 50) {
            this.data.robotPosition.y = 50;
        }
    }
    set robotDirection( string ) {
        if ( string.length > 100 ) {
            return this.data.robotDirection = null;
        }
         const pattern = /^[RrLlFf]+$/g;
         const isARobotDirectionString = pattern.test( string )
         if ( isARobotDirectionString ) {
              return this.data.robotDirection = string.toLowerCase().split('')
         }
         return this.data.robotDirection = false
    }

    get robotDirection( ) {
         return this.data.robotDirection;
    }

}
