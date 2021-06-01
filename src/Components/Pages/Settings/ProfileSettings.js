import React, { Component, useState, useContext, useEffect } from "react";
import { AuthContext, Admins } from "../../SSO/Auth";
import { useIntl } from "react-intl";
import MediaQuery from "react-responsive";
import { Form, Card, Dropdown } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import Person from "@material-ui/icons/PersonRounded";
import { Avatar } from "@material-ui/core";
import api from "../../../API/API";
import CardList from "../Home/CardList";
import apis from "../../../API/API";

export default class ProfileSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      images: [],
      users: [],
      columns: [],
      isLoading: this.props.loading,
      imagePath: "",
      setLoading: this.props.setLoading,
    };
  }

  componentDidMount = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };
  searchHandler = (products) => {
    this.setState({
      products,
    });
  };
  deleteHandler = (productId) => {
    this.setState({
      products: this.state.products.filter((product) => {
        return product._id !== productId.data._id;
      }),
    });
  };
  render() {
    const { products, images, users } = this.state;

    return <Profile products={products} images={images} users={users} />;
  }
}
export function Profile({ users, images, products, title, setTitle }) {
  const intl = useIntl();
  const { currentUser } = useContext(AuthContext);
  const Admin = currentUser ? Admins(currentUser.email) : false;
  // const [user, setuser] = useState(null);
  const [photo, setphoto] = useState(null);

  const user = users.find(
    (usr) =>
      usr["email"] === currentUser.email.toUpperCase() ||
      (usr["email"] === currentUser.email.toLowerCase() && usr["email"])
  );
  const name = currentUser
    ? currentUser.displayName
    : intl.formatMessage({ id: "welcome" });
  const email = currentUser ? currentUser.email : "Email";
  const image = currentUser ? currentUser.photoURL : user && user["image"];

  function getUserProducts() {
    let arr = [];
    user &&
      user["products"] &&
      console.log(user["products"], "stam") &&
      user["products"].map((product) =>
        arr.push(products.find((prod) => product.email === prod.ownerId))
      );
    return arr;
  }
  const deleteHandler = (productId) => {
    // setProducts(
    //   products.filter((product) => {
    //     return product._id !== productId.data._id;
    //   })
    // );
  };

  return (
    <Card className="userSettings">
      <Card.Header className="userHeader">
        {currentUser ? (
          <Card.Img
            style={{
              alignSelf: window.screen.width <= 800 ? "right" : "center",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
            variant="top"
            src={image}
          />
        ) : (
          <Avatar
            style={{
              alignSelf: window.screen.width <= 800 ? "right" : "center",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
        )}
        {/* <Person className="userPhoto" /> */}
        <Card.Title
          style={{
            margin: "1rem",
            width: "80%",
            color: "#147764",
            alignSelf: "center",
          }}
        >
          {name}
        </Card.Title>
        <Card.Subtitle>{email}</Card.Subtitle>
      </Card.Header>
      <Card.Body style={{ alignItems: "center" }}>
        <h1>My Products</h1>
        {products && (
          <CardList
            products={
              user ? products.filter((prod) => prod.ownerId === user.uid) : null
            }
            users={users}
            deleteHandler={deleteHandler}
          />
        )}
      </Card.Body>
    </Card>
  );
}
