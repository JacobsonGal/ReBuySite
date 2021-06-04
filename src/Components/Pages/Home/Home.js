import React, { useState, useContext } from "react";
import Page from "../../Utils/Page";
import ProductsList from "./Products";
import { AuthContext } from "../../SSO/Auth";

export default function Home({ title, setTitle, setActive, intl }) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
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
      <ProductsList
        loading={loading}
        setLoading={setLoading}
        intl={intl}
        currentUser={currentUser}
      />
      {setActive(false)}
    </Page>
  );
}
