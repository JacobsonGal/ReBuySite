import React, { useState, useEffect } from "react";
import api from "../../../API/API";
import CardList from "../Home/CardList";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";

function Categories() {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  let { id } = useParams();
  const intl = useIntl();

  useEffect(() => {
    console.log(window.location.href);
    console.log(id);
    if (!category) {
      setCategory(id);
      // setCategory(window.location.href.split("/categories/")[1]);
    }
    if (!products) {
      api.getAllProducts().then((res) => setProducts(res.data.data));
    }
    if (!users) {
      api.getAllUsers().then((res) => setUsers(res.data.data));
    }
  }, [category, products, id]);
  {
  }
  const deleteHandler = (productId) => {
    // setProducts(
    //   products.filter((product) => {
    //     return product._id !== productId.data._id;
    //   })
    // );
  };
  return (
    <Card
      style={{
        height: "100%",
        alignItems: "center",
        textAlign: "center",
        border: "none",
      }}
    >
      <Card.Header
        className="userHeader"
        style={{
          justifyContent: "center",
        }}
      >
        <Card.Title
          style={{
            margin: "1rem",
            width: "80%",
            color: "#147764",
            alignSelf: "center",
          }}
        >
          {intl.formatMessage({ id: id })}
        </Card.Title>
      </Card.Header>
      <Card.Body style={{ alignItems: "center" }}>
        {products && users ? (
          <CardList
            products={products.filter((prod) => prod.category === id)}
            users={users}
            deleteHandler={deleteHandler}
          />
        ) : (
          <Card
            style={{
              width: "100%",
              height: "50%",
              borderRadius: "35px",
              alignItems: "center",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              backgroundColor: "rgba(0,0,50,0.1)",
            }}
          >
            <p> אין לנו עוד מוצרים בקטגוריה הזאת ! </p>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
}
export default Categories;

function CategoriesPage({ category, products, users }) {
  const deleteHandler = (productId) => {
    // setProducts(
    //   products.filter((product) => {
    //     return product._id !== productId.data._id;
    //   })
    // );
  };
  return (
    <Card className="userSettings">
      <Card.Header className="userHeader">
        <Card.Title
          style={{
            margin: "1rem",
            width: "80%",
            color: "#147764",
            alignSelf: "center",
          }}
        >
          {category}
        </Card.Title>
      </Card.Header>
      <Card.Body style={{ alignItems: "center" }}>
        {products && users ? (
          <CardList
            products={products.filter(
              (prod) =>
                prod.category === window.location.href.split("/categories/")[1]
            )}
            users={users}
            deleteHandler={deleteHandler}
          />
        ) : (
          <Card
            style={{
              width: "100%",
              height: "50%",
              borderRadius: "35px",
              alignItems: "center",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              backgroundColor: "rgba(0,0,50,0.1)",
            }}
          >
            <p> אין לנו עוד מוצרים בקטגוריה הזאת ! </p>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
}
