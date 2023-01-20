export interface Coordinate {
  x: number;
  y: number;
}

export type Orientation = 'n' | 'e' | 's' | 'w';

export interface Position extends Coordinate {
  orientation: Orientation;
}

export type Instruction = 'l' | 'r' | 'f';

export type LostRobotCoordinate = Record<
  Coordinate['x'],
  Record<Coordinate['y'], Orientation>
>;

export interface RobotParams {
  worldDimensions: Coordinate;
  instructions: Instruction[];
  initialPosition: Position;
  lostRobotCoordinates?: LostRobotCoordinate;
}

export interface IsInOnALostCoordinate {
  previousPosition: Position;
  instruction: Instruction;
}
