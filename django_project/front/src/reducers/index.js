import { combineReducers } from 'redux';
import uiReducer, { initialState as uiInitialState } from './ui';
import loginReducer, { initialState as loginInitialState } from './login';
import seriesReducer, { initialState as seriesInitialState } from './series';
import panoramaReducer, { initialState as panoramaInitialState } from './panorama';



export const initialState = {
  ui: uiInitialState,
  auth: loginInitialState,
  series: seriesInitialState,
  panorama: panoramaInitialState,
}

const reducers = {
  ui: uiReducer,
  auth: loginReducer,
  series: seriesReducer,
  panorama: panoramaReducer,
}


export const rootReducer = combineReducers(reducers);