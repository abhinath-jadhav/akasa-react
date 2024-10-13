import { axiosAuth } from "../axios";

class UserApi {
  static getFlightDetails = async () => {
    try {
      const response = await axiosAuth.get("/user/flight");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  static getAllOrders = async () => {
    try {
      const response = await axiosAuth.get("/user/orders");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserApi;
