import React, { useContext } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { AuthContext } from "./Auth";
import firebaseConfig from "./Config.js";

export default function LogIn() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  function GoogleLogin() {
    alert("google login");
    var googleAuthProvider = new firebaseConfig.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(googleAuthProvider);
    firebaseConfig
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label as="h1">Log In</Form.Label>
      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="12">
          <Form.Control type="email" name="email" placeholder="Email" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="3">
          Password
        </Form.Label>
        <Col sm="12">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <FacebookLoginButton />
      </Form.Group>
      <Form.Group as={Row}>
        <GoogleLoginButton onClick={() => GoogleLogin} />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember Me" />
      </Form.Group>
      <Button variant="primary" type="submit" size="lg">
        Login
      </Button>
    </Form>
  );
}
