import React, { useState, useEffect, useContext } from "react";
import Page from "../../Utils/Page";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../SSO/Auth";
import api from "../../../API/API";
import { useIntl } from "react-intl";
import CardList from "../Home/CardList";
import { DeleteProduct } from "../../Utils/Handlers";

export default function Favorites({ title, setTitle, setActive }) {
  const [loading, setLoading] = useState(true);
  const intl = useIntl();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function use() {
      if (!user) {
        let response = await api.getUserById(currentUser?.email.toUpperCase());
        if (!response)
          response = await api.getUserById(currentUser?.email.toLowerCase());
        setUser(response.data.data);
      } else {
        setProducts(user.favorites);
      }
    }
    use();
    setLoading(false);
  }, [user, products, currentUser]);

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
      <FavoritesPage
        title={intl.formatMessage({ id: "MyFavorites" })}
        products={products}
      />
    </Page>
  );
}
export function FavoritesPage({
  users,
  images,
  products,
  title,
  setTitle,
  setLoading,
}) {
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
          {title}
        </Card.Title>
      </Card.Header>
      <Card.Body style={{ alignItems: "center", width: "100%" }}>
        {products ? (
          <CardList
            products={products}
            users={users}
            deleteHandler={DeleteProduct}
            favorites={true}
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
            <p> אין לך מוצרים מועדפים עדיין ! </p>
            <p>אפשר להוסיף אותם בלחיצה על כוכב ליד כל מוצר</p>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
}
