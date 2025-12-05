import axiosClient from "./axiosClient";

export const getMovements = (params) =>
  axiosClient.get("/movements", { params });

export const createMovement = (data) =>
  axiosClient.post("/movements", data);
