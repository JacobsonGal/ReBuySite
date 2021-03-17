import React, { useState } from "react";
import Page from "../../Utils/Page";
import ProductsList from "./Products";

export default function Home({ title, setTitle, setActive }) {
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
      <ProductsList />
      {setActive(false)}
    </Page>
  );
}