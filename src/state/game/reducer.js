
const initialState = {
  startTime: null,
  active: false,
  endTime: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'startGame': {
      return Object.assign({}, state, { active: true, startTime: new Date().getTime() });
    }
    case 'endGame': {
      return Object.assign({}, state, { active: false, endTime: new Date().getTime() });
    }
    default:
      return state;
  }
};

export default reducer;
