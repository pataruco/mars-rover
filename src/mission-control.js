module.exports = class MissionControl {
    constructor( ) {
        this.data = {
            coordinates: {
                x: 0,
                y: 0
            }
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
}
