from dataclasses import dataclass
from typing import Dict, List, Optional

Coordinate = Dict[str, int]
Orientation = str
Position = Dict[str, int | str]
Instruction = str
Lost_robot_coordinates = Dict[int, Dict[int, str]]


@dataclass
class Robot:
    position: Position
    instructions: List[Instruction]
    dimensions: Optional[Coordinate] = None
    lost_robot_coordinates: Optional[Lost_robot_coordinates] = None
    is_lost = False
    lost_coordinate = None

    def move(self):
        for instruction in self.instructions:
            previous_position = self.position.copy()
            match instruction:
                case "r":
                    self.position["orientation"] = self.check_rudder(
                        "r", self.position["orientation"]
                    )
                case "l":
                    self.position["orientation"] = self.check_rudder(
                        "l", self.position["orientation"]
                    )
                case "f":
                    if (
                        self.is_in_boundaries()
                        and not self.is_lost
                        and not self.is_in_a_lost_coordinate(
                            previous_position, instruction
                        )
                    ):
                        self.move_forward(self.position["orientation"])

            if not self.is_in_boundaries() and not self.is_lost:
                self.is_lost = True
                self.lost_coordinate = previous_position

    def check_rudder(self, instruction: Instruction, orientation: Orientation):
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

    def move_forward(self, orientation: Orientation):
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
        is_within_horizontal_boundaries = (
            self.position["x"] >= 0 and self.position["x"] <= self.dimensions["x"]
        )
        is_within_vertical_boundaries = (
            self.position["y"] >= 0 and self.position["y"] <= self.dimensions["y"]
        )
        return is_within_horizontal_boundaries and is_within_vertical_boundaries

    def is_in_a_lost_coordinate(
        self, previous_position: Position, instruction: Instruction
    ):
        return (
            # Are lost coordinates
            self.lost_robot_coordinates
            # Is in a lost X coordinate
            and self.lost_robot_coordinates.get(previous_position["x"]) != None
            # Is in a lost Y coordinate
            and self.lost_robot_coordinates.get(previous_position["x"]).get(
                previous_position["y"]
            )
            != None
            # Is in a lost coordinate
            and self.lost_robot_coordinates.get(previous_position["x"]).get(
                previous_position["y"]
            )
            == previous_position["orientation"]
            # Is instruction forward
            and instruction == "f"
        )

    def set_lost_robot_coordinates(self, coordinates: Lost_robot_coordinates):
        self.lost_robot_coordinates = coordinates

    def set_world_dimmensions(self, world_dimensions: Coordinate):
        self.dimensions = world_dimensions
