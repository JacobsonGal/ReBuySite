import React, { useState } from "react";
import Page from "../../Utils/Page";
import SimpleMap from "./GoogleMap";

export default function Map({ title, setTitle, setActive }) {
  const [loading, setLoading] = useState(false);
  let city = "Tel-Aviv";
  const [lat, setlat] = useState(32.083333);
  const [lng, setlng] = useState(34.7999968);
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
      {/* <SimpleMap /> */}

      <iframe
        style={{
          width: "100%",
          height: 900,
        }}
        loading="eager"
        allowFullScreen={true}
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCuGRHOd6Z6oEASHyw6DFDQWr0Jlhbf8TQ&q=Space+Needle,${city}`}
        title={title}
      />

      {setActive(false)}
    </Page>
  );
}
