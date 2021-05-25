import React, { useState, useEffect } from "react";
import api from "../../../API/API";
import CardList from "../Home/CardList";

function Categories() {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (!category) {
      setCategory(window.location.href.split("/categories/")[1]);
    }
    if (!products) {
      api.getAllProducts().then((res) => setProducts(res.data.data));
    }
    if (!users) {
      api.getAllUsers().then((res) => setUsers(res.data.data));
    }
  }, [category, products]);
  {
  }
  return (
    <div>
      {products && users && (
        <CardList
          products={products.filter(
            (prod) =>
              prod.category == window.location.href.split("/categories/")[1]
          )}
          users={users}
          deleteHandler={null}
          from={0}
          to={products.length}
        />
      )}
    </div>
  );
}

export default Categories;
