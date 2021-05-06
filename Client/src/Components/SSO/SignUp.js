import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "./Config";
import { AuthContext } from "./Auth";
import api from "../../API/API";
import { Form, Col, Row, Button } from "react-bootstrap";

export default function SignUp({ setRegistered }) {
  const [signdUp, setsigndUp] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email, password } = e.target.elements;
    console.log(e.target[4].files[0]);
    const file = e.target[4].files[0];
    try {
      console.log(name.value + phone.value + email.value + file);
      let data = new FormData();
      data.append("name", name.value);
      data.append("phone", phone.value);
      data.append("email", email.value);
      data.append("image", file);
      data.append("isOnline", true);

      await api
        .insertUser(data)
        .then((res) => {
          window.alert(`User inserted successfully`);
          firebaseConfig
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(function (result) {
              return result.user.updateProfile({
                displayName: name.value,
              });
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    console.log(currentUser);
    return <Redirect to="/" />;
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label as="h1">Sign Up</Form.Label>
      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="4">
          Full Name
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text" name="name" placeholder="Name" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="4">
          Phone
        </Form.Label>
        <Col sm="8">
          <Form.Control type="number" name="phone" placeholder="Phone Number" />
        </Col>
      </Form.Group>
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
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="4">
          Profile Photo
        </Form.Label>
        <Col sm="8">
          <Form.Control type="file" name="image" id="image" />
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
        Already Registered?{" "}
        <Button onClick={() => setRegistered(true)}>Login?</Button>
      </div>
    </Form>
  );
}
