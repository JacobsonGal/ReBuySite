import React, { useContext } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

export default function Welcome({ setWelcomeDone }) {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <Form>
      <Form.Label as="h1">Welcome to ReBuy</Form.Label>
      <Form.Label>
        ReBuy is an e-commerce platform for selling products that are not fit
        for you!
      </Form.Label>
      <Form.Group controlId="formPlaintextEmail"></Form.Group>

      <Button variant="primary" onClick={() => setWelcomeDone(true)} size="lg">
        Get In!
      </Button>
      {/* <div style={{ width: "100%" }}>
        <Button
          variant="secondary"
          onClick={() => setRegistered(false)}
          size="lg"
          style={{ marginTop: "5px" }}
        >
          Sign Up
        </Button>
      </div> */}
    </Form>
  );
}
