import Robot from '.';
import type { RobotParams } from '.';

const robotOneParams: RobotParams = {
  worldDimensions: {
    x: 5,
    y: 3,
  },
  instructions: ['r', 'f', 'r', 'f', 'r', 'f', 'r', 'f'],
  initialPosition: {
    x: 1,
    y: 1,
    orientation: 'e',
  },
};

const robotTwoParams: RobotParams = {
  worldDimensions: {
    x: 5,
    y: 3,
  },
  instructions: [
    'f',
    'r',
    'r',
    'f',
    'l',
    'l',
    'f',
    'f',
    'r',
    'r',
    'f',
    'l',
    'l',
  ],
  initialPosition: {
    x: 3,
    y: 2,
    orientation: 'n',
  },
};

const robotThreeParams: RobotParams = {
  worldDimensions: {
    x: 5,
    y: 3,
  },
  instructions: ['l', 'l', 'f', 'f', 'l', 'f', 'l', 'f', 'l'],
  initialPosition: {
    x: 0,
    y: 3,
    orientation: 'w',
  },
};

describe('Robot', () => {
  it('accept params', () => {
    const {
      worldDimensions: dimensions,
      instructions,
      initialPosition,
    } = robotOneParams;

    const robot = new Robot(robotOneParams);

    expect(robot.data).toEqual({
      dimensions,
      instructions,
      previousPosition: initialPosition,
      finalPosition: initialPosition,
      isLost: false,
      isStopped: false,
      lostRobotsCoordinates: {},
    });
  });

  it.only('moves to a new position', () => {
    // const robotOne = new Robot(robotOneParams);
    // robotOne.move();

    const robotTwo = new Robot(robotTwoParams);
    robotTwo.move();

    // expect(robotOne.data.finalPosition).toEqual({
    //   x: 1,
    //   y: 1,
    //   orientation: 'e',
    // });

    expect(robotTwo.data.finalPosition).toEqual({
      x: 3,
      y: 3,
      orientation: 'n',
    });
  });

  it('moves to a new position within boundaries', () => {
    const robot = new Robot({
      worldDimensions: {
        x: 5,
        y: 3,
      },
      instructions: [
        'f',
        'f',
        'f',
        'f',
        'f',
        'f',
        'f',
        'f',
        'f',
        'f',
        'f',
        'f',
      ],
      initialPosition: {
        x: 1,
        y: 1,
        orientation: 'n',
      },
    });

    robot.move();

    expect(robot.data.finalPosition).toEqual({
      x: 1,
      y: 4,
      orientation: 'n',
    });
  });
});
