module.exports = class Robot {
  constructor() {
    this.data = {
      previousPosition: {
        x: 0,
        y: 0,
        orientation: 'n',
      },
      finalPosition: {
        x: 0,
        y: 0,
        orientation: 'n',
      },
      instructions: [],
      dimensions: {
        x: 0,
        y: 0,
      },
      isLost: false,
      lostContactCoordinates: false,
      isStopped: false,
    };
  }
  set previousPosition(position) {
    return (this.data.previousPosition = position);
  }

  get previousPosition() {
    return this.data.previousPosition;
  }

  set finalPosition(position) {
    return (this.data.finalPosition = position);
  }

  get finalPosition() {
    return this.data.finalPosition;
  }

  set instructions(instructionsArray) {
    return (this.data.instructions = instructionsArray);
  }

  get instructions() {
    return this.data.instructions;
  }

  set worldDimensions(dimensionsData) {
    this.data.dimensions = dimensionsData;
  }

  get worldDimensions() {
    return this.data.dimensions;
  }

  get move() {
    for (let instruction of this.instructions) {
      this.previousPosition = this.finalPosition;
      switch (instruction) {
        case 'r':
          this.finalPosition.orientation = this.checkRudder(
            'r',
            this.finalPosition.orientation,
          );
          break;
        case 'l':
          this.finalPosition.orientation = this.checkRudder(
            'l',
            this.finalPosition.orientation,
          );
          break;

        case 'f':
          if (this.isInBoundaries() || !this.isOnLostCoordinate()) {
            this.moveForward(this.finalPosition.orientation);
          }
          break;
      }
    }
    if (this.isOutBoundaries()) {
      this.data.isLost = true;
    }
    return this.finalPositionString();
  }

  checkRudder(instruction, orientation) {
    const rudder = ['n', 'e', 's', 'w'];

    let index;
    if (instruction === 'r') {
      index = rudder.indexOf(orientation) + 1;
    }

    if (instruction === 'l') {
      index = rudder.indexOf(orientation) - 1;
    }

    return this.newBearing(index, rudder);
  }

  newBearing(index, rudder) {
    if (index > 3) {
      return rudder[0];
    }

    if (index < 0) {
      return rudder[3];
    }
    return rudder[index];
  }

  moveForward(orientation) {
    switch (orientation) {
      case 'n':
        this.finalPosition.y++;
        break;
      case 'e':
        this.finalPosition.x++;
        break;
      case 's':
        this.finalPosition.y--;
        break;
      case 'w':
        this.finalPosition.x--;
        break;
    }
  }

  finalPositionString() {
    if (this.data.isStopped) {
      return `${this.finalPosition.x} ${
        this.finalPosition.y
      } ${this.finalPosition.orientation.toUpperCase()}`;
    }

    if (this.data.isLost) {
      return `${this.finalPosition.x} ${
        this.finalPosition.y
      } ${this.finalPosition.orientation.toUpperCase()} LOST`;
    }
    return `${this.finalPosition.x} ${
      this.finalPosition.y
    } ${this.finalPosition.orientation.toUpperCase()}`;
  }

  isInBoundaries() {
    if (
      this.finalPosition.x > this.worldDimensions.x &&
      this.finalPosition.x < 0
    ) {
      return true;
    }

    if (
      this.finalPosition.y > this.worldDimensions.y &&
      this.finalPosition.x < 0
    ) {
      return true;
    }
    return false;
  }

  isOutBoundaries() {
    if (
      this.finalPosition.x >= this.worldDimensions.x ||
      this.finalPosition.x < 0
    ) {
      return true;
    }

    if (
      this.finalPosition.y >= this.worldDimensions.y ||
      this.finalPosition.y < 0
    ) {
      return true;
    }
    return false;
  }

  isOnLostCoordinate() {
    const stringLostCoordinates = JSON.stringify(this.lostContactCoordinates);
    const stringFinalPosition = JSON.stringify(this.finalPosition);
    const isOnLostCoordinate = stringLostCoordinates.includes(
      stringFinalPosition,
    );
    if (isOnLostCoordinate) {
      this.data.isStopped = true;
    }
    return isOnLostCoordinate;
  }

  set lostContactCoordinates(coordinates) {
    this.data.lostContactCoordinates = coordinates;
  }

  get lostContactCoordinates() {
    return this.data.lostContactCoordinates;
  }

  get lostCoordinates() {
    return {
      x: this.finalPosition.x,
      y: this.finalPosition.y,
      orientation: this.finalPosition.orientation,
    };
  }
};
