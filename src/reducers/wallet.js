// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  SET_EXCHANGE_RATES,
  EDITE_EXPENSE,
  POST_EDITING,
} from '../actions/wallet';

const INITIAL_WALLET = {
  currencies: [],
  expenses: [],
  exchangeRates: {},
  id: 0,
  total: 0,
  isEditing: false,
  editingId: 0,
};

// colocar a logica no reducer

export default function wallet(state = INITIAL_WALLET, action) {
  let newTotal = 0;
  let newExps = [];
  switch (action.type) {
  case ADD_EXPENSE:
    action.expenses.forEach((exp) => {
      newTotal += exp.value * exp.exchangeRates[exp.currency].ask;
    });
    return { ...state, expenses: action.expenses, id: state.id + 1, total: newTotal };
  case DELETE_EXPENSE:
    newExps = state.expenses.filter((expense) => expense.id !== parseFloat(action.id));
    newExps.forEach((exp) => {
      newTotal += exp.value * exp.exchangeRates[exp.currency].ask;
    });
    return { ...state, expenses: newExps, total: newTotal };
  case POST_EDITING:
    newExps = state.expenses.map((expenses) => expenses);
    newExps[newExps.findIndex(
      (exp) => exp.id === parseFloat(state.editingId),
    )] = action.expense;
    newExps.forEach((exp) => {
      newTotal += exp.value * exp.exchangeRates[exp.currency].ask;
    });
    return { ...state, isEditing: false, expenses: newExps, total: newTotal };
  case SET_EXCHANGE_RATES:
    return {
      ...state,
      currencies: action.currencies,
      exchangeRates: action.exchangeRates,
    };
  case EDITE_EXPENSE:
    return { ...state, isEditing: true, editingId: action.id };
  default:
    return state;
  }
}
