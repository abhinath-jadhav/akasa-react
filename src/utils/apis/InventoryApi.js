import { axiosAuth, axiosNoAuth } from "../axios";

class InventoryApi {
  static async getAllInventories() {
    try {
      const response = await axiosAuth.get("/inventory");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getInventory(id) {
    try {
      const response = await axiosNoAuth.get("/inventory/" + id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateInventory(data) {
    try {
      const response = await axiosAuth.put("/inventory", data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async addInventory(data) {
    try {
      const response = await axiosAuth.post("/inventory", data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default InventoryApi;
