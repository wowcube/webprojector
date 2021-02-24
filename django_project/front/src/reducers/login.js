import { handleActions } from 'redux-actions';
import { LOGIN_SET_USER_DATA } from '../actions/login';


export const initialState = {
  userData: null,
}


const reducer = handleActions({
  [LOGIN_SET_USER_DATA]: (state, { payload }) => {

    return {
      ...state,
      userData: payload,
    }
  }
}, initialState);

export default reducer;
