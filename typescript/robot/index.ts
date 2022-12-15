interface Coordinate {
  x: number;
  y: number;
}

type Orientation = 'n' | 'e' | 's' | 'w';

interface Position extends Coordinate {
  orientation: Orientation;
}

type Instruction = 'l' | 'r' | 'f';

type LostRobotCoordinate = Record<number, Record<number, boolean>>;

const lostRobotsCoordinates: LostRobotCoordinate = {
  10: {
    20: true,
  },
};

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
    isLost: boolean;
    isStopped: boolean;
    lostRobotsCoordinates: LostRobotCoordinate;
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
      isLost: false,
      isStopped: false,
      lostRobotsCoordinates: {},
    };
  }

  private checkRudder(instruction: Instruction, orientation: Orientation) {
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

  private moveForward(orientation: Orientation) {
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
    if (!this.isInBoundaries(this.data.finalPosition)) {
      this.data.finalPosition = this.data.previousPosition;
      this.data.isLost = true;
      this.data.isStopped = true;
    }

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
          if (!this.data.isStopped) {
            this.moveForward(this.data.finalPosition.orientation);
          } else {
          }
          break;
      }

      console.log(this.data.finalPosition);
    }
  }

  private gotScentAndCouldMoveOutBoundaries({
    previousPosition,
    finalPosition,
  }: {
    previousPosition: Position;
    finalPosition: Position;
  }) {
    const isOnScentPosition =
      this.data.lostRobotsCoordinates[previousPosition.x][previousPosition.y];

    // const couldMoveOutBoundaries =
  }

  private isInBoundaries(position: Position) {
    const isWithinHorizontalBoundaries =
      position.x >= 0 && position.x <= this.data.dimensions.x;

    const isWithinVerticalBoundaries =
      position.y >= 0 && position.y <= this.data.dimensions.y;

    return isWithinHorizontalBoundaries && isWithinVerticalBoundaries;
  }
}
