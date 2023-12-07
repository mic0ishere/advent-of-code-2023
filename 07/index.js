console.time("Execution time");

const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").split("\r\n");

const cardOrder = "A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2".split(", ");

// types:
// - five of a kind - 6
// - four of a kind - 5
// - full house - 4
// - three of a kind - 3
// - two pairs - 2
// - one pair - 1
// - high card - 0

const getHandType = (cards) => {
  if (cards.length === 1 || cards.length === 0) return 6;
  if (cards.length === 2 && cards[1] === 1) return 5;
  if (cards.length === 2) return 4;
  if (cards.length === 3 && cards[1] === 1) return 3;
  if (cards.length === 3) return 2;
  if (cards.length === 4) return 1;
  return 0;
};

const compareCards = (a, b, order = cardOrder) => {
  for (let i = 0; i < 5; i++) {
    if (a[i] === b[i]) continue;

    return order.indexOf(b[i]) - order.indexOf(a[i]);
  }
};

const hands = input.map((x) => {
  const [deck, value] = x.split(" ");
  const cards = deck.split("");
  const orderedCards = cardOrder
    .map((card) => [cards.filter((x) => x === card).length, card])
    .filter((x) => x[0] > 0)
    .sort((a, b) => b[0] - a[0]);

  return {
    hand: cards,
    type: getHandType(orderedCards.map((x) => x[0])),
    typeWithJokers: getHandType(
      orderedCards.filter((x) => x[1] !== "J").map((x) => x[0])
    ),
    value: parseInt(value),
  };
});

const partOne = hands
  .sort((a, b) =>
    a.type !== b.type ? a.type - b.type : compareCards(a.hand, b.hand)
  )
  .reduce((acc, hand, i) => (acc += (i + 1) * hand.value), 0);

const partTwo = hands
  .sort((a, b) =>
    a.typeWithJokers !== b.typeWithJokers
      ? a.typeWithJokers - b.typeWithJokers
      : compareCards(a.hand, b.hand, [
          ...cardOrder.filter((x) => x !== "J"),
          "J",
        ])
  )
  .reduce((acc, hand, i) => (acc += (i + 1) * hand.value), 0);

console.log("Part One:", partOne);
console.log("Part Two:", partTwo);
console.timeEnd("Execution time");
