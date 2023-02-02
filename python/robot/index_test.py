# import pytest
from index import Robot

robot_one = Robot(
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


robot_two = Robot(
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


def test_accept_params():
    """
    accept params
    """
    assert (robot_one.instructions) == ["r", "f", "r", "f", "r", "f", "r", "f"]
