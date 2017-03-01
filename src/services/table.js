export const ROWS_NUM = 3;
export const ROW_SIZE = 4;

export const getEmptyTable = () => ({
  row1: { 1: null, 2: null, 3: null, 4: null, 5: null },
  row2: { 1: null, 2: null, 3: null, 4: null, 5: null },
  row3: { 1: null, 2: null, 3: null, 4: null, 5: null },
});

export const isSet = (cards) => {
  if (cards.length < 3) {
    return false;
  }
  const [card1, card2, card3] = cards;
  for (let i = 0; i < 4; i++) {
    if ((card1[i] === card2[i] && card2[i] === card3[i])
      || (card1[i] !== card2[i] && card2[i] !== card3[i] && card3[i] !== card1[i])) {
      continue;
    }
    return false;
  }
  return true;
};

export const findSetAsArray = (tableAsArray) => {
  for (let i = 0; i < tableAsArray.length; i++) {
    for (let j = i + 1; j < tableAsArray.length; j++) {
      for (let k = j + 1; k < tableAsArray.length; k++) {
        const set = [tableAsArray[i], tableAsArray[j], tableAsArray[k]];
        if (isSet(set)) {
          return set;
        }
      }
    }
  }
  return null;
};

const hasAnySetAsArray = (tableAsArray) => (findSetAsArray(tableAsArray) !== null);

export const isTableAsArrayReady = (tableAsArray) => (
  (tableAsArray.length >= ROW_SIZE * ROWS_NUM) && hasAnySetAsArray(tableAsArray)
);

export const tableToArray = (table) => {
  const arr = [];
  for (let i = 1; i <= 3; ++i) {
    const rowName = `row${i}`;
    for (let rowPosition = 1; rowPosition <= 5; ++rowPosition) {
      if (table[rowName][rowPosition]) {
        arr.push(table[rowName][rowPosition]);
      }
    }
  }
  return arr;
};

export const isTableReady = (table) => (isTableAsArrayReady(tableToArray(table)));

export const countCardsOnTable = (table) => (tableToArray(table).length);

export const addCardToTable = (table, card) => {
  let added = false;
  const newTable = getEmptyTable();
  for (let rowPosition = 1; rowPosition <= 5; rowPosition++) {
    for (let rowNum = 1; rowNum <= 3; rowNum++) {
      const rowName = `row${rowNum}`;
      if (!added && !table[rowName][rowPosition]) {
        newTable[rowName][rowPosition] = card;
        added = true;
      } else {
        newTable[rowName][rowPosition] = table[rowName][rowPosition];
      }
    }
  }
  return newTable;
};

export const makeTableReady = (table, deck) => {
  let nextDeckIndex = 0;
  let newTable = Object.assign({}, table);
  while (!isTableReady(newTable)) {
    const nextDeckCard = deck[nextDeckIndex++];
    if (!nextDeckCard) {
      break;
    }
    newTable = addCardToTable(newTable, nextDeckCard);
  }
  return newTable;
};

export const removeCardsFromTable = (table, cards) => {
  const newTable = getEmptyTable();
  for (let rowPosition = 1; rowPosition <= 5; rowPosition++) {
    for (let rowNum = 1; rowNum <= 3; rowNum++) {
      const rowName = `row${rowNum}`;
      if (cards.indexOf(table[rowName][rowPosition]) < 0) {
        newTable[rowName][rowPosition] = table[rowName][rowPosition];
      } else {
        newTable[rowName][rowPosition] = null;
      }
    }
  }
  return newTable;
};

export const explainSolution = (solutionAsArray) => {
  const explanationObject = {};
  ['shape', 'color', 'fill', 'number'].map(
    (key, i) => {
      explanationObject[key] = solutionAsArray[0].charAt(i) === solutionAsArray[1].charAt(i) ? 'the same' : 'different';
      return true;
    }
  );
  return explanationObject;
};

