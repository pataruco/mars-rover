const chai = require('chai');
const expect = require('chai').expect;
const mocha = require('mocha');
const MissionControl = require('../src/mission-control.js');
const Robot = require('../src/robot.js');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

describe('Robot', () => {
  const missionControl = new MissionControl();
  const robot = new Robot();

  describe('Intantiation', () => {
    it('should return an instance', () => {
      expect(robot).to.be.an.instanceof(Robot);
    });
  });

  describe('Constructor', () => {
    it('should have an previous position', () => {
      expect(robot.data.previousPosition).to.include({
        x: 0,
        y: 0,
        orientation: 'n',
      });
    });

    it('should have an final position', () => {
      expect(robot.data.finalPosition).to.include({
        x: 0,
        y: 0,
        orientation: 'n',
      });
    });

    it('should have an array of instructions', () => {
      expect(robot.data.instructions).to.be.array();
    });
  });

  describe('Previous position', () => {
    it('should SET a previous position', () => {
      missionControl.coordinates = '5 3';
      missionControl.robotPosition = '2 2 E';
      robot.previousPosition = missionControl.robotPosition;
      expect(robot.data.previousPosition).to.include({
        x: 2,
        y: 2,
        orientation: 'e',
      });
    });

    it('should GET a previous position', () => {
      missionControl.coordinates = '5 3';
      missionControl.robotPosition = '2 2 E';
      robot.previousPosition = missionControl.robotPosition;
      expect(robot.previousPosition).to.include({
        x: 2,
        y: 2,
        orientation: 'e',
      });
    });
  });

  describe('Final position', () => {
    it('should SET a final position', () => {
      missionControl.coordinates = '5 3';
      missionControl.robotPosition = '2 2 E';
      robot.finalPosition = missionControl.robotPosition;
      expect(robot.data.finalPosition).to.include({
        x: 2,
        y: 2,
        orientation: 'e',
      });
    });

    it('should GET a final position', () => {
      missionControl.coordinates = '5 3';
      missionControl.robotPosition = '2 2 E';
      robot.finalPosition = missionControl.robotPosition;
      expect(robot.finalPosition).to.include({ x: 2, y: 2, orientation: 'e' });
    });
  });

  describe('instructions', () => {
    it('should SET instructions', () => {
      missionControl.robotDirection = 'RFRFRFRF';
      robot.instructions = missionControl.robotDirection;
      expect(robot.data.instructions).to.be.equalTo([
        'r',
        'f',
        'r',
        'f',
        'r',
        'f',
        'r',
        'f',
      ]);
    });

    it('should GET instructions', () => {
      missionControl.robotDirection = 'RFRFRFRF';
      robot.instructions = missionControl.robotDirection;
      expect(robot.instructions).to.be.equalTo([
        'r',
        'f',
        'r',
        'f',
        'r',
        'f',
        'r',
        'f',
      ]);
    });
  });

  describe('World enviroment', () => {
    it('should SET enviroment data', () => {
      const missionOne = new MissionControl();
      const robotOne = new Robot();
      missionOne.coordinates = '5 3';
      missionOne.robotDirection = 'RFRFRFRF';
      missionOne.robotPosition = '1 1 E';
      robotOne.finalPosition = missionOne.robotPosition;
      robotOne.instructions = missionOne.robotDirection;
      robotOne.worldDimensions = missionOne.coordinates;
      expect(robotOne.data.dimensions).to.include({ x: 5, y: 3 });
    });
  });

  describe('Movement', () => {
    it('should move from 1 1 E to coordinate 1 1 E when instructions RFRFRFRF are set', () => {
      const missionTwo = new MissionControl();
      const robotTwo = new Robot();
      missionTwo.coordinates = '5 3';
      missionTwo.robotDirection = 'RFRFRFRF';
      missionTwo.robotPosition = '1 1 E';
      robotTwo.worldDimensions = missionTwo.coordinates;
      robotTwo.finalPosition = missionTwo.robotPosition;
      robotTwo.instructions = missionTwo.robotDirection;
      expect(robotTwo.move).to.be.equal('1 1 E');
    });

    it('should move from 3 2 N to coordinate 3 3 N LOST when instructions FRRFLLFFRRFLL are set', () => {
      const missionThree = new MissionControl();
      const robotThree = new Robot();
      missionThree.coordinates = '5 3';
      missionThree.robotDirection = 'FRRFLLFFRRFLL';
      missionThree.robotPosition = '3 2 N';
      robotThree.worldDimensions = missionThree.coordinates;
      robotThree.finalPosition = missionThree.robotPosition;
      robotThree.instructions = missionThree.robotDirection;
      expect(robotThree.move).to.be.equal('3 3 N LOST');
    });

    describe('Lost Robot "Scent"', () => {
      describe('Given robot lost scent when next robot move then', () => {
        it('should prevent get off from the grid', () => {
          const missionThree = new MissionControl();
          missionThree.coordinates = '5 3';
          missionThree.robotDirection = 'FRRFLLFFRRFLL';
          missionThree.robotPosition = '3 2 N';
          robot.finalPosition = missionThree.robotPosition;
          robot.instructions = missionThree.robotDirection;
          robot.worldDimensions = missionThree.coordinates;
          robot.lostContactCoordinates = missionThree.lostContactCoordinates;
          robot.move;
          if (robot.data.isLost) {
            missionThree.lostContactCoordinates = robot.lostCoordinates;
          }
          const smartRobot = new Robot();
          missionThree.robotDirection = 'LLFFFLFLFL';
          missionThree.robotPosition = '0 3 W';
          smartRobot.finalPosition = missionThree.robotPosition;
          smartRobot.instructions = missionThree.robotDirection;
          smartRobot.worldDimensions = missionThree.coordinates;
          smartRobot.lostContactCoordinates =
            missionThree.lostContactCoordinates;
          expect(smartRobot.move).to.be.equal('2 3 S');
        });
      });
    });
  });
});
