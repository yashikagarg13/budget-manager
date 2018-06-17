import R from "ramda";
import Axios from "axios";
import Constants from "../helpers/constants";
import Utils from "../helpers/utils";
import LocalStorage from "../helpers/local-storage";

const baseUrl = "http://127.0.0.1:8080/api";

export const setPage = (page) => (dispatch) => {
  dispatch({
    type: "SET_PAGE",
    page: page,
  });
}

export const fetchExpenseEntries = (fields, filters, sortBy) => (dispatch, getState) => {
  const {expenses: state} = getState();
  const query = Utils.createQuery(state.page, Constants.perPage, filters, sortBy, fields);

  if (state.isFetching) return;

  dispatch({
    type: "FETCH_EXPENSES_REQUEST",
  });

  Axios.get(`${baseUrl}/expenseEntries?${query}`, {
    headers: Utils.getHeaders(),
  })
  .then(response => {
    const data = response.data;
    if (data.success) {
      if(R.type(data.data) == "Array" && !R.isEmpty(data.data)) {
        dispatch({
          type: state.page ? "FETCH_NEXT_PAGE_SUCCESS" : "FETCH_EXPENSES_SUCCESS",
          expenses: Utils.arrayToDict(data.data),
          message: data.message,
        });
      } else {
        dispatch({
          type: "ALL_EXPENSES_FETCHED",
        });
      }
    } else {
      LocalStorage.remove("token");
      dispatch({
        type: "FETCH_EXPENSES_FAILURE",
        message: data.message,
      });
    }
  }, (error) => {
    dispatch({
      type: "FETCH_EXPENSES_FAILURE",
      message: error.message,
    });
  });
};

/*export const deleteExpenseEntries = (where) => {
  return (dispatch, getState) {
    Axios.delete(`${baseUrl}/expenseEntries/bulk?where=${JSON.stringify(where)}`, {
      headers: Utils.getHeaders(),
    })
    .then(response => {
      const data = response.data;
      if (data.success) {
        dispatch({
          type: "DELETE_EXPENSES_SUCCESS",
          removedExpenses: data.data,
          message: data.message,
        });
      } else {
        dispatch({
          type: "DELETE_EXPENSES_FAILURE",
          message: data.message,
        });
      }
    }, (error) => {
      dispatch({
        type: "DELETE_EXPENSES_FAILURE",
        message: data.message,
      });
    });
  }
}

export const updateExpenseEntries = (where, newData) => {
  return (dispatch, getState) {
    Axios.put(`${baseUrl}/expenseEntries/bulk?where=${JSON.stringify(where)}&newData={JSON.stringify(newData)}`, {
      headers: Utils.getHeaders(),
    })
    .then(response => {
      const data = response.data;
      if (data.success) {
        dispatch({
          type: "UPDATE_EXPENSES_SUCCESS",
          expenses: data.data,
          message: data.message,
        });
      } else {
        dispatch({
          type: "UPDATE_EXPENSES_FAILURE",
          message: data.message,
        });
      }
    }, (error) => {
      dispatch({
        type: "UPDATE_EXPENSES_FAILURE",
        message: data.message,
      });
    });
  }
}*/

