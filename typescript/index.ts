#!/usr/bin/env -S ts-node

import { argv } from 'node:process';

import { readFileContents, getDimensions, getRobots } from './input-handler';
import World from './world';

const [flag, path] = argv.slice(2);

if (flag !== '--instructions') {
  console.error('Please provide the path with the "--instruction"');
  process.exit();
}

if (!path && typeof path !== 'string') {
  console.error(
    'Please provide the path with the "--instruction", e.g: "--instructions ./data/correct-input.txt"',
  );
  process.exit();
}

path.trim();

const main = async () => {
  try {
    const fileContents = await readFileContents(path);
    if (fileContents) {
      fileContents.trim();

      const commands = fileContents.split('\n');
      const dimensionsData = commands.shift();

      if (dimensionsData && commands) {
        const dimensions = getDimensions(dimensionsData);
        const robots = getRobots(commands);

        const world = new World({
          dimensions,
          robots,
        });

        return world.moveRobots().forEach((robot) => {
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
    }
    throw Error('File is empty');
  } catch (error) {
    console.error(error);
  }
};

main();
