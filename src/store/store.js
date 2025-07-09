import { createStore } from "https://cdn.jsdelivr.net/npm/redux@4.2.1/es/redux.mjs";

const initialState = {
  employees: JSON.parse(localStorage.getItem("employees")) || [],
};
const ADD_EMPLOYEE = "ADD_EMPLOYEE";
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      const updatedEmployees = [...state.employees, action.payload];
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      return {
        ...state,
        employees: updatedEmployees,
      };
    default:
      return state;
  }
};
export const store = createStore(reducer);
export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee,
});
