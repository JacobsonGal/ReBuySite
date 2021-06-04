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
import Page from "../../Utils/Page";

export default function ProfileSetting({ title, setTitle, intl }) {
  const [loading, setLoading] = useState(false);
  // console.log(loading);
  return (
    <Page
      loading={loading}
      title={title}
      color={"#fdeded"}
      setTitle={setTitle}
      add={false}
      FAB="none"
      dots={false}
    >
      <ProfileSettings loading={loading} setLoading={setLoading} intl={intl} />
    </Page>
  );
}

export class ProfileSettings extends Component {
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
    console.log("loading settings");
    console.log(this.state.isLoading);
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
    this.state.setLoading(false);
    console.log(this.state.isLoading);
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
    const { products, images, users, setLoading } = this.state;

    return (
      <Profile
        products={products}
        images={images}
        users={users}
        setLoading={setLoading}
      />
    );
  }
}
export function Profile({
  users,
  images,
  products,
  title,
  setTitle,
  setLoading,
}) {
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
  const image = currentUser
    ? currentUser.photoURL
    : user && user["image"]
    ? user["image"]
    : null;

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
        <Avatar
          style={{
            alignSelf: window.screen.width <= 800 ? "right" : "center",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}
          variant="rounded"
          src={image ? image : ""}
        >
          {user
            ? user.name.toString().split(" ")[0][0].toUpperCase() +
              user.name.toString().split(" ")[1][0].toUpperCase()
            : null}
        </Avatar>
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
        <h1>{intl.formatMessage({ id: "MyProducts" })}</h1>
        {products &&
        user &&
        products.filter((prod) => prod.ownerId === user.uid).length > 0 ? (
          <CardList
            products={
              user ? products.filter((prod) => prod.ownerId === user.uid) : null
            }
            users={users}
            deleteHandler={deleteHandler}
          />
        ) : (
          <Card
            style={{
              width: "100%",
              height: "50%",
              borderRadius: "35px",
              alignItems: "center",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              backgroundColor: "rgba(0,0,50,0.1)",
            }}
          >
            <p> אין לך מוצרים עדיין ! </p>
            <p>אפשר להוסיף אותם בלחיצה על "העלה" באזור הניווט</p>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
}
