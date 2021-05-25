import React from "react";
import { IoLogoBuffer, IoAdd } from "react-icons/io5";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function PageBody({ color, boldPar, par, pic, to, button }) {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "2rem",
        height: "90%",
        borderRadius: "50px",
        backgroundColor: color,
        color: "gray",
      }}
    >
      <img src={pic} style={{ marginTop: "40px", height: "50px" }} />
      <p style={{ margin: "2rem" }}>
        <b style={{ display: "block" }}>{boldPar}</b> {par}
      </p>
      <Link to={to}>
        <Button
          style={{
            textAlign: "center",
            margin: "1rem",
            padding: "1rem",
            height: "90%",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "auto",
            background: "#343798",
            color: "white",
            borderRadius: "66px 66px 66px 66px",
            boxShadow: "0px 0px 10px 0px",
          }}
        >
          <h5>{button}</h5>
        </Button>
      </Link>
    </div>
  );
}
