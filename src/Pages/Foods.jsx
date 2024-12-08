import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FoodApi } from "../utils";
import { Loading } from "../Components";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingFood, setEditingFood] = useState(null);

  const categoryTypes = {
    1: "Pizza",
    2: "Sandwich",
    3: "Fruits",
    4: "Burger",
    5: "Rice",
    6: "Fast Food",
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      diet: 1,
      category: 1,
      description: "",
      img: "",
      ratings: 0,
      isFeatured: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be positive"),
      diet: Yup.number()
        .required("Diet type is required")
        .oneOf([1, 2], "Invalid diet type"),
      category: Yup.number()
        .required("Category is required")
        .oneOf([1, 2, 3, 4, 5, 6], "Invalid category"),
      description: Yup.string().required("Description is required"),
      img: Yup.string()
        .required("Image URL is required")
        .url("Must be a valid URL"),
      ratings: Yup.number()
        .required("Rating is required")
        .min(0, "Rating must be at least 0")
        .max(5, "Rating cannot exceed 5"),
      isFeatured: Yup.boolean(),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await FoodApi.addFood("/admin/food", values);
        resetForm();
        setEditingFood(false);
        fetchFoods();
      } catch (error) {
        console.error("Error saving food:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setIsLoading(true);
      const response = await FoodApi.fetchFoodData("/food/details");
      setFoods(response.items);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (food) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setEditingFood(food);
    formik.setValues({
      name: food.name,
      price: food.price,
      diet: food.diet,
      category: food.category,
      description: food.description,
      img: food.img,
      ratings: food.ratings,
      isFeatured: food.isFeatured,
    });
  };

  const handleCancelEdit = () => {
    setEditingFood(null);
    formik.resetForm();
  };

  const handleDelete = async (id) => {
    try {
      await FoodApi.deleteFood(`/food/details/${id}`);
      fetchFoods();
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Foods Management</h1>

        {!editingFood ? (
          <button
            onClick={() => setEditingFood(true)}
            className="bg-secondary text-white px-2 py-1 rounded"
          >
            Add Food
          </button>
        ) : (
          <button
            onClick={() => setEditingFood(false)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      {editingFood && (
        <form
          onSubmit={formik.handleSubmit}
          className="mb-6 grid grid-cols-2 gap-4"
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Food name"
              {...formik.getFieldProps("name")}
              className={`border p-2 w-full ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>

          <div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              {...formik.getFieldProps("price")}
              className={`border p-2 w-full ${
                formik.touched.price && formik.errors.price
                  ? "border-red-500"
                  : ""
              }`}
              step="0.01"
            />
            {formik.touched.price && formik.errors.price && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.price}
              </div>
            )}
          </div>

          <div>
            <select
              name="diet"
              {...formik.getFieldProps("diet")}
              className={`border p-2 w-full ${
                formik.touched.diet && formik.errors.diet
                  ? "border-red-500"
                  : ""
              }`}
            >
              <option value={1}>Vegetarian</option>
              <option value={2}>Non-Vegetarian</option>
            </select>
            {formik.touched.diet && formik.errors.diet && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.diet}
              </div>
            )}
          </div>

          <div>
            <select
              name="category"
              {...formik.getFieldProps("category")}
              className={`border p-2 w-full ${
                formik.touched.category && formik.errors.category
                  ? "border-red-500"
                  : ""
              }`}
            >
              {Object.entries(categoryTypes).map(([key, value]) => (
                <option key={key} value={parseInt(key)}>
                  {value}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.category}
              </div>
            )}
          </div>

          <div className="col-span-2">
            <textarea
              name="description"
              placeholder="Description"
              {...formik.getFieldProps("description")}
              className={`border p-2 w-full ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }`}
              rows="3"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="img"
              placeholder="Image URL"
              {...formik.getFieldProps("img")}
              className={`border p-2 w-full ${
                formik.touched.img && formik.errors.img ? "border-red-500" : ""
              }`}
            />
            {formik.touched.img && formik.errors.img && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.img}
              </div>
            )}
          </div>

          <div>
            <input
              type="number"
              name="ratings"
              placeholder="Ratings"
              {...formik.getFieldProps("ratings")}
              className={`border p-2 w-full ${
                formik.touched.ratings && formik.errors.ratings
                  ? "border-red-500"
                  : ""
              }`}
              step="0.1"
              min="0"
              max="5"
            />
            {formik.touched.ratings && formik.errors.ratings && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.ratings}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                {...formik.getFieldProps("isFeatured")}
                className="mr-2"
              />
              Featured
            </label>
          </div>

          <div className="col-span-2 flex justify-end gap-2">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
            >
              {formik.isSubmitting
                ? editingFood
                  ? "Updating..."
                  : "Adding..."
                : editingFood
                ? "Update Food"
                : "Add Food"}
            </button>

            {editingFood && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      )}

      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Diet</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Ratings</th>
                <th className="border p-2">Featured</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.id}>
                  <td className="border p-2">
                    <img
                      src={food.img}
                      alt={food.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border p-2">{food.name}</td>
                  <td className="border p-2">${food.price.toFixed(2)}</td>
                  <td className="border p-2">
                    {food.diet === 1 ? "Vegetarian" : "Non-Vegetarian"}
                  </td>
                  <td className="border p-2">{categoryTypes[food.category]}</td>
                  <td className="border p-2">
                    <div className="max-w-xs truncate">{food.description}</div>
                  </td>
                  <td className="border p-2">{food.ratings.toFixed(1)}</td>
                  <td className="border p-2">
                    <input type="checkbox" checked={food.isFeatured} disabled />
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(food.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(food)}
                      className={`${
                        editingFood?.id === food.id
                          ? "bg-gray-500"
                          : "bg-blue-500"
                      } text-white px-2 py-1 rounded`}
                    >
                      {editingFood?.id === food.id ? "Editing..." : "Edit"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Foods;
