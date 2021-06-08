import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import api from "../../../API/API";

export default function Groupby(props) {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function use() {
      await api
        .groupByCategory()
        .then((res) => {
          setProducts(res.data.products);
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    use();
  }, []);

  const onChange = async (e) => {
    const category = e.target.value.split(" ")[0];
    await api
      .groupByCategory(category)
      .then((res) => {
        // console.log(res.data.products);
        props.searchHandler(res.data.products);
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
