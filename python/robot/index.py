
from typing import Self, Dict, List

from attr import dataclass

@dataclass
class Robot:
    position: Dict[str, str]
    instructions: List[str]
    dimensions: Dict[str, str]



    def move(self):
        for instruction in self.instructions: 
          match instruction:
              case 'r':
                  self.position["orientation"] = self.check_rudder('r', self.position["orientation"])
              case 'l':
                  self.position["orientation"] = self.check_rudder('l', self.position["orientation"])
              case 'f':
                  print("forward")

          print({
            "instruction": instruction,
            "position": self.position
          })
        

    def check_rudder(instruction, orientation):
        rudder = ['n', 'e', 's', 'w']

        index = rudder.index(orientation)

        if instruction == 'r':
          index = rudder.indexOf(orientation) + 1;
        if instruction == 'l':
          index = rudder.indexOf(orientation) - 1;
    
        if index > 3:
           return rudder[0]
        if index < 0:
           return rudder[3]
        
        return rudder[index]

                  



robot = Robot(
    instructions=['r', 'f', 'r', 'f', 'r', 'f', 'r', 'f'], 
    dimensions='', 
    position={
      "x": 1,
      "y": 1,
      "orientation" : 'e',
      }
    )


robot.move()
