import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GET_ALL_COMPANY_PARENT_CATEGORIES,
  GET_ALL_COMPANY_CATEGORIES,
  GET_ALL_COMPANY_CATEGORIES_VIA_PARENTID,
  ADD_COMPANY,
  ADD_COMPANY_CATEGORY,
  GET_ALL_COMPANIES,
  CHANGE_COMPANY_STATUS,
  GET_COMPANIES_VIA_USER_ID,
  GET_ERRORS,
} from "./types";

import { API_URL } from "../common/Constant";

// get company categories which are parents
export const getAllCompanyParentCategories = () => (dispatch) => {
  axios
    .post(API_URL + "/company/getAllCompanyParentCategories")
    .then((result) => {
      dispatch(getAllCompanyParentCategoriesAction(result));
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};
// get company categories which are child of specific parent
export const getAllCompanyCategoriesViaParentId = (id) => (dispatch) => {
  console.log("pos t id", id);
  let send = {
    parentId: id,
  };
  axios
    .post(API_URL + "/company/getAllCompanyCategoriesViaParentId", send)
    .then((result) => {
      dispatch(getAllCompanyCategoriesViaParentIdAction(result));
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};

// GET_ALL_COMPANIES
export const getAllCompanies = () => (dispatch) => {
  axios
    .post(API_URL + "/company/getAllCompanies")
    .then((result) => {
      dispatch(getAllCompaniesAction(result));
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};
// changeCompanyStatus
export const changeCompanyStatus = (data) => (dispatch) => {
  console.log("data sennding", data);
  axios
    .post(API_URL + "/company/changeCompanyStatus", data)
    .then((result) => {
      dispatch(changeCompanyStatusAction(result));
      toast.success("Status changed successfully", { autoClose: 2300 });
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};

// get all companies
export const getAllCompanyCategories = () => (dispatch) => {
  axios
    .post(API_URL + "/company/getAllCompanyCategories")
    .then((result) => {
      dispatch(getAllCompanyCategoriesAction(result));
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};
// get all companies via user Id
export const getCompaniesViaUserId = () => (dispatch) => {
  axios
    .post(API_URL + "/company/getCompaniesViaUserId")
    .then((result) => {
      dispatch(getCompaniesViaUserIdAction(result));
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};

export const addCompany = (payload) => (dispatch) => {
  console.log("payload addCompany", payload);

  let formData = new FormData();
  if (payload.image && payload.image !== "") {
    formData.append("image", payload.image, payload.image.name);
  }

  if (payload.coverImage && payload.coverImage !== "") {
    formData.append("coverImage", payload.coverImage, payload.coverImage.name);
  }
  formData.append("name", payload.name);
  formData.append("about", payload.about);
  formData.append("category", payload.category);
  formData.append("status", payload.status);

  axios
    .post(API_URL + "/company/addCompany", formData)
    .then((result) => {
      console.log("result addcompany Category", result);
      if (result.data && result.data.success) {
        dispatch(addCompanyAction(result));
        toast.success(result.data.message, { autoClose: 2300 });

        dispatch(getAllCompanyCategories(dispatch));
      } else {
        toast.warning(result.data.message, { autoClose: 2300 });
      }
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};

export const addCompanyCategory = (payload) => (dispatch) => {
  console.log("payload addCompanyCategory", payload);

  let formData = new FormData();
  if (payload.image && payload.image !== "") {
    formData.append("image", payload.image, payload.image.name);
  }

  formData.append("category", payload.category);

  if (payload.parent && payload.parent !== "0") {
    formData.append("parent", payload.parent);
  }

  console.log("formData", formData);

  axios
    .post(API_URL + "/company/addCompanyCategory", formData)
    .then((result) => {
      console.log("result addcompany Category", result);
      if (result.data && result.data.success) {
        dispatch(addCompanyCategoryAction(result));
        toast.success(result.data.message, { autoClose: 2300 });

        dispatch(getAllCompanyCategories(dispatch));
      } else {
        toast.warning(result.data.message, { autoClose: 2300 });
      }
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};

//getcompanyAction
export const getAllCompanyParentCategoriesAction = (res) => {
  return { type: GET_ALL_COMPANY_PARENT_CATEGORIES, payload: res };
};

//getcompanyAction
export const getAllCompanyCategoriesViaParentIdAction = (res) => {
  return { type: GET_ALL_COMPANY_CATEGORIES_VIA_PARENTID, payload: res };
};

//getAllCompanyCategoriesAction
export const getAllCompanyCategoriesAction = (res) => {
  return { type: GET_ALL_COMPANY_CATEGORIES, payload: res };
};

//getAllCompanies
export const getAllCompaniesAction = (res) => {
  return { type: GET_ALL_COMPANIES, payload: res };
};
//getAllCompanies
export const getCompaniesViaUserIdAction = (res) => {
  return { type: GET_COMPANIES_VIA_USER_ID, payload: res };
};

//ADD CATEGORY
export const addCompanyAction = (res) => {
  console.log("addCompanyAction", res);
  return { type: ADD_COMPANY, payload: res };
};
//ADD CATEGORY
export const addCompanyCategoryAction = (res) => {
  console.log("38", res);
  return { type: ADD_COMPANY_CATEGORY, payload: res.data };
};

//CHANGE COMPANY STATUS
export const changeCompanyStatusAction = (res) => {
  console.log("changeCompanyStatusAction", res);
  return { type: CHANGE_COMPANY_STATUS, payload: res.data };
};
