import R from "ramda";
import {combineReducers} from "redux";

import Constants from "../helpers/constants";

const entities = (state = {}, action) => {
  switch(action.type) {
    case "FETCH_EXPENSES_SUCCESS":
      return action.expenses;
    case "FETCH_NEXT_PAGE_SUCCESS":
      return {
        ...state,
        ...action.expenses,
      }
    default: return state;
  }
};

const ids = (state = [], action) => {
  switch(action.type) {
    case "FETCH_EXPENSES_SUCCESS":
      return R.keys(action.expenses);
    case "FETCH_NEXT_PAGE_SUCCESS":
      return [
        ...state,
        ...R.keys(action.expenses),
      ];
    default:
      return state;
  }
};

const page = (state = 0, action) => {
  switch(action.type) {
    case "SET_PAGE":
      return action.page;
    default:
      return state;
  };
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case "FETCH_EXPENSES_REQUEST":
      return true;
    case "FETCH_EXPENSES_SUCCESS":
    case "FETCH_EXPENSES_FAILURE":
      return false;
    default:
      return state;
  };
};

const allFetched = (state = false, action) => {
  switch(action.type) {
    case "ALL_EXPENSES_FETCHED":
      return true;
    default:
      return state;
  };
};

const expenses = combineReducers({
  entities,
  ids,
  page,
  isFetching,
  allFetched,
});

export default expenses;

// Selectors

export const getIds = (state) => R.prop("ids", state);
export const getExpenseById = (state, id) => R.prop(id, state.entities);
export const getExpenses = (state) => {
  const ids = getIds(state);
  return ids.map(id => getExpenseById(state, id));
}
export const getIsFetching = (state) => R.prop("isFetching", state);
export const getPage = (state) => R.prop("page", state);
export const getAllFetched = (state) => R.prop("allFetched", state);