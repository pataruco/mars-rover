import { readFile } from 'node:fs/promises';

import Robot from '../robot';
import { Instruction, Position, RobotParams } from '../@types';

export const readFileContents = async (path: string) => {
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

export const getDimensions = (string: string) => {
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

export const getRobots = (comands: string[]) => {
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
