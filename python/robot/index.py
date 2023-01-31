from dataclasses import dataclass
from typing import Dict, List, Optional


@dataclass
class Robot:
    position: Dict[str, str | int]
    instructions: List[str]
    dimensions: Dict[str, int]
    lost_robot_coordinates: Optional[Dict[int, Dict[int, str]]] = None
    is_lost = False
    lost_coordinate = None

    def move(self):
        for instruction in self.instructions:
            previous_position = self.position.copy()
            match instruction:
                case "r":
                    self.position["orientation"] = self.check_rudder("r", self.position["orientation"])
                case "l":
                    self.position["orientation"] = self.check_rudder("l", self.position["orientation"])
                case "f":
                    if self.is_in_boundaries() and not self.is_lost:
                        self.move_forward(self.position["orientation"])

            if (
                not self.is_in_boundaries()
                and not self.is_lost
                # and not self.is_in_a_lost_coordinate(previous_position, instruction)
            ):
                self.is_lost = True
                self.lost_coordinate = previous_position

            print(
                {
                    "instruction": instruction,
                    "position": self.position,
                    "previous_position": previous_position,
                    "is_in_boundaries": self.is_in_boundaries(),
                    "is_lost": self.is_lost,
                    "lost_coordinate": self.lost_coordinate,
                    "lost_robot_coordinates": self.lost_robot_coordinates,
                }
            )

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
                self.position["y"] += 1
            case "e":
                self.position["x"] += 1
            case "s":
                self.position["y"] -= 1
            case "w":
                self.position["x"] -= 1

    def is_in_boundaries(self):
        is_within_horizontal_boundaries = self.position["x"] >= 0 and self.position["x"] <= self.dimensions["x"]
        is_within_vertical_boundaries = self.position["y"] >= 0 and self.position["y"] <= self.dimensions["y"]
        return is_within_horizontal_boundaries and is_within_vertical_boundaries


# TODO:
# def is_in_a_lost_coordinate(self, previous_position, instruction):
#     if (
#         self.lost_robot_coordinates
#         and self.lost_robot_coordinates[int(previous_position["x"])]
#         and self.lost_robot_coordinates[previous_position["x"]][previous_position["y"]]
#         and self.lost_robot_coordinates[previous_position["x"]][previous_position["y"]]
#         == previous_position["orientation"]
#         and instruction == "f"
#     ):
#         return True
#     else:
#         return False


robotOne = Robot(
    instructions=["r", "f", "r", "f", "r", "f", "r", "f"],
    dimensions={
        "x": 5,
        "y": 3,
    },
    position={
        "x": 1,
        "y": 1,
        "orientation": "e",
    },
)


robotTwo = Robot(
    instructions=["f", "r", "r", "f", "l", "l", "f", "f", "r", "r", "f", "l", "l"],
    dimensions={
        "x": 5,
        "y": 3,
    },
    position={
        "x": 3,
        "y": 2,
        "orientation": "n",
    },
)

robot_three = Robot(
    instructions=["l", "l", "f", "f", "f", "l", "f", "l", "f", "l"],
    dimensions={
        "x": 5,
        "y": 3,
    },
    position={
        "x": 0,
        "y": 3,
        "orientation": "w",
    },
    lost_robot_coordinates={3: {3: "n"}},
)

# robotOne.move()
# robotTwo.move()
robot_three.move()
