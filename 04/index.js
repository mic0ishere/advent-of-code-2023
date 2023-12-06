console.time("Execution time");

const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt");

const cards = input
  .toString()
  .replaceAll("\r", "")
  .split("\n")
  .map((card) => ({
    card: parseInt(card.replace("Card ", "").split(": ")[0]),
    winning: card
      .split(": ")[1]
      .split(" | ")[0]
      .split(" ")
      .filter((x) => x.length > 0)
      .map((x) => parseInt(x)),
    hand: card
      .split(": ")[1]
      .split(" | ")[1]
      .split(" ")
      .filter((x) => x.length > 0)
      .map((x) => parseInt(x)),
  }));

const partOne = cards.reduce((acc, current) => {
  const winningAtHand = current.hand.filter((x) => current.winning.includes(x));
  return (
    acc + (winningAtHand.length > 0 ? Math.pow(2, winningAtHand.length - 1) : 0)
  );
}, 0);

const copies = cards.map(() => 1);

const partTwo = cards.reduce((acc, current, index) => {
  const winningAtHand = current.hand.filter((x) => current.winning.includes(x));

  for (let i = winningAtHand.length; i > 0; i--) {
    copies[index + i] += copies[index];
  }

  return acc + copies[index];
}, 0);

console.log("Part One:", partOne);
console.log("Part Two:", partTwo);
console.timeEnd("Execution time");
