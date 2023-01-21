import Robot from '.';
import type { RobotParams } from '../@types';

export const worldDimensions = {
  x: 5,
  y: 3,
};

export const robotOneParams: RobotParams = {
  instructions: ['r', 'f', 'r', 'f', 'r', 'f', 'r', 'f'],
  initialPosition: {
    x: 1,
    y: 1,
    orientation: 'e',
  },
};

export const robotTwoParams: RobotParams = {
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

export const robotThreeParams: RobotParams = {
  instructions: ['l', 'l', 'f', 'f', 'f', 'l', 'f', 'l', 'f', 'l'],
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
      position: initialPosition,
      isLost: false,
    });
  });

  it('moves to a new position', () => {
    const robotOne = new Robot(robotOneParams);

    robotOne.setworldDimensions(worldDimensions);
    robotOne.move();

    const robotTwo = new Robot(robotTwoParams);

    robotTwo.setworldDimensions(worldDimensions);
    robotTwo.move();

    expect(robotOne.data.position).toEqual({
      x: 1,
      y: 1,
      orientation: 'e',
    });

    expect(robotTwo.data.position).toEqual({
      x: 3,
      y: 4,
      orientation: 'n',
    });
  });

  it('reports last known coordinates when is lost', () => {
    const robotOne = new Robot(robotOneParams);

    robotOne.setworldDimensions(worldDimensions);
    robotOne.move();

    const robotTwo = new Robot(robotTwoParams);

    robotTwo.setworldDimensions(worldDimensions);
    robotTwo.move();

    expect(robotOne.data.position).toEqual({
      x: 1,
      y: 1,
      orientation: 'e',
    });

    expect(robotOne.data.isLost).toBe(false);

    expect(robotTwo.lostCoordinate).toEqual({
      x: 3,
      y: 3,
      orientation: 'n',
    });

    expect(robotTwo.data.isLost).toBe(true);
  });

  it("don't fell off of the grid when is in an scented coordinate are set by constructor", () => {
    const params: RobotParams = {
      ...robotThreeParams,
      lostRobotCoordinates: {
        '3': {
          '3': 'n',
        },
      },
    };

    const robotThree = new Robot(params);

    robotThree.setworldDimensions(worldDimensions);
    robotThree.move();

    expect(robotThree.data.position).toEqual({
      x: 2,
      y: 3,
      orientation: 's',
    });

    expect(robotThree.data.isLost).toBe(false);
    expect(robotThree.lostCoordinate).toBeUndefined();
  });

  it("don't fell off of the grid when is in an scented coordinate are set by setter", () => {
    const robotThree = new Robot(robotThreeParams);

    robotThree.setLostRobotCoordinates({
      '3': {
        '3': 'n',
      },
    });

    robotThree.setworldDimensions(worldDimensions);
    robotThree.move();

    expect(robotThree.data.position).toEqual({
      x: 2,
      y: 3,
      orientation: 's',
    });

    expect(robotThree.data.isLost).toBe(false);
    expect(robotThree.lostCoordinate).toBeUndefined();
  });
});
