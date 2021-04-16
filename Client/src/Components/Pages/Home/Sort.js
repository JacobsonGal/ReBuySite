import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../../API/API";

function Search(props) {
  const clickHandler = async () => {
    await api
      .sort()
      .then((res) => {
        props.searchHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Button variant="success" onClick={clickHandler}>
      Sort By Name
    </Button>
  );
}

export default Search;
