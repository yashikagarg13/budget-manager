/*
const state = {
  expenses: {
    listById: {
    }
    listByFilter: {
      all:
      cal2017:
      fy2017:
      cal2017Q1:
      fy2017Q1:
      march2017:
    },
  },
  categories: {
    listById:
    isLoading:
    isError:
  },
  alert: {},
}*/

/*
  {
    expenses: {
      entities,
      isFetching,
      errorMessage,
      paginate
    }
  }
*/

import {combineReducers} from "redux";
import expenses from "./expenses";

const bm = combineReducers({
  expenses,
});

export default bm;