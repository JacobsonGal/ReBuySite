import React, { useState } from "react";
import Page from "../../Utils/Page";
import ProductsList from "./Products";
export default function Home({ title, setTitle, setActive, intl }) {
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
      <ProductsList loading={loading} setLoading={setLoading} intl={intl} />
      {setActive(false)}
    </Page>
  );
}
