const MissionControl = require('./src/mission-control.js');
const Robot = require('./src/robot.js');
const prompt = require('prompt');
const colors = require('colors/safe');

prompt.start();
prompt.message = colors.green('Mission Control');
prompt.delimiter = colors.green('|> ');

const mission = new MissionControl();

const dimensionsSchema = {
  properties: {
    coordinates: {
      description: colors.yellow.underline('Please, enter grid dimensions'),
      pattern: /^\d{1,2}?\s\d{1,2}?$/g,
      message: 'dimensions must be a pair of integers separated by a space',
      required: true,
    },
  },
};

const robotPositionSchema = {
  properties: {
    robotPosition: {
      description: colors.yellow.underline('Please, enter robot coordinates'),
      pattern: /^\d{1,2}?\s\d{1,2}\s[NnEeSsWw]$/g,
      message:
        'Coordinates must be two integers and an orientation (N, S, E, W) separated by a space',
      required: true,
    },
  },
};

const robotDirectionSchema = {
  properties: {
    robotDirection: {
      description: colors.yellow.underline('Please, enter robot instructions'),
      pattern: /^[RrLlFf]+$/g,
      message: 'Instructions is a string of the letters “L”, “R”, and “F”',
      required: true,
    },
  },
};

const getAnotherRobotSchema = {
  properties: {
    anotherRobot: {
      description: colors.yellow.underline(
        'Do you want to deploy another robot (Y)es or (N)',
      ),
      pattern: /^(?:[Yy]|[Nn])$/,
      message: 'Answer is Y or N',
      required: true,
    },
  },
};

function getWorldDimensions() {
  prompt.get(dimensionsSchema, (error, result) => {
    if (result) {
      mission.coordinates = result.coordinates;
    }
    getRobotPosition();
  });
}

function getRobotPosition() {
  prompt.get(robotPositionSchema, (error, result) => {
    if (result) {
      mission.robotPosition = result.robotPosition;
    }
    getRobotInstructions();
  });
}

function getRobotInstructions() {
  prompt.get(robotDirectionSchema, (error, result) => {
    if (result) {
      mission.robotDirection = result.robotDirection;
    }
    setRobotInstructions();
  });
}

function setRobotInstructions() {
  const robot = new Robot();
  robot.finalPosition = mission.robotPosition;
  robot.instructions = mission.robotDirection;
  robot.worldDimensions = mission.coordinates;
  robot.lostContactCoordinates = mission.lostContactCoordinates;

  const message =
    colors.green('Mission Control|> ') + colors.black.bgWhite(`${robot.move}`);
  console.log(message);

  if (robot.data.isLost) {
    mission.lostContactCoordinates = robot.lostCoordinates;
  }

  getAnotherRobot();
}

function getAnotherRobot() {
  prompt.get(getAnotherRobotSchema, (error, result) => {
    if (result) {
      if (result.anotherRobot.toLowerCase() === 'y') {
        getRobotPosition();
      } else {
        console.log(
          colors.green('Mission Control|> ') +
            colors.yellow.underline('Over and Out'),
        );
      }
    }
  });
}

function start() {
  getWorldDimensions();
}

start();
