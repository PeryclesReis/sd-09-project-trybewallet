import { EXPENSE_SAVE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSE_SAVE:
    return { ...state, expenses: [...state.expenses, action.expenseDetails] };
  default:
    return state;
  }
}

export default wallet;
