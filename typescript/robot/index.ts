interface Coordinate {
  x: number;
  y: number;
}

interface Position extends Coordinate {
  orientation: 'n' | 'e' | 's' | 'w';
}

export interface RobotParams {
  worldDimensions: Coordinate;
  instructions: string[];
  initialPosition: Position;
}

export default class Robot {
  data: {
    previousPosition: Position;
    finalPosition: Position;
    instructions: string[];
    dimensions: Coordinate;
  };

  constructor({
    initialPosition: { x, y, orientation },
    instructions,
    worldDimensions,
  }: RobotParams) {
    this.data = {
      previousPosition: {
        x,
        y,
        orientation,
      },
      finalPosition: {
        x,
        y,
        orientation,
      },
      instructions,
      dimensions: worldDimensions,
    };
  }
}

const robot = new Robot({
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
});
