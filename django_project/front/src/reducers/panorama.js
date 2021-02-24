import { handleActions } from 'redux-actions';
import { GET_PANORAMA_LIST_DATA } from '../actions/panorama';


export const initialState = {
  panoramaData: null,
}


const reducer = handleActions({
  [GET_PANORAMA_LIST_DATA]: (state, { payload }) => {

    return {
      ...state,
      panoramaData: payload,
    }
  }
}, initialState);

export default reducer;
