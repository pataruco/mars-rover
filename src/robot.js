module.exports = class Robot {
    constructor() {
        this.data = {
            previousPosition: {
                x: 0,
                y:0,
                orientation: 'n'
            },
            finalPosition: {
                x: 0,
                y:0,
                orientation: 'n'
            },
            instructions: [],
            dimensions: {
                x: 0,
                y: 0
            }
        }
    }
    set previousPosition( position ) {
        return this.data.previousPosition = position;
    }

    get previousPosition( ) {
        return this.data.previousPosition;
    }

    set finalPosition( position ) {
        return this.data.finalPosition = position;
    }

    get finalPosition( ) {
        return this.data.finalPosition;
    }

    set instructions( instructionsArray ) {
        return this.data.instructions = instructionsArray;
    }

    get instructions()  {
        return this.data.instructions;
    }

    set worldDimensions( dimensionsData ) {
        this.data.dimensions = dimensionsData;
    }

    get worldDimensions( ) {
        return this.data.dimensions;
    }
}
