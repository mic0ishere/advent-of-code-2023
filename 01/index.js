const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt");

function countFromLines(lines) {
  return lines
    .map((x) => x.split("").filter((x) => parseInt(x) >= 0))
    .map((x) => `${x[0]}${x[x.length - 1]}`)
    .reduce((acc, curr) => acc + parseInt(curr), 0);
}

const linesOne = input.toString().replaceAll("\r", "").split("\n");
const partOne = countFromLines(linesOne);

const numberDictionary = {
  eighthree: 83,
  sevenine: 79,
  twone: 21,
  oneight: 18,
  fiveight: 58,
  nineight: 98,
  eightwo: 82,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let linesTwo = input.toString().replaceAll("\r", "")
for (const dictionary of Object.entries(numberDictionary)) {
  linesTwo = linesTwo.replaceAll(dictionary[0], dictionary[1]);
}

const partTwo = countFromLines(linesTwo.split("\n"));

console.log("Part One:", partOne);
console.log("Part Two:", partTwo);
