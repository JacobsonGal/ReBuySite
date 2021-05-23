import React, { useState } from "react";
import Page from "../../Utils/Page";
import Card from "react-bootstrap/Card";
export default function Favorites({ title, setTitle, setActive, products }) {
  const [loading, setLoading] = useState(false);

  console.log(products);
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
      <h1>My Favorites</h1>
      {products?.map((product) => {
        return (
          <>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product["photo"]} />
              <Card.Body>
                <Card.Title>{product["name"]}</Card.Title>
                <Card.Text>{product["description"]}</Card.Text>
                <Card.Text>{product["condition"]}</Card.Text>
                <Card.Text>{product["address"]}</Card.Text>
                <Card.Text>{product["price"] + "₪"}</Card.Text>
              </Card.Body>
            </Card>
          </>
        );
      })}

      {setActive(false)}
    </Page>
  );
}
