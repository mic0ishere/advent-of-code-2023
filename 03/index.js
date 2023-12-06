const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt");

const lines = input.toString().split("\n");

let partOne = 0;

for (let yAxis = 0; yAxis < lines.length; yAxis++) {
  for (let xAxis = 0; xAxis < lines[yAxis].length; xAxis++) {
    let num = `${lines[yAxis][xAxis]}`;
    if (isNaN(num)) continue;

    while (++xAxis < lines[yAxis].length) {
      const char = lines[yAxis][xAxis];
      if (isNaN(char)) break;

      num += char;
    }

    const top =
      yAxis !== 0 &&
      lines[yAxis - 1].substring(xAxis - num.length - 1, xAxis + 1);
    const bottom =
      yAxis !== lines.length - 1 &&
      lines[yAxis + 1].substring(xAxis - num.length - 1, xAxis + 1);
    const left = lines[yAxis][xAxis - num.length - 1] || "";
    const right = lines[yAxis][xAxis] || "";

    const includesSymbol = ((top || "") + (bottom || "") + right + left)
      .split("")
      .some((c) => isNaN(c) && c !== ".");
    if (includesSymbol) {
      partOne += parseInt(num);
    }
  }
}

function getPartNum(line, xAxis) {
  while (xAxis >= 0) {
    const char = line[xAxis];
    if (isNaN(char)) break;

    xAxis--;
  }

  let num = "";
  while (++xAxis < line.length) {
    const char = line[xAxis];
    if (isNaN(char)) break;

    num += char;
  }

  if (num.length === 0) return 0;

  return parseInt(num);
}

let partTwo = 0;
for (let yAxis = 0; yAxis < lines.length; yAxis++) {
  for (let xAxis = 0; xAxis < lines[yAxis].length; xAxis++) {
    const char = lines[yAxis][xAxis];
    if (char !== "*") continue;

    const top =
      (yAxis !== 0 && lines[yAxis - 1].substring(xAxis - 1, xAxis + 2)) || "";
    const bottom =
      (yAxis !== lines.length - 1 &&
        lines[yAxis + 1].substring(xAxis - 1, xAxis + 2)) ||
      "";
    const right = lines[yAxis][xAxis + 1] || "";
    const left = lines[yAxis][xAxis - 1] || "";

    const topIncludesNum = top
      .split("")
      .map((c, i) => (!isNaN(c) ? i : -1))
      .filter((x) => x > -1);
    const bottomIncludesNum = bottom
      .split("")
      .map((c, i) => (!isNaN(c) ? i : -1))
      .filter((x) => x > -1);

    let topNums =
      topIncludesNum.length > 0
        ? [getPartNum(lines[yAxis - 1], xAxis - 1 + topIncludesNum[0])]
        : [];
    let bottomNums =
      bottomIncludesNum.length > 0
        ? [getPartNum(lines[yAxis + 1], xAxis - 1 + bottomIncludesNum[0])]
        : [];

    // check if there are two numbers in the top or bottom, next to each other (like 23.48)
    if (topIncludesNum.length === 2 && isNaN(top[1])) {
      topNums = [
        getPartNum(lines[yAxis - 1], xAxis - 1 + topIncludesNum[0]),
        getPartNum(lines[yAxis - 1], xAxis - 1 + topIncludesNum[1]),
      ];
    }

    if (bottomIncludesNum.length === 2 && isNaN(bottom[1])) {
      bottomNums = [
        getPartNum(lines[yAxis + 1], xAxis - 1 + bottomIncludesNum[0]),
        getPartNum(lines[yAxis + 1], xAxis - 1 + bottomIncludesNum[1]),
      ];
    }

    const rightNum = !isNaN(right) ? getPartNum(lines[yAxis], xAxis + 1) : 0;
    const leftNum = !isNaN(left) ? getPartNum(lines[yAxis], xAxis - 1) : 0;

    const nums = [...topNums, ...bottomNums, rightNum, leftNum].filter(
      (x) => x > 1
    );

    if (nums.length === 2) partTwo += nums.reduce((acc, curr) => acc * curr, 1);
  }
}

console.log("Part one: " + partOne);
console.log("Part two: " + partTwo);
