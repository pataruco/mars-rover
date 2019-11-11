const chai = require("chai");
const expect = require("chai").expect;
const mocha = require("mocha");
const assertArrays = require("chai-arrays");
const MissionControl = require("../src/mission-control.js");
chai.use(assertArrays);
chai.should();
chai.use(require("chai-things"));

describe("MissionControl", () => {
  // - Create a command control class to manage user input and output
  let missionControl;

  before(() => {
    missionControl = new MissionControl();
  });

  describe("instantiation", () => {
    it("should return an instance ", () => {
      expect(missionControl).to.be.an.instanceof(MissionControl);
    });
  });

  // - GET coordinates
  describe("coordinates", () => {
    before(() => {
      missionControl.coordinates = "5 3";
    });

    //  check if coordinates match pattern
    it("should SET coordinates", () => {
      expect(missionControl.data.coordinates).to.include({ x: 5, y: 3 });
    });

    it("should GET coordinates", () => {
      expect(missionControl.coordinates).to.include({ x: 5, y: 3 });
    });
    // - if not throw error message
    it("should return false when user input does not match coordinates pattern", () => {
      const mission = new MissionControl();
      mission.coordinates = "aa bb";
      expect(mission.coordinates).to.be.false;
    });
  });

  describe("robot position", () => {
    it("should SET robot position", () => {
      missionControl.robotPosition = "1 1 E";
      expect(missionControl.data.robotPosition).to.include({
        x: 1,
        y: 1,
        orientation: "e"
      });
    });

    it("should GET robot position", () => {
      missionControl.robotPosition = "2 2 N";
      expect(missionControl.robotPosition).to.include({
        x: 2,
        y: 2,
        orientation: "n"
      });
    });

    // The maximum value for any coordinate is 50.
    it("should SET robot position data to be 50 if coordinates are greater than 51", () => {
      missionControl.coordinates = "70 70";
      missionControl.robotPosition = "60 60 N";
      expect(missionControl.robotPosition).to.include({
        x: 50,
        y: 50,
        orientation: "n"
      });
    });

    // - check if coordinates are less than world grid dimensions
    describe("are in the world grid?", () => {
      it("should SET coordinates if are in the world grid", () => {
        missionControl.coordinates = "5 3";
        missionControl.robotPosition = "2 2 N";
        expect(missionControl.robotPosition).to.include({
          x: 2,
          y: 2,
          orientation: "n"
        });
      });

      it("should prevent SET coordinates if are beyond the world grid", () => {
        missionControl.coordinates = "5 3";
        missionControl.robotPosition = "7 4 N";
        expect(missionControl.robotPosition).to.be.null;
      });
    });

    describe("error ", () => {
      //         - check if coordinates match pattern
      it("should return false when user input does not match coordinates and orientation pattern", () => {
        const mission = new MissionControl();
        mission.robotPosition = "11E";
        expect(mission.robotPosition).to.be.false;
      });
    });
  });
  describe("robot direction", () => {
    it("should SET a robot direction", () => {
      missionControl.robotDirection = "RFRFRFRF";
      expect(missionControl.data.robotDirection).to.to.be.equalTo([
        "r",
        "f",
        "r",
        "f",
        "r",
        "f",
        "r",
        "f"
      ]);
      expect(missionControl.data.robotDirection[0]).to.be.equal("r");
      expect(
        missionControl.data.robotDirection[
          missionControl.data.robotDirection.length - 1
        ]
      ).to.be.equal("f");
    });

    it("should GET a robot direction", () => {
      missionControl.robotDirection = "FRRFLLFFRRFLL";
      expect(missionControl.robotDirection).to.be.equalTo([
        "f",
        "r",
        "r",
        "f",
        "l",
        "l",
        "f",
        "f",
        "r",
        "r",
        "f",
        "l",
        "l"
      ]);
    });

    describe("error ", () => {
      it("should return false when user input does not match instructions pattern", () => {
        let mission = new MissionControl();
        mission.robotPosition = "adkjahs";
        expect(mission.robotDirection).to.be.false;
      });

      it("should return null when instruction string is greater than 100 characters", () => {
        let missionTwo = new MissionControl();
        const string = "RFRFRFRF".repeat(20);
        missionTwo.robotDirection = string;
        expect(missionTwo.robotDirection).to.be.null;
      });
    });
  });

  describe("Lost robots", () => {
    it("should SET an array of lost robots coordinates", () => {
      missionControl.lostContactCoordinates = { x: 5, y: 3 };
      missionControl.data.lostContactCoordinates.should.include.something.that.deep.equals(
        { x: 5, y: 3 }
      );
    });
  });
});
