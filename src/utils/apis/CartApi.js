import validUser from "../PriavateRoute";
import { axiosAuth, axiosNoAuth } from "../axios";

class CartApi {
  static async saveCart(items) {
    if (validUser()) {
      const res = await axiosAuth.post("/cart/", items);
      return res.data;
    }
  }

  static async addToCart(id) {
    try {
      if (localStorage.getItem("token")) {
        const response = await axiosAuth.post("/cart/" + id);
        return response.data;
      } else {
        const response = await axiosNoAuth.post("/cart/" + id);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  static async reduceFromCart(id) {
    try {
      if (localStorage.getItem("token")) {
        const response = await axiosAuth.put("/cart/" + id);
        return response.data;
      } else {
        console.log(localStorage.getItem("session-id"));

        const response = await axiosNoAuth.put("/cart/" + id);
        return response.data;
      }
    } catch (error) {
      console.error(error);
      return { status: 400 };
    }
  }

  static async getAllCarts() {
    try {
      if (localStorage.getItem("token")) {
        const res = await axiosAuth.get("/cart/details");
        return res.data;
      } else {
        const res = await axiosNoAuth.get("/cart/details");
        return res.data;
      }
    } catch (error) {
      console.error(error);

      return { status: 400 };
    }
  }

  static async completeOrder(data) {
    try {
      const res = await axiosAuth.post("/user/order", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getCartItems(ids) {
    try {
      const res = await axiosAuth.post("/food/ids", ids);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CartApi;
