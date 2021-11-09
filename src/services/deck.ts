const shapes = ['C', 'R', 'T'];
const colors = ['R', 'G', 'B'];
const fills = ['E', 'F', 'S'];
const numbers = ['1', '2', '3'];

const shuffle = (arr: string[]) => {
  const a = arr;
  for (let i = a.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
};

const getNewOrderedDeck = (): string[] => {
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
};

export const getNewShuffledDeck = () => (
  shuffle(getNewOrderedDeck())
);

export const removeNTopCards = (deck: string[], n: number): string[] => ([...deck.slice(n)]);

export const removeGreenFromDeck = (deck: string[]) => (deck.filter(
  (element) => (element.charAt(1) !== 'G' && element.charAt(0) === 'C')
));
