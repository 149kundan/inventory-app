import axiosClient from "./axiosClient";

export const loginUser = (data) => axiosClient.post("/auth/login", data);
export const registerUser = (data) => axiosClient.post("/auth/register", data);
export const getMovements = () => axiosClient.get("/movements");
export const createMovement = (data) => axiosClient.post("/movements", data);