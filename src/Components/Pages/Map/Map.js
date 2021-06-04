import React, { useState, useContext } from "react";
import Page from "../../Utils/Page";
import GoogleMap from "./GoogleMap";
import { AuthContext } from "../../SSO/Auth";

export default function Map({ title, setTitle, setActive }) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
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
      <GoogleMap
        loading={loading}
        setLoading={setLoading}
        currentUser={currentUser}
      />
      {setActive(false)}
    </Page>
  );
}
