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
            instructions: []
        }
    }
    set previousPosition( position ) {
        return this.data.previousPosition = position;
    }

    get previousPosition( ) {
        return this.data.previousPosition;
    }
}
