const shapes = ['C', 'R', 'T'];
const colors = ['R', 'G', 'B'];
const fills = ['E', 'F', 'S'];
const numbers = ['1', '2', '3'];

/**
 * Shuffles array in place. ES6 version
 * Taken from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param {Array} a items The array containing the items.
 */
function shuffle(arr) {
  const a = arr;
  for (let i = a.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

function getNewOrderedDeck() {
  const deck = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          deck.push(shapes[i] + colors[j] + fills[k] + numbers[l]);
        }
      }
    }
  }
  return deck;
}

export const getNewShuffledDeck = () => (
  shuffle(getNewOrderedDeck())
);

export const removeNTopCards = (deck, n) => ([...deck.slice(n)]);
