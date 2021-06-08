import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import api from "../../../API/API";
import Sort from "./Sort";
import Groupby from "./Groupby";
import { useIntl } from "react-intl";
function Search(props) {
  const intl = useIntl();

  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

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
      .search(category, condition, price)
      .then((res) => {
        props.searchHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const conditionChangeHandler = (e) => {
    setCondition(e.target.value);
  };
  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  const categoryArray = [
    "Sport",
    "Clothing",
    "Electricity",
    "Underwear",
    "Swimwear",
    "Homecare",
    "Plants",
    "Activewear",
    "Jewlery",
    "Other",
  ];
  return (
    // <Form>
    //   <Form.Group controlId="formGroupEmail">
    //     <Form.Label>Search Product</Form.Label>
    //     <Form.Control
    //       type="text"
    //       style={{ direction: "ltr" }}
    //       placeholder="Enter search"
    //       onChange={(e) => changeHandler(e)}
    //     />
    //     <Button onClick={clickHandler}>Search</Button>
    //   </Form.Group>
    // </Form>
    <Form style={{ padding: "1rem" }}>
      <Form.Row style={{ direction: "ltr" }}>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label> {intl.formatMessage({ id: "Price" })}</Form.Label>
          <Form.Control as="select" onChange={(e) => priceChangeHandler(e)}>
            <option></option>
            <option>less than 500</option>
            <option>500-1000</option>
            <option>1000-5000</option>
            <option>5000+</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCategory">
          <Form.Label>{intl.formatMessage({ id: "Category" })}</Form.Label>
          <Form.Control as="select" onChange={(e) => categoryChangeHandler(e)}>
            <option></option>
            {categoryArray.map((category) => {
              return <option>{category}</option>;
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>{intl.formatMessage({ id: "Condition" })}</Form.Label>
          <Form.Control as="select" onChange={(e) => conditionChangeHandler(e)}>
            <option></option>
            <option value={"NEW"}>{intl.formatMessage({ id: "New" })}</option>
            <option value={"USED"}>{intl.formatMessage({ id: "Used" })}</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Button onClick={clickHandler}>
        {intl.formatMessage({ id: "Search" })}
      </Button>
    </Form>
  );
}

export default Search;
