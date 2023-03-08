# import pytest
from index import Robot

world_dimensions = {
    "x": 5,
    "y": 3,
}

robot_one_params = {
    "instructions": ["r", "f", "r", "f", "r", "f", "r", "f"],
    "position": {
        "x": 1,
        "y": 1,
        "orientation": "e",
    },
}


robot_two_params = {
    "instructions": ["f", "r", "r", "f", "l", "l", "f", "f", "r", "r", "f", "l", "l"],
    "position": {
        "x": 3,
        "y": 2,
        "orientation": "n",
    },
}

robot_three_params = {
    "instructions": ["l", "l", "f", "f", "f", "l", "f", "l", "f", "l"],
    "position": {
        "x": 0,
        "y": 3,
        "orientation": "w",
    },
}


def test_accept_params():
    robot_one = Robot(
        instructions=robot_one_params["instructions"],
        position=robot_one_params["position"],
    )
    assert (robot_one.instructions) == ["r", "f", "r", "f", "r", "f", "r", "f"]


def test_move_to_a_new_position():
    robot_one = Robot(
        instructions=robot_one_params["instructions"],
        position=robot_one_params["position"],
    )
    robot_one.set_world_dimmensions(world_dimensions)
    robot_one.move()

    robot_two = Robot(
        instructions=robot_two_params["instructions"],
        position=robot_two_params["position"],
    )
    robot_two.set_world_dimmensions(world_dimensions)
    robot_two.move()

    assert robot_one.position == {"x": 1, "y": 1, "orientation": "e"}
    assert robot_two.position == {"x": 3, "y": 4, "orientation": "n"}


def test_reports_last_known_coordinates_when_is_lost():
    robot_two_params = {
        "instructions": [
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
            "l",
        ],
        "position": {
            "x": 3,
            "y": 2,
            "orientation": "n",
        },
    }

    robot = Robot(
        instructions=robot_two_params["instructions"],
        position=robot_two_params["position"],
    )

    robot.set_world_dimmensions(world_dimensions)
    robot.move()

    assert robot.position == {"x": 3, "y": 4, "orientation": "n"}
    assert robot.is_lost == True
    assert robot.lost_coordinate == {"x": 3, "y": 3, "orientation": "n"}


def test_prevent_get_lost_if_robot_is_in_a_lost_coordinate():
    robot = Robot(
        instructions=robot_three_params["instructions"],
        position=robot_three_params["position"],
    )

    robot.set_world_dimmensions(world_dimensions)
    robot.set_lost_robot_coordinates({3: {3: "n"}})
    robot.move()

    assert robot.position == {"x": 2, "y": 3, "orientation": "s"}
    assert robot.is_lost == False
