import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../../API/API";

function Search(props) {
  const [query, setQuery] = useState("");

  const changeHandler = async (e) => {
    setQuery(e.target.value);
    await api
      .search(query)
      .then((res) => {
        props.searchHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clickHandler = async () => {
    await api
      .search(query)
      .then((res) => {
        props.searchHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Form>
      <Form.Group controlId="formGroupEmail">
        <Form.Label>Search Product</Form.Label>
        <Form.Control
          type="text"
          style={{ direction: "ltr" }}
          placeholder="Enter search"
          onChange={(e) => changeHandler(e)}
        />
        <Button onClick={clickHandler}>Search</Button>
      </Form.Group>
    </Form>
  );
}

export default Search;
