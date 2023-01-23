import { argv } from 'node:process';
import { readFile } from 'node:fs/promises';
import { inspect } from 'util';

import World from './world';
import Robot from './robot';
import { Instruction, Orientation, Position, RobotParams } from './@types';

const [flag, path] = argv.slice(2);

if (flag !== '--instructions') {
  console.log('Please provide the path with the "--instruction"');
  process.exit();
}

if (!path && typeof path !== 'string') {
  console.log(
    'Please provide the path with the "--instruction", e.g: "--instructions ./data/correct-input.txt"',
  );
  process.exit();
}

path.trim();

const readFileContents = async (path: string) => {
  try {
    return await readFile(path, { encoding: 'utf8' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const removeEmptySpace = (string: string) =>
  string.replaceAll(' ', '').trim().toLocaleLowerCase();

const twoDigitsPattern = new RegExp(/\d{2}/g);
const positionPattern = new RegExp(/((\d{2})(n|w|s|e){1})/g);
const instructionsPattern = new RegExp(/((r|l|f)+)/g);

const getDimensions = (string: string | undefined) => {
  const error = Error('Grid dimensions should be two digits, e.g. 53.');
  if (string) {
    const cleanDimensionsData = removeEmptySpace(string);
    if (cleanDimensionsData.match(twoDigitsPattern)) {
      const [x, y] = cleanDimensionsData.split('');
      return {
        x: Number(x),
        y: Number(y),
      };
    }
    throw error;
  }
  throw error;
};

interface RobotsData {
  initialPosition: string;
  instructions: string;
}

const getRobotsData = (comands: string[]) =>
  comands.reduce((result, _, index, array) => {
    if (index % 2 === 0) {
      const pair = array.slice(index, index + 2);
      if (pair.length === 2) {
        const [initialPosition, instructions] = pair;
        result.push({
          initialPosition: removeEmptySpace(initialPosition),
          instructions: removeEmptySpace(instructions),
        });
      }
    }
    return result;
  }, [] as RobotsData[]);

const getRobots = (comands: string[]) => {
  const robotsData = getRobotsData(comands);
  const robotParams: RobotParams[] = [];
  for (const { initialPosition, instructions } of robotsData) {
    if (
      !initialPosition.match(positionPattern) &&
      !instructions.match(instructionsPattern)
    ) {
      throw Error(
        `A position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line. 
        A robot instruction is a string of the letters 'L', 'R', and 'F' on one line.`,
      );
    }

    const [x, y, orientation] = initialPosition.split('');

    robotParams.push({
      initialPosition: { x: Number(x), y: Number(y), orientation } as Position,
      instructions: instructions.split('') as unknown as Instruction[],
    });
  }

  return robotParams.map((robotParams) => new Robot(robotParams));
};

const main = async () => {
  const fileContents = await readFileContents(path);
  fileContents?.trim();

  const commands = fileContents?.split('\n');

  const dimensionsData = commands?.shift();

  try {
    if (dimensionsData && commands) {
      const dimensions = getDimensions(dimensionsData);
      const robots = getRobots(commands);

      console.log(inspect({ dimensions, robots }, true, Infinity, true));

      const world = new World({
        dimensions,
        robots,
      });

      world.moveRobots().forEach((robot) => {
        if (robot.data.isLost) {
          console.log(
            `${robot.lostCoordinate?.x} ${robot.lostCoordinate?.y} ${robot.lostCoordinate?.orientation} LOST`.toUpperCase(),
          );
        } else {
          console.log(
            `${robot.data.position.x} ${robot.data.position.y} ${robot.data.position.orientation}`.toUpperCase(),
          );
        }
      });
    }
  } catch (error) {}
};

main();
