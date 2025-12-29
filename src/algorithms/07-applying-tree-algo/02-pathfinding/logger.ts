// takes in a maze and outputs it to the console
// this logger requires your objects to be shaped like
// {
//  openedBy: number - represents who owns it, 0 meaning no one owns it yet
//                     1 means it's owned by point A and 2 means point B
//  closed: boolean  - if the node is an unpassable wall
// .length: number   - how far away the current node is from its origin
// }

import { OPENED_BY } from "./constants";

// ANSI color codes for terminal output
const COLORS = {
  RESET: '\x1b[0m',
  GRAY: '\x1b[90m',
  LIGHT_GRAY: '\x1b[37m',
  LIME: '\x1b[92m',
  HOTPINK: '\x1b[95m',
};

export function logMaze(maze) {
  console.log("================");
  let header = "XX | ";
  let subheader = "-----";
  for (let i = 0; i < maze[0].length; i++) {
    const num = i >= 10 ? i : "0" + i;
    header += `${num} `;
    subheader += "---";
  }
  console.log(header);
  console.log(subheader);
  maze.forEach((row, i) => {
    const num = i >= 10 ? i : "0" + i;
    let buffer = `${num} | `;

    row.forEach((item) => {
      if (item.closed) {
        buffer += `${COLORS.GRAY}XX ${COLORS.RESET}`;
      } else if (item.openedBy === OPENED_BY.NO_ONE) {
        buffer += `${COLORS.LIGHT_GRAY}•• ${COLORS.RESET}`;
      } else {
        const lengthStr = item.length >= 10 ? item.length : "0" + item.length;
        const color = item.openedBy === OPENED_BY.BY_A ? COLORS.LIME : COLORS.HOTPINK;
        buffer += `${color}${lengthStr} ${COLORS.RESET}`;
      }
    });

    console.log(buffer);
  });
}
