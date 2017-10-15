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
});
