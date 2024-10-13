import { useEffect, useState } from "react";
import FoodMenuCard from "./FoodMenuCard";
import PropTypes from "prop-types";
import { CartApi, InventoryApi } from "../utils";

const MenuBody = ({ filteredFoodItems }) => {
  const [inventoryMap, setInventoryMap] = useState({});
  const [qtyMap, setQtyMap] = useState({});

  useEffect(() => {
    const fetchInventory = async () => {
      const data = await InventoryApi.getAllInventories();
      if (data.status == 200) {
        const inventoryMap = {};
        data.inventories.forEach((item) => {
          inventoryMap[item.itemId] = item;
        });

        setInventoryMap(inventoryMap);
      }
    };

    const fetchUserCart = async () => {
      const res = await CartApi.getAllCarts();
      if (res.status == 200) {
        const qtyMap = {};
        res.cart.forEach((item) => (qtyMap[item.id] = item.qty));
        setQtyMap(qtyMap);
      }
    };
    fetchUserCart();
    fetchInventory();
  }, []);

  return (
    <div className="mt-5 flex flex-wrap justify-center gap-5">
      {filteredFoodItems.map((item, index) => (
        <FoodMenuCard
          index={index}
          {...item}
          key={item.id}
          stock={inventoryMap[item.id]?.stock}
          qty={qtyMap[item.id]}
        />
      ))}
    </div>
  );
};

MenuBody.propTypes = {
  filteredFoodItems: PropTypes.array.isRequired,
};

export default MenuBody;
