import { axiosAuth, axiosNoAuth } from "../axios";

class FoodApi {
  static async fetchHomeData(endpoint) {
    try {
      const response = await axiosNoAuth.get(endpoint);
      //console.log(response);
      return response.data;
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  static async addFood(endpoint, data) {
    try {
      const response = await axiosAuth.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  static async fetchFoodData(endpoint) {
    try {
      const response = await axiosNoAuth.get(endpoint);
      //console.log(response);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static getSelected = async (ids) => {
    try {
      const response = await axiosAuth.post("/food/ids", ids);
      //console.log(response);
      return response.data;
    } catch (error) {
      return error;
    }
  };
}

export default FoodApi;
