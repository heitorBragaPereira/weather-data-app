import { api } from "./api";
import { DataNetworkEsp } from "../interfaces/settings";

export const registerNetwork = async (data: DataNetworkEsp) => {
  const response = await api.post("/config", data);
  return response.data;
};
