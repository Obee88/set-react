import { get, set } from "lodash";

export const ROWS_NUM = 3;
export const MIN_ROW_SIZE = 4;
const MAX_ROW_SIZE = 6;

export type Row = {
  1: string | null,
  2: string | null,
  3: string | null,
  4: string | null,
  5: string | null,
  6: string | null,
};

export type Table = {
  row1: Row,
  row2: Row,
  row3: Row,
};

export const getEmptyTable = (): Table => ({
  row1: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null },
  row2: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null },
  row3: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null },
});

export const isSet = (cards: string[]) => {
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

export const findSetAsArray = (tableAsArray: string[]) => {
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

const hasAnySetAsArray = (tableAsArray: string[]) => (findSetAsArray(tableAsArray) !== null);

export const isTableAsArrayReady = (tableAsArray: string[]) => (
  (tableAsArray.length >= MIN_ROW_SIZE * ROWS_NUM) && hasAnySetAsArray(tableAsArray)
);

export const tableToArray = (table: Table): string[] => {
  const arr = [];
  for (let i = 1; i <= ROWS_NUM; ++i) {
    const rowName = `row${i}`;
    for (let rowPosition = 1; rowPosition <= MAX_ROW_SIZE; ++rowPosition) {
      const card = get(table, [rowName, rowPosition]);
      if (card) {
        arr.push(card);
      }
    }
  }
  return arr;
};

export const isTableReady = (table: Table) => (isTableAsArrayReady(tableToArray(table)));

export const countCardsOnTable = (table: Table) => (tableToArray(table).length);

export const addCardToTable = (table: Table, card: string) => {
  let added = false;
  const newTable = getEmptyTable();
  for (let rowPosition = 1; rowPosition <= MAX_ROW_SIZE; rowPosition++) {
    for (let rowNum = 1; rowNum <= ROWS_NUM; rowNum++) {
      const rowName = `row${rowNum}`;
      if (!added && !get(table, [rowName, rowPosition])) {
        set(newTable, [rowName, rowPosition], card);
        added = true;
      } else {
        set(newTable, [rowName, rowPosition], get(table, [rowName, rowPosition]));
      }
    }
  }
  return newTable;
};

export const makeTableReady = (table: Table, deck: string[]) => {
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

export const removeCardsFromTable = (table: Table, cards: string[]) => {
  const newTable = getEmptyTable();
  for (let rowPosition = 1; rowPosition <= MAX_ROW_SIZE; rowPosition++) {
    for (let rowNum = 1; rowNum <= ROWS_NUM; rowNum++) {
      const rowName = `row${rowNum}`;
      if (cards.indexOf(get(table, [rowName, rowPosition])) < 0) {
        set(newTable, [rowName, rowPosition], get(table, [rowName, rowPosition]));
      } else {
        set(newTable, [rowName, rowPosition], null);
      }
    }
  }
  return newTable;
};

export type ExplanationObject = {
  shape: string,
  color: string,
  fill: string,
  number: string,
};

export const explainSolution = (solutionAsArray: string[]) => {
  const explanationObject = {} as ExplanationObject;
  ['shape', 'color', 'fill', 'number'].map(
    (key, i) => {
      set(explanationObject, [key], solutionAsArray[0].charAt(i) === solutionAsArray[1].charAt(i) ? 'the same' : 'different');
      return true;
    }
  );
  return explanationObject as ExplanationObject;
};

