import React, { Component } from "react";
import ReactTable from "react-table";
import api from "../../../API/API";
import styled from "styled-components";
import "react-table/index";
import { Card, CardContent, CardHeader, CardMedia } from "@material-ui/core";

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

class UpdateProduct extends Component {
  updateUser = (event) => {
    event.preventDefault();

    window.location.href = `/Update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

class DeleteProduct extends Component {
  deleteUser = (event) => {
    event.preventDefault();

    if (
      window.confirm(
        `Do tou want to delete the product ${this.props.id} permanently?`
      )
    ) {
      api.deleteProductById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      columns: [],
      isLoading: this.props.loading,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    try {
      await api.getAllProducts().then((product) => {
        console.log(product.data.data);
        this.setState({
          products: product.data.data,
        });
        this.props.setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { products, isLoading } = this.state;
    console.log("Products", products);

    return (
      <Wrapper>
        <h1>Table</h1>
        {products &&
          products.map((product) => {
            return (
              <Card
                style={{
                  margin: "1rem",
                  border: "1px solid #ececec",
                  borderRadius: "15px",
                }}
              >
                <CardContent>
                  <p>{product["name"]}</p>
                  <p>{product["price"]}</p>
                  <p>{product["ownerId"]}</p>
                  <p>{product["description"]}</p>
                  <p>{product["condition"]}</p>
                  <span>
                    <DeleteProduct id={product["_id"]} />
                  </span>
                  <span>
                    <UpdateProduct id={product["_id"]} />
                  </span>
                </CardContent>
                <CardMedia>{product["image"]}</CardMedia>
              </Card>
            );
          })}
      </Wrapper>
    );
  }
}
