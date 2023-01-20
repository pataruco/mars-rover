import { Coordinate, LostRobotCoordinate } from '../@types';
import Robot from '../robot';

interface WorldParams {
  dimensions: Coordinate;
  robots: Robot[];
}

export default class World {
  dimensions: Coordinate;
  robots: Robot[];
  lostRobotCoordinates?: LostRobotCoordinate;

  constructor({ dimensions, robots }: WorldParams) {
    this.dimensions = dimensions;
    this.robots = robots;
  }

  moveRobots() {
    this.robots.map((robot) => {
      robot.setworldDimensions(this.dimensions);

      robot.move();

      if (robot.data.isLost) {
        const { lostCoordinate } = robot;
        if (lostCoordinate) {
          this.lostRobotCoordinates = {
            ...this.lostRobotCoordinates,
            [lostCoordinate['x']]: {
              [lostCoordinate['y']]: lostCoordinate['orientation'],
            },
          };
        }
      }

      if (this.lostRobotCoordinates) {
        robot.setLostRobotCoordinates(this.lostRobotCoordinates);
      }
    });
  }
}
