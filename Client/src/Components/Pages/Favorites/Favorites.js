import React, { useState, useEffect, useContext } from "react";
import Page from "../../Utils/Page";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../SSO/Auth";
import api from "../../../API/API";

export default function Favorites({ title, setTitle, setActive }) {
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(async () => {
    if (!user) {
      const response = await api.getUserById(currentUser?.email);
      setUser(response.data.data);
    } else {
      setProducts(user.favorites);
      console.log(user);
    }
  }, [user, products]);

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
