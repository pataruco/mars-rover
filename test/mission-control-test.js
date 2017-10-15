const chai = require('chai');
const expect = require('chai').expect;
const mocha = require('mocha');
const MissionControl = require('../src/mission-control.js');

describe('MissionControl', ( ) => {
    // - Create a command control class to manage user input and output
    let missionControl;

    before( ( ) => {
        missionControl = new MissionControl( );
    })

    describe('instantiation', ( ) => {
        it('should return an instance ', ( ) => {
            expect( missionControl ).to.be.an.instanceof( MissionControl );
        });
    });

    // - GET coordinates
    describe('coordinates', ( ) => {
        before( ( ) => {
            missionControl.coordinates = '5 3';
        })

        //  check if coordinates match pattern
        it('should SET coordinates', ( ) => {
            expect( missionControl.data.coordinates ).to.include({x: 5, y:3})
        });

        it('should GET coordinates', ( ) => {
            expect( missionControl.coordinates ).to.include({x: 5, y:3})
        });

    })
});
