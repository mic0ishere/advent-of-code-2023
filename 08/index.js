console.time("Execution time");

const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").split("\r\n");

const instruction = input[0].split("");
const nodes = Object.fromEntries(
  input.slice(2).map((x) => [
    x.split(" ")[0],
    {
      L: x.split("(")[1].split(", ")[0],
      R: x.split("(")[1].split(", ")[1].replace(")", ""),
    },
  ])
);

let nodeResults = [];
for (const node of Object.keys(nodes).filter((x) => x.endsWith("A"))) {
  let currentNode = node;
  let result = 0;
  while (!currentNode.endsWith("Z")) {
    currentNode = nodes[currentNode][instruction[result % instruction.length]];
    result++;
  }

  nodeResults.push([node, result]);
}

const greatestDivisor = (a, b) => (a ? greatestDivisor(b % a, a) : b);

const lowestMultiple = (a, b) => (a * b) / greatestDivisor(a, b);

const partOne = nodeResults.find((x) => x[0] === "AAA")[1];
const partTwo = nodeResults
  .map((x) => x[1])
  .reduce((acc, curr) => lowestMultiple(acc, curr), 1);

console.log("Part One:", partOne);
console.log("Part Two:", partTwo);
console.timeEnd("Execution time");
