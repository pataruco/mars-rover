from dataclasses import dataclass, field
from robot.index import Coordinate, Lost_robot_coordinates, Robot
from typing import List, Optional


@dataclass
class World:
    dimensions: Coordinate
    robots: List[Robot]
    lost_robot_coordinates: Optional[Lost_robot_coordinates] = field(
        default_factory=dict
    )

    def move_robots(self):
        robots_moved = []
        for robot in self.robots:
            robot.set_world_dimmensions(self.dimensions)

            if self.lost_robot_coordinates:
                robot.set_lost_robot_coordinates(self.lost_robot_coordinates)

            robot.move()

            if robot.is_lost:
                if robot.lost_coordinate:
                    self.lost_robot_coordinates = {
                        **self.lost_robot_coordinates,
                        robot.lost_coordinate["x"]: {
                            robot.lost_coordinate["y"]: robot.lost_coordinate[
                                "orientation"
                            ]
                        },
                    }

            robots_moved.append(robot)
        return robots_moved
