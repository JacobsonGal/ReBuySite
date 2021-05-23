import React, { useState } from "react";
import Page from "../../Utils/Page";
import ProductsList from "../Home/Products";
import Card from "react-bootstrap/Card";
export default function Favorites({ title, setTitle, setActive, products }) {
  const [loading, setLoading] = useState(false);

  return (
    <Page
      loading={loading}
      title={title}
      color={"#fdeded"}
      setTitle={setTitle}
      add={false}
      FAB="none"
      dots={false}
    >
      {products.map((product) => {
        return (
          <>
            <h1>My Favorites</h1>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product["photo"]} />
              <Card.Body>
                <Card.Title>{product["name"]}</Card.Title>
                <Card.Text>{product["description"]}</Card.Text>
                <Card.Text>{product["condition"]}</Card.Text>
                <Card.Text>{product["address"]}</Card.Text>
                <Card.Text>{product["price"]}</Card.Text>
              </Card.Body>
            </Card>
          </>
        );
      })}

      {setActive(false)}
    </Page>
  );
}
