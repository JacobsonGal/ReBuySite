import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

export default function Welcome({ setWelcomeDone }) {
  document.title = "ReBuy | Welcome";
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <Form>
      <Form.Label as="h1">Welcome to ReBuy</Form.Label>
      <Form.Label
        style={{
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "Raleway,sans-serif",
          fontSize: "16px",
          fontWeight: "500,lineHeight",
          boxShadow: "0px0px15px#fff",
          animation: "glow1sease-in-outinfinitealternate",
        }}
      >
        <p>
          Tiered of getting products that doesn't fit for you or just not what
          you expected ?!
        </p>
        <p style={{ fontSize: "25px" }}>Welcome to ReBuy!</p>
        <p>
          {" "}
          ReBuy is an e-commerce platform for Buying and also Selling products
          that are just not good for you but could be excellent fit for others!
        </p>
      </Form.Label>
      <Form.Group controlId="formPlaintextEmail"></Form.Group>

      <Button variant="primary" onClick={() => setWelcomeDone(true)} size="lg">
        Get In!
      </Button>
    </Form>
  );
}
