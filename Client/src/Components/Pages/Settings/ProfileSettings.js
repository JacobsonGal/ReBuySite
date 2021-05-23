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
    // this.state.setLoading(false);
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
      await api.getAllImages().then((image) => {
        this.setState({
          images: image.data.data,
        });
      });

      // this.state.setLoading(false);
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

  console.log(images, users);
  const user = users.find(
    (usr) =>
      usr["email"] === currentUser.email.toUpperCase() ||
      (usr["email"] === currentUser.email.toLowerCase() && usr["email"])
  );
  // const img =
  //   images &&
  //   images["image"] &&
  //   images.find((img) => img._id === user["image"]);

  const name = currentUser
    ? currentUser.displayName
    : intl.formatMessage({ id: "welcome" });
  const email = currentUser ? currentUser.email : "Email";

  // user && user["products"] && setUserProducts(user["products"].find((prodId) => prodId === products["image"] user["products"]);

  async function getUserPhoto() {
    const image = user ? await apis.getImageById(user["image"]) : "";
    console.log(image);
    const photo = image
      ? `data:${image.data.data["contentType"]};base64,${image.data.data["imageBase64"]}`
      : "";
    // console.log(photo);
    return photo;
  }

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

  console.log(products);
  console.log(user);
  // console.log(photo);
  // console.log(userProducts);
  const deleteHandler = (productId) => {
    // setProducts(
    //   products.filter((product) => {
    //     return product._id !== productId.data._id;
    //   })
    // );
  };

  return (
    <>
      {Admin ? (
        <iframe
          src="http://localhost:4200"
          title="Admin"
          style={{
            width: "102%",
            height: "102%",
            margin: "-5px",
            marginRight: "-1.5rem",
          }}
        />
      ) : (
        <Card className="userSettings">
          <Card.Header className="userHeader">
            {user && user["image"] && photo ? (
              <Card.Img
                style={{
                  alignSelf: window.screen.width <= 800 ? "right" : "center",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
                variant="top"
                src={photo}
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
                  user
                    ? products.filter((prod) => prod.ownerId === user.email)
                    : null
                }
                images={images}
                users={users}
                from={0}
                to={getUserProducts().length}
                deleteHandler={deleteHandler}
              />
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
}
