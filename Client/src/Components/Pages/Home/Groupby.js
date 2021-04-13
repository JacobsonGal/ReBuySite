import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import api from "../../../API/API";

function Groupby(props) {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

  useEffect(async () => {
    await api
      .groupByCategory()
      .then((res) => {
        console.log(res);
        setProducts(res.data.products);
        setData(res.data.data);
        // props.searchHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clickHandler = async () => {
    await api
      .groupByCategory()
      .then((res) => {
        console.log(res);
        // props.searchHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChange = async (e) => {
    const category = e.target.value.split(" ")[0];
    await api
      .groupByCategory(category)
      .then((res) => {
        console.log(res);
        props.searchHandler(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Form>
      <Form.Group controlId="formGroupEmail">
        {/* <Form.Label>Groupby Category</Form.Label> */}
        {/* <Form.Control
          type="text"
          style={{ direction: "ltr" }}
          placeholder="Enter search"
          onChange={(e) => changeHandler(e)}
        /> */}
        {/* <Button onClick={clickHandler}>Group By Category</Button> */}
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Group By</Form.Label>
          <select onChange={(e) => onChange(e)} placeholder="Choose...">
            <option></option>
            {data.map((obj) => {
              return (
                <option>
                  {obj._id} ({obj.total})
                </option>
              );
            })}
          </select>
        </Form.Group>
      </Form.Group>
    </Form>
  );
}

export default Groupby;
