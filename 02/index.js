const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt");

const games = input
  .toString()
  .replaceAll("\r", "")
  .split("\n")
  .map((x) => ({
    gameId: parseInt(x.split(": ")[0].replace("Game ", "")),
    plays: x
      .split(": ")[1]
      .split("; ")
      .map((x) => x.split(", ").map((a) => a.split(" "))),
  }));

const colorCaps = {
  red: 12,
  green: 13,
  blue: 14,
};

let gameSum = 0;
let powerSum = 0;
for (const game of games) {
  let colorCapExceeded = false;
  const lowestColorCount = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const set of game.plays) {
    for (const play of set) {
      const color = play[1];
      const number = parseInt(play[0]);

      if (number > colorCaps[color]) {
        colorCapExceeded = true;
      }

      if (number > lowestColorCount[color]) {
        lowestColorCount[color] = number;
      }
    }
  }

  if (!colorCapExceeded) {
    gameSum += game.gameId;
  }

  powerSum += lowestColorCount.red * lowestColorCount.green * lowestColorCount.blue;
}

console.log("Part One:", gameSum);
console.log("Part Two:", powerSum);
