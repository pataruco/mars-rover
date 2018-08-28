# Pseudo code

## mission control

- Create a command control class to manage user input and output
  - get coordinates
    - check if coordinates match pattern
      - if not throw error message
    - -> set world grid (new world)
  - get initial position of a robot
    - check if coordinates match pattern
      - if not throw error
    - check if coordinates are less than world grid dimensions
      - if not throw error
    - -> set robot initial position
  - Create dimensions of the grid
  - Manage robot positions? maybe this is a helper class?
  - Lost robots is an array of robots
  - get robot direction -> give direction commands to robot
  - Set (display) robot final position

## Robot

- Receive initial coordinates
- Receive instructions
  - Set orientation
    - North and South are y-axis
    - East and West are x-axis
  - R and L toggle axis
  - F increase position on axis + 1
  - B decrease position on axis
- Move robot
  - check if world lost robots coordinates
  - Set final position coordinates
  - iterate through instructions array
    - set finalPosition to be previousPosition
    - on each iteration check rudder array [N E S W]
      - if instruction is Right
          <!-- - set finalPosition to be previousPosition -->
        - move rudder index +1
          <!-- - toggle actual axis -->
        - Set new orientation on finalPosition
      - if instruction is Left
        - set finalPosition to be previousPosition
        - Move index -1
          <!-- - toggle actual axis -->
        - Set new orientation on finalPosition
      - if instruction is Forward increase axis + 1
        - check if final position is in boundaries or is not as lost coordinate
            <!-- - set finalPosition to be previousPosition -->
          - check world dimensions
          - increase axis on final position + 1
  - when iteration is over return final position as string
  - if a robot get lost off the grid -> set wold lost robots
