import axios from "axios";
import axiosConfig from "./axiosConfig";
import { baseURL } from "./baseURL";

export const registerUser = async (reqBody) => {
  return await axiosConfig("post", baseURL + "/registerUser", reqBody);
};

export const loginUser = async (reqBody) => {
  return await axiosConfig("post", baseURL + "/loginUser", reqBody);
};

export const googleLogin = async (reqBody) => {
  return await axiosConfig("post", baseURL + "/googleLogin", reqBody);
};

export const addBooks = async (reqBody, reqHeader) => {
  return await axiosConfig("post", baseURL + "/addBook", reqBody, reqHeader);
};

export const allBooks = async (reqHeader, searchKey) => {
  return await axiosConfig(
    "get",
    `${baseURL}/getAllBooks/?search=${searchKey}`,
    "",
    reqHeader
  );
};

export const SampleBook = async () => {
  return await axiosConfig("get", baseURL + "/getSampleBooks");
};

export const getSingleBook = async (id, reqHeader) => {
  return await axiosConfig(
    "get",
    `${baseURL}/getSingleBook/${id}`,
    "",
    reqHeader
  );
};

export const getUserDetails = async (reqHeader) => {
  return await axiosConfig("get", `${baseURL}/userDetails`, "", reqHeader);
};

export const updateProfile = async (id, reqHeader, reqBody) => {
  return await axiosConfig(
    "patch",
    `${baseURL}/${id}/updateProfile`,
    reqBody,
    reqHeader
  );
};

export const getAllUsers = async (reqHeader) => {
  return await axiosConfig("get", `${baseURL}/getAllUsers`, "", reqHeader);
};
export const addJob = async (reqBody, reqHeader) => {
  return await axiosConfig("post", `${baseURL}/addJob`, reqBody, reqHeader);
};

export const getAllJobs = async () => {
  return await axiosConfig("get", `${baseURL}/getAllJobs`, "");
};

export const deleteJob = async (id, reqHeader) => {
  return await axiosConfig(
    "delete",
    `${baseURL}/${id}/deleteJob`,
    {},
    reqHeader
  );
};

export const applyJob = async (reqBody, reqHeader) => {
  return await axiosConfig("post", `${baseURL}/applyJob`, reqBody, reqHeader);
};

export const getAllApplication = async (reqHeader) => {
  return await axiosConfig(
    "get",
    `${baseURL}/getAllApplications`,
    "",
    reqHeader
  );
};

export const paymentDetails = async (reqBody, reqHeader) => {
  return await axiosConfig("post", `${baseURL}/buyBook`, reqBody, reqHeader);
};
