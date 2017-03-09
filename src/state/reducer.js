import { getNewShuffledDeck, removeNTopCards, removeGreenFromDeck } from '../services/deck';
import { tableToArray, findSetAsArray, getEmptyTable, isSet, removeCardsFromTable, makeTableReady, countCardsOnTable } from '../services/table';

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

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'selectDeselectCard': {
      const { table, selectedCards, deck } = state;
      if (selectedCards.indexOf(action.data) < 0) {
        // Select card
        if (selectedCards.length === 3) {
          return state;
        }
        let newSelectedCards = [...selectedCards, action.data];
        if (newSelectedCards.length === 3) {
          // Set possibility
          if (!isSet(newSelectedCards)) {
            newSelectedCards = [];
            return Object.assign(
              {},
              state,
              {
                selectedCards: newSelectedCards,
                indicatorValue: false,
                wrongClicks: state.wrongClicks + 1,
              });
          }

          // Set discovered
          const tableAfterSetRemoved = removeCardsFromTable(table, newSelectedCards);
          const readyTable = makeTableReady(tableAfterSetRemoved, deck);
          const readyDeck = removeNTopCards(deck, countCardsOnTable(readyTable) - countCardsOnTable(tableAfterSetRemoved));
          const tableAsArray = tableToArray(readyTable);
          const set = findSetAsArray(tableAsArray);
          newSelectedCards = [];
          return Object.assign(
            {},
            state,
            {
              table: readyTable,
              deck: readyDeck,
              selectedCards: newSelectedCards,
              indicatorValue: true,
              hintVisible: false,
              solution: set,
              setsFound: state.setsFound + 1,
            });
        }
        return Object.assign({}, state, { selectedCards: newSelectedCards });
      }
      // Deselect Card
      if (selectedCards.length === 0) {
        return state;
      }
      const index = selectedCards.indexOf(action.data);
      const newSelectedCards = [...selectedCards.slice(0, index), ...selectedCards.slice(index + 1)];
      return Object.assign({}, state, { selectedCards: newSelectedCards });
    }

    case 'requestHint': {
      return Object.assign({}, state, { hintVisible: true });
    }

    case 'clearIndicatorValue': {
      return Object.assign({}, state, { indicatorValue: null });
    }

    case 'startGame': {
      const [table, deck] = [getEmptyTable(), getNewShuffledDeck()];
      const readyTable = makeTableReady(table, deck);
      const readyDeck = removeNTopCards(deck, countCardsOnTable(readyTable) - countCardsOnTable(table));
      const tableAsArray = tableToArray(readyTable);
      const set = findSetAsArray(tableAsArray);
      const tableState = { table: readyTable, deck: readyDeck, solution: set };

      return Object.assign({}, initialState, { active: true, startTime: new Date().getTime() }, tableState);
    }

    case 'endGame': {
      return Object.assign({}, state, { active: false, endTime: new Date().getTime() });
    }

    // hack for test purposes
    case 'shortenDeck': {
      return Object.assign({}, state, { deck: removeNTopCards(state.deck, 23) });
    }

    // hack for test purposes
    case 'removeGreenFromDeck': {
      return Object.assign({}, state, { deck: removeGreenFromDeck(state.deck) });
    }

    default:
      return state;
  }
};

export default reducer;
