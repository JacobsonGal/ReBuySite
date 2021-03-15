import React, { useState } from "react";
import Page from "../../Utils/Page";

export default function Favorites({ title, setTitle, setActive }) {
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
      {setActive(false)}
    </Page>
  );
}
