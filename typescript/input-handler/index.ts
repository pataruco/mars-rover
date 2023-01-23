import { argv } from 'node:process';
import { readFile } from 'node:fs/promises';

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

const twoDigits = new RegExp(/\d{2}/g);
const position = new RegExp(/((\d{2})(n|w|s|e){1})/g);

const getDimensions = (string: string | undefined) => {
  const error = Error('Grid dimensions should be two digits, e.g. 53.');
  if (string) {
    const cleanDimensionsData = removeEmptySpace(string);
    if (cleanDimensionsData.match(twoDigits)) {
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

  console.log({ robotsData });

  for (const { initialPosition, instructions } of robotsData) {
  }
};

const main = async () => {
  const fileContents = await readFileContents(path);
  fileContents?.trim();

  const commands = fileContents?.split('\n');

  const dimensionsData = commands?.shift();

  // TODO: handle errors
  const dimensions = getDimensions(dimensionsData);

  if (commands) {
    const robots = getRobots(commands);
  }
};

main();
