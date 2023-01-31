from dataclasses import dataclass
from typing import Dict, List


@dataclass
class Robot:
    position: Dict[str, str]
    instructions: List[str]
    dimensions: Dict[str, str]

    def move(self):
        for instruction in self.instructions:
            match instruction:
                case "r":
                    self.position["orientation"] = self.check_rudder("r", self.position["orientation"])
                case "l":
                    self.position["orientation"] = self.check_rudder("l", self.position["orientation"])
                case "f":
                    self.move_forward(self.position["orientation"])

            print({"instruction": instruction, "position": self.position})

    def check_rudder(self, instruction, orientation):
        rudder = ["n", "e", "s", "w"]

        index = rudder.index(orientation)

        if instruction == "r":
            index = rudder.index(orientation) + 1
        if instruction == "l":
            index = rudder.index(orientation) - 1

        if index > 3:
            return rudder[0]
        if index < 0:
            return rudder[3]

        return rudder[index]

    def move_forward(self, orientation):
        match orientation:
            case "n":
                self.position["y"] = self.position["y"] + 1
            case "e":
                self.position["x"] = self.position["x"] + 1
            case "s":
                self.position["y"] = self.position["y"] - 1
            case "w":
                self.position["x"] = self.position["y"] - 1


robot = Robot(
    instructions=["r", "f", "r", "f", "r", "f", "r", "f"],
    dimensions="",
    position={
        "x": 1,
        "y": 1,
        "orientation": "e",
    },
)


robot.move()
