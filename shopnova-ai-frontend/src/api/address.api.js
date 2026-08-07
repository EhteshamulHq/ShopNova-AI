import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const addressApi = {
  getAddresses() {
    return api.get(ENDPOINTS.ADDRESS.LIST);
  },

  getAddress(id) {
    return api.get(ENDPOINTS.ADDRESS.DETAIL(id));
  },

  addAddress(data) {
    return api.post(ENDPOINTS.ADDRESS.CREATE, data);
  },

  updateAddress(id, data) {
    return api.put(ENDPOINTS.ADDRESS.UPDATE(id), data);
  },

  deleteAddress(id) {
    return api.delete(ENDPOINTS.ADDRESS.DELETE(id));
  },

  setDefaultAddress(id) {
    return api.patch(ENDPOINTS.ADDRESS.SET_DEFAULT(id));
  },
};
