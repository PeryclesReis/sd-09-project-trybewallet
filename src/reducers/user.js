import { IS_LOGGED_IN, ADD_USER } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
  isLoggedIn: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_LOGGED_IN:
    return {
      ...state,
      isLoggedIn: action.loggedIn,
    };
  case ADD_USER:
    return {
      ...state.user,
      email: action.user,
    };
  default:
    return state;
  }
};

export default userReducer;
