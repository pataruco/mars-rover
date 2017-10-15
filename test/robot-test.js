const chai = require('chai');
const expect = require('chai').expect;
const mocha = require('mocha');
const Robot = require('../src/robot.js');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
const MissionControl = require('../src/mission-control.js');

describe('Robot', ( ) => {
    const missionControl = new MissionControl( );
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

    describe('Previous position', ( ) => {
        it('should SET a previous position', ( ) => {
            missionControl.coordinates = '5 3';
            missionControl.robotPosition = '2 2 E';
            robot.previousPosition = missionControl.robotPosition;
            expect( robot.data.previousPosition ).to.include({x: 2, y:2, orientation: 'e'})
        });

        it('should GET a previous position', ( ) => {
            missionControl.coordinates = '5 3';
            missionControl.robotPosition = '2 2 E';
            robot.previousPosition = missionControl.robotPosition;
            expect( robot.previousPosition ).to.include({x: 2, y:2, orientation: 'e'})
        });
    });

    describe('Final position', ( ) => {
        it('should SET a final position', ( ) => {
            missionControl.coordinates = '5 3';
            missionControl.robotPosition = '2 2 E';
            robot.finalPosition = missionControl.robotPosition;
            expect( robot.data.finalPosition ).to.include({x: 2, y:2, orientation: 'e'})
        });

        it('should GET a final position', ( ) => {
            missionControl.coordinates = '5 3';
            missionControl.robotPosition = '2 2 E';
            robot.finalPosition = missionControl.robotPosition;
            expect( robot.finalPosition ).to.include({x: 2, y:2, orientation: 'e'})
        });
    });
});
