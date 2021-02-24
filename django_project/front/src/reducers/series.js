import { handleActions } from 'redux-actions';
import { GET_SERIES_LIST_DATA, GET_SERIA_DATA } from '../actions/series';


export const initialState = {
  seriesList: null,
  seriaData: null
  
}


const reducer = handleActions({
  [GET_SERIES_LIST_DATA]: (state, { payload }) => {

    return {
      ...state,
      seriesList: payload,
    }
  },
  [GET_SERIA_DATA]: (state, { payload }) => {
    return {
      ...state,
      seriaData: payload,
    }
  }

}, initialState);

export default reducer;
