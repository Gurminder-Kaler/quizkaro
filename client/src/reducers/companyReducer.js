import {
  GET_ALL_COMPANY_PARENT_CATEGORIES,
  GET_ALL_COMPANY_CATEGORIES,
  GET_ALL_COMPANIES,
  CHANGE_COMPANY_STATUS,
  ADD_COMPANY_CATEGORY,
  GET_ALL_COMPANY_CATEGORIES_VIA_PARENTID,
  GET_COMPANIES_VIA_USER_ID,
} from "../actions/types";
// import isEmpty from "../../src/validations/is-empty";

const initialState = {
  companyParentCategories: [],
  companySubCategories: [],
  companyAllCategories: [],
  category: {},
  companies: [],
  status: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMPANY_PARENT_CATEGORIES:
      console.log("action gurminder", action);
      return {
        ...state,
        companyParentCategories: action.payload.data.data,
      };
    case GET_ALL_COMPANY_CATEGORIES_VIA_PARENTID:
      console.log("action gurminder", action);
      return {
        ...state,
        companySubCategories: action.payload.data.data,
      };
    case GET_ALL_COMPANY_CATEGORIES:
      console.log("action gurminder", action);
      return {
        ...state,
        companyAllCategories: action.payload,
      };
    case GET_COMPANIES_VIA_USER_ID:
      console.log("GET_COMPANIES_VIA_USER_ID reduucer", action);
      return {
        ...state,
        companies: action.payload,
      };
    case ADD_COMPANY_CATEGORY:
      console.log("companyAllCategories", action);
      return {
        ...state,
        category: action.payload,
      };
    case GET_ALL_COMPANIES:
      console.log("getAllCompanies reducer", action);
      return {
        ...state,
        companies: action.payload,
      };
    case CHANGE_COMPANY_STATUS:
      console.log("CHANGE_COMPANY_STATUS reducer", action);
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
