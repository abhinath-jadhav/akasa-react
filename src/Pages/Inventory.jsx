import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FoodApi, InventoryApi } from "../utils";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [foods, setFoods] = useState([]); // For food item dropdown
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(false);

  const formik = useFormik({
    initialValues: {
      itemId: "",
      itemName: "",
      stock: 0,
    },
    validationSchema: Yup.object({
      itemId: Yup.number().required("Food item is required"),
      itemName: Yup.string().required("Item name is required"),
      stock: Yup.number()
        .required("Stock is required")
        .min(0, "Stock cannot be negative")
        .integer("Stock must be a whole number"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        if (editingItem) {
          await InventoryApi.updateInventory(values);
        } else {
          await InventoryApi.addInventory(values);
        }
        resetForm();
        setEditingItem(null);
        fetchInventory();
      } catch (error) {
        console.error("Error saving inventory:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    fetchInventory();
    fetchFoods();
  }, []);

  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      const response = await InventoryApi.getAllInventories();
      setInventory(response.inventories);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await FoodApi.fetchFoodData("/food/details");
      setFoods(response.items);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const handleEdit = (item) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setEditingItem(item);
    formik.setValues({
      itemId: item.itemId,
      itemName: item.itemName,
      stock: item.stock,
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    formik.resetForm();
  };

  const handleDelete = async (id) => {
    try {
      await FoodApi.deleteInventory(`/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };

  // Handle food selection change
  const handleFoodChange = (e) => {
    const selectedFood = foods.find(
      (food) => food.id === Number(e.target.value)
    );
    if (selectedFood) {
      formik.setValues({
        ...formik.values,
        itemId: selectedFood.id,
        itemName: selectedFood.name,
      });
    }
  };

  // Add sorting function
  const sortedInventory = [...inventory].sort((a, b) => a.id - b.id);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="mb-6 grid grid-cols-2 gap-4"
      >
        <div>
          <select
            name="itemId"
            onChange={handleFoodChange}
            value={formik.values.itemId}
            className={`border p-2 w-full ${
              formik.touched.itemId && formik.errors.itemId
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="">Select Food Item</option>
            {foods.map((food) => (
              <option key={food.id} value={food.id}>
                {food.name}
              </option>
            ))}
          </select>
          {formik.touched.itemId && formik.errors.itemId && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.itemId}
            </div>
          )}
        </div>

        <div>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            {...formik.getFieldProps("stock")}
            className={`border p-2 w-full ${
              formik.touched.stock && formik.errors.stock
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.stock && formik.errors.stock && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.stock}
            </div>
          )}
        </div>

        <div className="col-span-2 flex justify-end gap-2">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
          >
            {formik.isSubmitting
              ? editingItem
                ? "Updating..."
                : "Adding..."
              : editingItem
              ? "Update Inventory"
              : "Add Inventory"}
          </button>

          {editingItem && (
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

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Food Item</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedInventory.map((item) => (
                <tr className="hover:bg-gray-300 text-center" key={item.id}>
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.itemName}</td>
                  <td className="border p-2">{item.stock}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className={`${
                        editingItem?.id === item.id
                          ? "bg-gray-500"
                          : "bg-blue-500"
                      } text-white px-2 py-1 rounded`}
                    >
                      {editingItem?.id === item.id ? "Editing..." : "Edit"}
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

export default Inventory;
