import { action } from "typesafe-actions";

export const START_GAME = 'START_GAME';
export const startGame = () => action(START_GAME);

export const END_GAME = 'END_GAME';
export const endGame = () => action(END_GAME);

export const FILL_TABLE = 'FILL_TABLE';
export const fillTable = (data: string[]) => action(FILL_TABLE, data);

export const TOGGLE_CARD_SELECTED = 'TOGGLE_CARD_SELECTED';
export const toggleCardSelected = (data: string) => action(TOGGLE_CARD_SELECTED, data);

export const CLEAR_INDICATOR_VALUE = 'CLEAR_INDICATOR_VALUE'
export const clearIndicatorValue = (data: boolean) => action(CLEAR_INDICATOR_VALUE, data);

export const REQUEST_HINT = 'REQUEST_HINT';
export const requestHint = () => action(REQUEST_HINT);
