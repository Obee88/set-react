import { getNewShuffledDeck, removeNTopCards } from '../../services/deck';
import { tableToArray, findSetAsArray, getEmptyTable, isSet, removeCardsFromTable, makeTableReady, countCardsOnTable } from '../../services/table';

const initialState = {
  table: getEmptyTable(),
  selectedCards: [],
  deck: getNewShuffledDeck(),
  indicatorValue: null,
  solution: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fillTable': {
      const { table, deck } = state;
      const readyTable = makeTableReady(table, deck);
      const readyDeck = removeNTopCards(deck, countCardsOnTable(readyTable) - countCardsOnTable(table));
      return Object.assign({}, state, { table: readyTable, deck: readyDeck });
    }

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
            return Object.assign({}, state, { selectedCards: newSelectedCards, indicatorValue: false });
          }

          // Set discovered
          const tableAfterSetRemoved = removeCardsFromTable(table, newSelectedCards);
          const readyTable = makeTableReady(tableAfterSetRemoved, deck);
          const readyDeck = removeNTopCards(deck, countCardsOnTable(readyTable) - countCardsOnTable(tableAfterSetRemoved));
          newSelectedCards = [];
          return Object.assign({}, state, { table: readyTable, deck: readyDeck, selectedCards: newSelectedCards, indicatorValue: true, solution: [] });
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
      const tableAsArray = tableToArray(state.table);
      const set = findSetAsArray(tableAsArray);
      return Object.assign({}, state, { solution: set });
    }

    case 'clearIndicatorValue': {
      return Object.assign({}, state, { indicatorValue: null });
    }

    default:
      return state;

  }
};

export default reducer;

