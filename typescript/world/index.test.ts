import World from '.';
import Robot from '../robot';
import {
  robotOneParams,
  robotTwoParams,
  robotThreeParams,
  worldDimensions,
} from '../robot/index.test';

const robotOne = new Robot(robotOneParams);
const robotTwo = new Robot(robotTwoParams);
const robotThree = new Robot(robotThreeParams);

const robots = [robotOne, robotTwo, robotThree];

describe('World', () => {
  it('receive params', () => {
    const world = new World({
      dimensions: worldDimensions,
      robots,
    });

    expect(world.dimensions).toEqual(worldDimensions);
    expect(world.robots).toEqual(robots);
  });

  it('move robots', () => {
    const world = new World({
      dimensions: worldDimensions,
      robots,
    });

    const [one, two, three] = world.moveRobots();

    expect(one.data.position).toEqual({
      x: 1,
      y: 1,
      orientation: 'e',
    });
    expect(one.data.isLost).toBe(false);

    expect(two.lostCoordinate).toEqual({
      x: 3,
      y: 3,
      orientation: 'n',
    });
    expect(two.data.isLost).toBe(true);

    expect(three.data.position).toEqual({
      x: 2,
      y: 3,
      orientation: 's',
    });

    expect(three.data.isLost).toBe(false);
    expect(three.lostCoordinate).toBeUndefined();
  });
});
