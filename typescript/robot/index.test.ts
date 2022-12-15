import Robot from '.';
import type { RobotParams } from '.';

describe('Robot', () => {
  it('accept params', () => {
    const params: RobotParams = {
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

    const {
      worldDimensions: dimensions,
      instructions,
      initialPosition,
    } = params;

    const robot = new Robot(params);

    expect(robot.data).toEqual({
      dimensions,
      instructions,
      previousPosition: initialPosition,
      finalPosition: initialPosition,
    });
  });
});
