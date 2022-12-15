interface Coordinate {
  x: number;
  y: number;
}

type Orientation = 'n' | 'e' | 's' | 'w';

interface Position extends Coordinate {
  orientation: Orientation;
}

type Instruction = 'l' | 'r' | 'f';

export interface RobotParams {
  worldDimensions: Coordinate;
  instructions: Instruction[];
  initialPosition: Position;
}

export default class Robot {
  data: {
    previousPosition: Position;
    finalPosition: Position;
    instructions: Instruction[];
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

  checkRudder(instruction: Instruction, orientation: Orientation) {
    const rudder: Orientation[] = ['n', 'e', 's', 'w'];

    let index = rudder.indexOf(orientation);

    if (instruction === 'r') {
      index = rudder.indexOf(orientation) + 1;
    }

    if (instruction === 'l') {
      index = rudder.indexOf(orientation) - 1;
    }

    if (index > 3) {
      return rudder[0];
    }

    if (index < 0) {
      return rudder[3];
    }

    return rudder[index];
  }

  moveForward(orientation: Orientation) {
    switch (orientation) {
      case 'n':
        this.data.finalPosition.y++;
        break;
      case 'e':
        this.data.finalPosition.x++;
        break;
      case 's':
        this.data.finalPosition.y--;
        break;
      case 'w':
        this.data.finalPosition.x--;
        break;
    }
  }

  public move() {
    for (let instruction of this.data.instructions) {
      this.data.previousPosition = this.data.finalPosition;
      switch (instruction) {
        case 'r':
          this.data.finalPosition.orientation = this.checkRudder(
            'r',
            this.data.finalPosition.orientation,
          );
          break;
        case 'l':
          this.data.finalPosition.orientation = this.checkRudder(
            'l',
            this.data.finalPosition.orientation,
          );
          break;
        case 'f':
          this.moveForward(this.data.finalPosition.orientation);
          break;
      }
    }
  }
}
