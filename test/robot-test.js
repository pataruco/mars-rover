const chai = require('chai');
const expect = require('chai').expect;
const mocha = require('mocha');
const Robot = require('../src/robot.js');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

describe('Robot', ( ) => {

    const robot = new Robot( );

    describe('Intantiation', ( ) => {
        it('should return an instance', ( ) => {
            expect( robot ).to.be.an.instanceof( Robot );
        });
    });
    
    describe('Constructor', ( ) => {
        it('should have an previous position', ( ) =>{
            expect( robot.data.previousPosition ).to.include({x: 0, y:0, orientation: 'n'})
        });

        it('should have an final position', ( ) =>{
            expect( robot.data.finalPosition ).to.include({x: 0, y:0, orientation: 'n'})
        });

        it('should have an array of instructions', ( ) =>{
            expect( robot.data.instructions ).to.be.array( );
        });
    });
});
