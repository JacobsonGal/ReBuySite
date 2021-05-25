import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import api from "../../../API/API";

function Groupby(props) {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(async () => {
    await api
      .groupByCategory()
      .then((res) => {
        setProducts(res.data.products);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChange = async (e) => {
    const category = e.target.value.split(" ")[0];
    await api
      .groupByCategory(category)
      .then((res) => {
        console.log(res.data.products);
        props.searchHandler(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const mapReduceHandler = async () => {
    await api
      .mapAndReduce()
      .then((res) => {
        console.log(res);
        setTotal(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Form>
        <Form.Group
          style={{
            direction: "ltr",
          }}
          controlId="formGridState"
        >
          {/* <Form.Label>Group By</Form.Label> */}
          <Form.Group controlId="exampleForm.ControlSelect1">
            {/* <Form.Label>Group By</Form.Label> */}
            <Form.Control
              as="select"
              placeholder="Choose..."
              onChange={(e) => onChange(e)}
            >
              <option>Group By</option>
              <option value="">Clear Search</option>
              {data.map((obj) => {
                return (
                  <option>
                    {obj._id} ({obj.total})
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Form.Group>
      </Form>
      {/* <Button variant="warning" onClick={mapReduceHandler}>
        MapReduce
      </Button> */}
    </div>
  );
}

export default Groupby;

{
  /* <Form.Group controlId="formGroupEmail"> */
}
{
  /* <Form.Label>Groupby Category</Form.Label> */
}
{
  /* <Form.Control
          type="text"
          style={{ direction: "ltr" }}
          placeholder="Enter search"
          onChange={(e) => changeHandler(e)}
        /> */
}
{
  /* <Button onClick={clickHandler}>Group By Category</Button> */
}
{
  /* </Form.Group> */
}
