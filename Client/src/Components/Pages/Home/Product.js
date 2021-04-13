import React, { useState, useEffect } from "react";
import api from "../../../API/API";
import { Container, Card } from "react-bootstrap";

function Product() {
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);
  useEffect(async () => {
    console.log(product);
    if (product === null) {
      setId(window.location.href.split("product/")[1]);
      console.log("id", id);
      if (id) {
        const newProduct = await api.getProductById(id);
        setProduct(newProduct.data);
      }
    }
  }, [id, product]);

  return (
    product && (
      <Container className="mt-5">
        <h1>{product.data.name}</h1>
        {product.data["images"].map((image) => {
          return (
            <img
              style={{ width: "300px" }}
              src={`http://localhost:3000/${image}`}
            />
          );
        })}

        <Card>
          <Card.Body>{product.data.description}</Card.Body>
          <Card.Body>{product.data.condition}</Card.Body>
          <Card.Body>{product.data.price} NIS</Card.Body>
          <Card.Body>from {product.data.address}</Card.Body>
        </Card>
      </Container>
    )
  );
}

export default Product;
