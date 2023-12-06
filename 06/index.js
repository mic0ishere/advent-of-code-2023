console.time("Execution time");

const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").split("\r\n");

const times = input[0].split(" ").filter((x) => !isNaN(x) && x !== "");

const races = input[1]
  .split(" ")
  .filter((x) => !isNaN(x) && x !== "")
  .map((x, i) => ({
    time: parseInt(times[i]),
    distance: parseInt(x),
  }));

const racePartTwo = input.map((x) => x.split(":")[1].replaceAll(" ", ""));

const calculateRace = (race) => {
  const distances = new Array(race.time)
    .fill(0)
    .map((_, i) => i * (race.time - i));

  return distances.filter((x) => x > race.distance).length;
};

const partOne = races.reduce((acc, race) => acc * calculateRace(race), 1);

const partTwo = calculateRace({
  time: parseInt(racePartTwo[0]),
  distance: parseInt(racePartTwo[1]),
});

console.log("Part One:", partOne);
console.log("Part Two:", partTwo);
console.timeEnd("Execution time");