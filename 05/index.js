const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const lines = input.replaceAll("\r", "").split("\n\n");

const seeds = lines
  .shift()
  .replace("seeds: ", "")
  .split(" ")
  .map((x) => parseInt(x));
const maps = lines.map((x) => {
  const lines = x.split("\n");
  const title = lines.shift().split(" ")[0].split("-to-");
  return {
    source: title[0],
    target: title[1],
    ranges: lines.map((x) => {
      const range = parseInt(x.split(" ")[2]);
      return {
        sourceStart: parseInt(x.split(" ")[1]),
        sourceEnd: parseInt(x.split(" ")[1]) + range - 1,
        targetStart: parseInt(x.split(" ")[0]),
        targetEnd: parseInt(x.split(" ")[0]) + range - 1,
        rangeChange: parseInt(x.split(" ")[0]) - parseInt(x.split(" ")[1]),
      };
    }),
  };
});

const partOne = seeds.reduce((acc, seed) => {
  let currentValue = seed;
  for (const map of maps) {
    for (const range of map.ranges) {
      if (
        currentValue >= range.sourceStart &&
        currentValue <= range.sourceEnd
      ) {
        currentValue = currentValue + range.rangeChange;
        break;
      }
    }
  }

  return acc > currentValue ? currentValue : acc;
}, Infinity);

const seedsPairs = seeds
  .map((_, i) => i)
  .filter((x) => x % 2 === 0)
  .map((x) => [seeds[x], seeds[x] + seeds[x + 1]]);

let partTwo = Infinity;
// i know this is a horrible, unperformant way to do it (execution on my machine took exactly 3 minutes), but it works and gave a correct answer first-time
for (const [seedStart, seedEnd] of seedsPairs) {
  for (let i = seedStart; i <= seedEnd; i++) {
    let currentValue = i;
    for (const map of maps) {
      for (const range of map.ranges) {
        if (
          currentValue >= range.sourceStart &&
          currentValue <= range.sourceEnd
        ) {
          currentValue = currentValue + range.rangeChange;
          break;
        }
      }
    }

    if (currentValue < partTwo) partTwo = currentValue;
  }
}

console.log("Part One:", partOne);
console.log("Part Two:", partTwo);
