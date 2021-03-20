import React, { useState } from "react";
import { render } from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import { Form, FormControl, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Assets/Images/ReBuyLogo.png";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

export default function Authentication() {
  const [registered, setRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  function login(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      alert("login");
      firebase.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  }
  function signup(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebase.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  }
  const handleSubmit = (e) => {
    alert("login");
    e.preventDefault();
    const { email, password } = e.target.elements;
    console.log(email, password);
    try {
      firebase.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  function googleLogin() {
    alert("google login");
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(googleAuthProvider);
    firebase
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
  return (
    <div className="login">
      <div>
        <img src={logo} alt="logo" className="loginLogo" />
      </div>
      <div>
        {registered ? (
          <Form className="Form">
            <Form.Label as="h1">Log In</Form.Label>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="12">
                <Form.Control type="email" placeholder="Email" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="3">
                Password
              </Form.Label>
              <Col sm="12">
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <FacebookLoginButton />
            </Form.Group>
            <Form.Group as={Row}>
              <GoogleLoginButton onClick={() => login()} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <Button
              variant="primary"
              // type="submit"
              size="lg"
              onClick={(e) => login(e)}
            >
              Login
            </Button>
          </Form>
        ) : (
          <Form className="Form">
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
                <Form.Control type="email" placeholder="Email" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="4">
                Password
              </Form.Label>
              <Col sm="8">
                <Form.Control type="password" placeholder="Password" />
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

            <Button variant="primary" type="submit">
              SignUp
            </Button>
            <div style={{ margin: "1rem" }}>
              Already registerd?{" "}
              <Button
                variant="secondary"
                type="submit"
                column
                sm="5"
                onClick={() => setRegistered(true)}
              >
                {" "}
                Log in
              </Button>
            </div>
          </Form>
        )}
      </div>

      {/* <button
        onClick={() => {
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuthProvider);
        }}
      >
        Sign In with Google
      </button>
      <button
        data-testid="signin-anon"
        onClick={() => {
          firebase.auth().signInAnonymously();
        }}
      >
        Sign In Anonymously
      </button>
      <button
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        Sign Out
      </button>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          return (
            <pre style={{ height: 300, overflow: "auto" }}>
              {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
            </pre>
          );
        }}
      </FirebaseAuthConsumer>
      <div>
        <IfFirebaseAuthed>
          {() => {
            return <div>You are authenticated</div>;
          }}
        </IfFirebaseAuthed>
        <IfFirebaseAuthedAnd
          filter={({ providerId }) => providerId !== "anonymous"}
        >
          {({ providerId }) => {
            return <div>You are authenticated with {providerId}</div>;
          }}
        </IfFirebaseAuthedAnd>
      </div>
    */}
    </div>
  );
}

export function isSignIn() {
  var user = firebase.auth().currentUser;
  console.log("user info" + user);
  // return user ? true : false;
  return true;
}
