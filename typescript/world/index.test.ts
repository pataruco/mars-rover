import World from '.';
import Robot from '../robot';
import {
  robotOneParams,
  robotTwoParams,
  robotThreeParams,
} from '../robot/index.test';

const robotOne = new Robot(robotOneParams);
const robotTwo = new Robot(robotTwoParams);
const robotThree = new Robot(robotThreeParams);

const robots = [robotOne, robotTwo, robotThree];

describe('World', () => {});
