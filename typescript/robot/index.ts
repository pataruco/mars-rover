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

const lostRobotCoordinates: LostRobotCoordinate = {
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
    position: Position;
    instructions: Instruction[];
    dimensions: Coordinate;
    isLost: boolean;
    isStopped: boolean;
    lostRobotCoordinates: LostRobotCoordinate;
  };

  constructor({
    initialPosition: { x, y, orientation },
    instructions,
    worldDimensions,
  }: RobotParams) {
    this.data = {
      position: {
        x,
        y,
        orientation,
      },
      instructions,
      dimensions: worldDimensions,
      isLost: false,
      isStopped: false,
      lostRobotCoordinates: {},
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
        this.data.position.y++;
        break;
      case 'e':
        this.data.position.x++;
        break;
      case 's':
        this.data.position.y--;
        break;
      case 'w':
        this.data.position.x--;
        break;
    }
  }

  public move() {
    for (let instruction of this.data.instructions) {
      const previousPosition = { ...this.data.position };

      switch (instruction) {
        case 'r':
          this.data.position.orientation = this.checkRudder(
            'r',
            this.data.position.orientation,
          );
          break;
        case 'l':
          this.data.position.orientation = this.checkRudder(
            'l',
            this.data.position.orientation,
          );
          break;
        case 'f':
          if (this.isInBoundaries() && !this.data.isLost) {
            this.moveForward(this.data.position.orientation);
          }
          break;
      }

      if (!this.isInBoundaries() && !this.data.isLost) {
        this.data.isLost = true;
      }

      const { position, isLost } = this.data;

      console.log({ previousPosition, position, isLost });
    }
  }

  private gotScentAndCouldMoveOutBoundaries({
    previousPosition,
    position,
  }: {
    previousPosition: Position;
    position: Position;
  }) {
    const isOnScentPosition =
      this.data.lostRobotCoordinates[previousPosition.x][previousPosition.y];

    // const couldMoveOutBoundaries =
  }

  private isInBoundaries() {
    const isWithinHorizontalBoundaries =
      this.data.position.x >= 0 &&
      this.data.position.x < this.data.dimensions.x;

    const isWithinVerticalBoundaries =
      this.data.position.y >= 0 &&
      this.data.position.y < this.data.dimensions.y;

    return isWithinHorizontalBoundaries && isWithinVerticalBoundaries;
  }
}
