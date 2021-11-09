import { createReducer, PayloadAction } from 'typesafe-actions';
import {
  getNewShuffledDeck,
  removeNTopCards,
} from '../services/deck';
import {
  tableToArray,
  findSetAsArray,
  getEmptyTable,
  isSet,
  removeCardsFromTable,
  makeTableReady,
  countCardsOnTable,
} from '../services/table';
import {
  CLEAR_INDICATOR_VALUE,
  END_GAME,
  REQUEST_HINT,
  START_GAME,
  TOGGLE_CARD_SELECTED,
} from './actions';

export interface RootState {
  table: any,
  selectedCards: string[],
  deck: string[],
  solution: string[],
  hintVisible: boolean,
  setsFound: number,
  wrongClicks: number,
  startTime: number | null,
  active: boolean,
  endTime: number | null,
};

const initialState = {
  table: getEmptyTable(),
  selectedCards: [],
  deck: getNewShuffledDeck(),
  indicatorValue: null,
  solution: [],
  hintVisible: false,
  setsFound: 0,
  wrongClicks: 0,
  startTime: null,
  active: false,
  endTime: null,
};

const reducer = createReducer<RootState>(initialState)
  .handleType(START_GAME, (state: RootState) => {
    const table = getEmptyTable();
    const deck = getNewShuffledDeck();
    const readyTable = makeTableReady(table, deck);
    const readyDeck = removeNTopCards(deck, countCardsOnTable(readyTable) - countCardsOnTable(table));
    const tableAsArray = tableToArray(readyTable);
    const set = findSetAsArray(tableAsArray);
    return ({
      ...state,
      table: readyTable,
      deck: readyDeck,
      solution: set,
      active: true,
      startTime: new Date().getTime(),
    })
  })
  .handleType(TOGGLE_CARD_SELECTED, (state: RootState, action: PayloadAction<string, string>) => {
    const { table, selectedCards, deck } = state;
    const card = action.payload;
    if (selectedCards.indexOf(card) < 0) {
      // Select card
      if (selectedCards.length === 3) {
        return state;
      }
      let newSelectedCards = [...selectedCards, card];
      if (newSelectedCards.length === 3) {
        // Set possibility
        if (!isSet(newSelectedCards)) {
          newSelectedCards = [];
          return {
            ...state,
            selectedCards: newSelectedCards,
            indicatorValue: false,
            wrongClicks: state.wrongClicks + 1,
          };
        }

        // Set discovered
        const tableAfterSetRemoved = removeCardsFromTable(table, newSelectedCards);
        const readyTable = makeTableReady(tableAfterSetRemoved, deck);
        const readyDeck = removeNTopCards(deck, countCardsOnTable(readyTable) - countCardsOnTable(tableAfterSetRemoved));
        const tableAsArray = tableToArray(readyTable);
        const set = findSetAsArray(tableAsArray);
        newSelectedCards = [];
        return {
          ...state,
          table: readyTable,
          deck: readyDeck,
          selectedCards: newSelectedCards,
          indicatorValue: true,
          hintVisible: false,
          solution: set,
          setsFound: state.setsFound + 1,
        };
      }
      return {
        ...state,
        selectedCards: newSelectedCards,
      };
    }
    // Deselect Card
    if (selectedCards.length === 0) {
      return state;
    }
    const index = selectedCards.indexOf(card);
    const newSelectedCards = [...selectedCards.slice(0, index), ...selectedCards.slice(index + 1)];
    return {
      ...state,
      selectedCards: newSelectedCards
    };
  })
  .handleType(REQUEST_HINT, (state: RootState) => ({
    ...state,
    hintVisible: true,
  }))
  .handleType(CLEAR_INDICATOR_VALUE, (state: RootState) => ({
    ...state,
    indicatorValue: true,
  }))
  .handleType(END_GAME, (state: RootState) => ({
    ...state,
    active: false,
    endTime: new Date().getTime(),
  }));

export default reducer;
