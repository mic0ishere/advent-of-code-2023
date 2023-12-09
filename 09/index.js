console.time("Execution time");

const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").split("\r\n");

const completeHistories = input.map((x) => {
  const history = [x.split(" ").map((x) => parseInt(x))];
  let tempRow = [];

  while (!history[history.length - 1].every((x) => x === 0)) {
    let lastStep = history[history.length - 1];
    for (let i = 1; i < lastStep.length; i++) {
      tempRow.push(lastStep[i] - lastStep[i - 1]);
    }
    history.push(tempRow);
    tempRow = [];
  }

  return history;
});

const nextHistories = completeHistories.map((history) => {
  for (let i = history.length - 1; i > 0; i--) {
    const previousRow = history[i];
    const currentRow = history[i - 1];

    history[i - 1].push(
      previousRow[previousRow.length - 1] + currentRow[currentRow.length - 1]
    );
  }
  return history;
});

const previousHistories = completeHistories.map((history) => {
  for (let i = history.length - 1; i > 0; i--) {
    const previousRow = history[i];
    const currentRow = history[i - 1];

    history[i - 1].unshift(currentRow[0] - previousRow[0]);
  }
  return history;
});

const partOne = nextHistories.reduce(
  (acc, curr) => acc + curr[0][curr[0].length - 1],
  0
);

const partTwo = previousHistories.reduce((acc, curr) => acc + curr[0][0], 0);

console.log("Part One:", partOne);
console.log("Part Two:", partTwo);
console.timeEnd("Execution time");
