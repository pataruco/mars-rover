# Red Badger Mars Rover Challenge
## What it is?
Is code challenge built on JavaScript, Wohoo!

## Requirements
- Node >= 8.6.0

## Technologies
- [Colors 1.1.2](https://github.com/Marak/colors.js)
- [Prompt 1.0.0](https://github.com/flatiron/prompt)

## Installation
 _I am assuming you have **Node > 8.6.0** installed in your machine_

 **On your terminal console**
 - Clone this repo
     - `git@github.com:pataruco/mars-rover.git`

- Go to to folder mars-rover

  - `cd mars-rover`

- Install dependencies

  - `npm install`

## How to run it
 **On your terminal console**

- Inside mars-rover folder run
    - `npm start`

Then the programme would ask ask you for a set of instructions.

You can introduce this if you like:

**World Dimensions **

- `5 3`

** Robot 1 **

- coordinate `1 1 E`

- instructions `RFRFRFRF`

** Robot 2 **

- coordinate `3 2 N`

- instructions `FRRFLLFFRRFLL`

** Robot 3 **

- coordinate `0 3 W`

- instructions `LLFFFLFLFL`

## Testing

 **On your terminal console**
- `npm install -g mocha`

- Inside folder mars-rover
    - `npm run test`

## The problem
The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth.

You are to write a program that determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: **x-coordinate** followed by **y-coordinate**) and an orientation (**N**, **S**, **E**, **W** for north, south, east, and west).

A robot instruction is a string of the letters “**L**”, “**R**”, and “**F**” which represent, respectively, the instructions:

* **Left** : the robot turns left 90 degrees and remains on the current grid point.

* **Right** : the robot turns right 90 degrees and remains on the current grid point.

* **Forward** : the robot moves forward one grid point in the direction of the current
orientation and maintains the same orientation.
The direction **North** corresponds to the direction from grid point **(x, y)** to grid point **(x, y+1)**.

There is also a possibility that additional command types may be required in the future and provision should be made for this.

Since the grid is rectangular and bounded (...yes Mars is a strange planet), a robot that moves “**off**” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that prohibits future robots from dropping off the world at the same grid point. The scent is left at the last grid position the robot occupied before disappearing over the edge. An instruction to move “**off**” the world from a grid point from which a robot has been previously lost is simply ignored by the current robot.

### The Input
The first line of input is the upper-right coordinates of the rectangular world, the lower-left coordinates are assumed to be **0, 0**.

The remaining input consists of a sequence of robot positions and instructions (two lines per robot). A position consists of two integers specifying the initial coordinates of the robot and an orientation **(N, S, E, W)**, all separated by whitespace on one line. A robot instruction is a string of the letters “**L**”, “**R**”, and “**F**” on one line.

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the next robot begins execution.

The maximum value for any coordinate is 50.
All instruction strings will be less than 100 characters in length.

### The Output
For each robot position/instruction in the input, the output should indicate the final grid position and orientation of the robot. If a robot falls off the edge of the grid the word “**LOST**” should be printed after the position and orientation.

### Sample Input

`53` \\ *Grid dimensions*<br>
`11E` \\ *Robot 1 initial coordinates and orientation*<br>
`RFRFRFRF` \\ *Robot 1 instructions* <br>
<br>
`32N` \\ *Robot 2 initial coordinates and orientation* <br>
`FRRFLLFFRRFLL` \\ *Robot 2 instruction*s<br>
<br>
`03W` \\ *Robot 3 initial coordinates and orientation*<br>
`LLFFLFLFL` \\ *Robot 3 instructions*<br>

### Sample Output

`11E` \\ *Robot 1 coordinates after instructions*<br>
`33NLOST` \\ *Robot 2 coordinates after instructions*<br>
`23S` \\ *Robot 3 coordinates after instructions* <br>*

### Some notes
Sorry, are in *spanglish*
<br>
![Some notes](http://pataruco.s3.amazonaws.com/code-test/red-badger/red_badger_code_test_1.png)
![Another note](http://pataruco.s3.amazonaws.com/code-test/red-badger/red_badger_code_test_2.png)
