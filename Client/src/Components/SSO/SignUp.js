import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "./Config";
import { AuthContext } from "./Auth";
import { Form, Col, Row, Button } from "react-bootstrap";

export default function SignUp({ setRegistered }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label as="h1">Sign Up</Form.Label>
      {/* <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                First Name
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" placeholder="First Name" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Last Name
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" placeholder="Last Name" />
              </Col>
            </Form.Group>
            */}
      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="4">
          Email
        </Form.Label>
        <Col sm="8">
          <Form.Control type="email" name="email" placeholder="Email" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="4">
          Password
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Col>
      </Form.Group>
      {/* <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="4">
                Confirm Password
              </Form.Label>
              <Col sm="8">
                <Form.Control type="password" placeholder="Confirm Password" />
              </Col>
            </Form.Group> */}

      <Button variant="primary" type="submit" size="lg">
        Sign Up
      </Button>
      <div style={{ margin: "1rem" }}>
        Already registerd?{" "}
        <Button onClick={() => setRegistered(true)}>Login?</Button>
      </div>
    </Form>
  );
}
