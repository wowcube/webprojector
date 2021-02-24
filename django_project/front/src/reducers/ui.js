import { handleActions } from 'redux-actions';
import { CHANGE_NUM } from '../actions/ui';


export const initialState = {
  color: 'white',
  num: 0,
}


const reducer = handleActions({
  [CHANGE_NUM]: (state, { payload }) => {

    return {
      ...state,
      num: payload,
    }
  }
}, initialState);

export default reducer;
