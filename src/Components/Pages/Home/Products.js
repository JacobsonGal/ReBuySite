import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../API/API";
import styled from "styled-components";
import "react-table/index";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Search from "./Search";
import Groupby from "./Groupby";
import Sort from "./Sort";
import { Link } from "react-router-dom";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia,
  Typography,
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import PopUp from "../../Utils/PopUp";
import CardList from "./CardList";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const auth = firebase.auth();
const firestore = firebase.firestore();

const Wrapper = styled.div``;
const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;
const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;
function UpdateProduct({ id }) {
  const history = useHistory();

  const updateUser = (event) => {
    event.preventDefault();
    history.push(`/Update/${id}`);
  };
  return <Update onClick={updateUser}>Update</Update>;
}
class DeleteProduct extends Component {
  constructor() {
    super();
  }
  deleteUser = (event) => {
    event.preventDefault();

    if (
      window.confirm(
        `Do tou want to delete the product ${this.props.id} permanently?`
      )
    ) {
      api
        .deleteProductById(this.props.id)
        .then((res) => {
          this.props.deleteHandler(res.data);
        })
        .catch((err) => console.log(err));
      // window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>DELETE</Delete>;
  }
}
export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      users: [],
      columns: [],
      isLoading: this.props.loading,
      imagePath: "",
      setLoading: this.props.setLoading,
      intl: props.intl,
      currentUser: props.currentUser,
      favCategories: [],
      favProduct: [],
    };
  }

  componentDidMount = async () => {
    this.state.setLoading(false);
    try {
      await api.getAllProducts().then((product) => {
        this.setState({
          products: product.data.data,
        });
      });
      await api.getAllUsers().then((user) => {
        this.setState({
          users: user.data.data,
        });
      });
      firestore
        .collection("users")
        .where("email", "in", [
          this.state.currentUser?.email.toUpperCase(),
          this.state.currentUser?.email.toLowerCase(),
        ])
        .get()
        .then((Snapshot) => {
          Snapshot.docs.forEach((doc) => {
            let favCategory = doc.data().favCategory;
            let cat1 = null;
            let max1 = 0;
            favCategory.forEach((cat) => {
              if (cat.val > max1) {
                cat1 = cat.key;
                max1 = cat.val;
              }
            });
            let cat2 = null;
            let max2 = 0;
            favCategory.forEach((cat) => {
              if (cat.val > max2 && cat.val < max1) {
                cat2 = cat.key;
                max2 = cat.val;
              }
            });

            this.setState({
              favCategories: [cat1, cat2],
            });
            console.log(this.state.favCategories);
          });
          let prods = [];
          console.log(this.state.favCategories);
          this.state.products.forEach((product) => {
            this.state.favCategories.some((f) => f === product.category) &&
              prods.push(product);
          });
          this.setState({
            favProduct: prods,
          });
        })
        .catch((error) => {});

      this.state.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  searchHandler = (products) => {
    this.setState({
      products: products.data,
    });
  };
  deleteHandler = (productId) => {
    this.setState({
      products: this.state.products.filter((product) => {
        return product.seconderyId !== productId;
      }),
    });
  };
  render() {
    const { products, users, intl, favProduct, favCategories } = this.state;

    return (
      <Wrapper
        style={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <h1>{intl.formatMessage({ id: "Market" })}</h1>
        <Search searchHandler={this.searchHandler} />
        {/* <Sort searchHandler={this.searchHandler} /> */}

        {favProduct.length > 0 && (
          <>
            <h1>{intl.formatMessage({ id: "Recommended for you" })}</h1>
            <h3>
              {`We can see that you like ${favCategories[0]} and ${favCategories[1]}`}
            </h3>
            <CardList
              products={favProduct}
              users={users}
              deleteHandler={this.deleteHandler}
              from={0}
              to={products.length}
            />
            <h1>{intl.formatMessage({ id: "All Products" })}</h1>
          </>
        )}

        <CardList
          products={products}
          users={users}
          deleteHandler={this.deleteHandler}
          from={0}
          to={products.length}
        />
        {this.props.setLoading(false)}
      </Wrapper>
    );
  }
}
