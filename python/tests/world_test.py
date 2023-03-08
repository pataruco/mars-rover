from robot.index import Robot
from world.index import World


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

robot_three_params = {
    "instructions": ["l", "l", "f", "f", "f", "l", "f", "l", "f", "l"],
    "position": {
        "x": 0,
        "y": 3,
        "orientation": "w",
    },
}

robot_one = Robot(
    instructions=robot_one_params["instructions"],
    position=robot_one_params["position"],
)

robot_two = Robot(
    instructions=robot_two_params["instructions"],
    position=robot_two_params["position"],
)

robot_three = Robot(
    instructions=robot_three_params["instructions"],
    position=robot_three_params["position"],
)

robots = [robot_one, robot_two, robot_three]


def test_accept_world_params():
    world = World(dimensions=world_dimensions, robots=robots)

    assert world.dimensions == world_dimensions
    assert world.robots == robots


def test_move_robots():
    world = World(dimensions=world_dimensions, robots=robots)

    [one] = world.move_robots()

    print("one", one)
    # assert False

    assert one.position == {"x": 1, "y": 1, "orientation": "e"}
