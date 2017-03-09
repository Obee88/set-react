export const startGame = () => ({ type: 'startGame' });
export const endGame = () => ({ type: 'endGame' });
export const fillTable = (data) => ({ type: 'fillTable', data });
export const selectDeselectCard = (data) => ({ type: 'selectDeselectCard', data });
export const clearIndicatorValue = (data) => ({ type: 'clearIndicatorValue', data });
export const requestHint = () => ({ type: 'requestHint' });
