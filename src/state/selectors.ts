import { RootState } from "./reducer";

export const getSelectedCards = (state: RootState) => state.selectedCards;
export const getTable = (state: RootState) => state.table;
export const getDeck = (state: RootState) => state.deck;
export const getSetsFound = (state: RootState) => state.setsFound;
export const getWrongClicks = (state: RootState) => state.wrongClicks; 
export const getSolution = (state: RootState) => state.solution; 
export const getStartTime = (state: RootState) => state.startTime;
export const getHintVisible = (state: RootState) => state.hintVisible;
export const getActive = (state: RootState) => state.active;
