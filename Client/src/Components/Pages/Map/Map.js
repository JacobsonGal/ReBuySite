import React, { useState } from "react";
import Page from "../../Utils/Page";
import GoogleMap from "./GoogleMap";

export default function Map({ title, setTitle, setActive }) {
  const [loading, setLoading] = useState(false);
  console.log(loading);
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
      <GoogleMap loading={loading} setLoading={setLoading} />
      {setActive(false)}
    </Page>
  );
}
