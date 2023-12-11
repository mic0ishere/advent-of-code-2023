console.time("Execution time");

const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/input.txt", "utf-8")
  .split("\r\n")
  .map((x) => x.split(""));

let expandedCols = new Array(input[0].length).fill(0).map((_, i) => i);
let expandedRows = [];
let galaxyNum = 0;

const galaxies = [];

const table = input
  // galaxy expansion - rows
  .map((row, i) => {
    expandedCols = expandedCols.filter((col) =>
      row
        .map((x, i) => [x, i])
        .filter((x) => x[0] === ".")
        .map((x) => x[1])
        .includes(col)
    );

    if (!row.every((x) => x === ".")) return row;

    expandedRows.push(i);
    return row;
  });

for (let row = 0; row < table.length; row++) {
  for (let col = 0; col < table[row].length; col++) {
    if (table[row][col] === "#")
      galaxies.push({
        num: ++galaxyNum,
        row,
        col,
      });
  }
}

const galaxyPairs = [];
while (galaxies.length > 0) {
  const galaxy = galaxies.shift();
  galaxyPairs.push(...galaxies.map((x) => [galaxy, x]));
}

let partOne = 0;
let partTwo = 0;

for (const pair of galaxyPairs) {
  const rowExpansions = expandedRows.filter(
    (x) =>
      Math.min(pair[0].row, pair[1].row) < x &&
      Math.max(pair[0].row, pair[1].row) > x
  ).length;
  const colExpansions = expandedCols.filter(
    (x) =>
      Math.min(pair[0].col, pair[1].col) < x &&
      Math.max(pair[0].col, pair[1].col) > x
  ).length;

  const rowDist = Math.abs(pair[0].row - pair[1].row);
  const colDist = Math.abs(pair[0].col - pair[1].col);
  partOne += rowDist + colDist + rowExpansions + colExpansions;
  partTwo +=
    rowDist + colDist + (1000000 - 1) * (rowExpansions + colExpansions);
}

console.log("Part One:", partOne);
console.log("Part Two:", partTwo);
console.timeEnd("Execution time");
