import React, { Component, useState, useContext } from "react";
import { AuthContext } from "../../SSO/Auth";
import { useIntl } from "react-intl";
import { Card } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import api from "../../../API/API";
import CardList from "../Home/CardList";
import Page from "../../Utils/Page";
import Alert from "../../Utils/Alert";
import { DeleteProduct } from "../../Utils/Handlers";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
const storage = firebase.storage();

export default function ProfileSetting({
  title,
  setTitle,
  intl,
  user,
  setUser,
  name,
  setName,
  image,
  setImage,
}) {
  const [loading, setLoading] = useState(true);
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
      <ProfileSettings
        loading={loading}
        setLoading={setLoading}
        intl={intl}
        user={user}
        setUser={setUser}
        name={name}
        setName={setName}
        image={image}
        setImage={setImage}
      />
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
      user: props.user,
      setUser: props.setUser,
      name: props.name,
      setName: props.setName,
      image: props.image,
      setImage: props.setImage,
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
      this.state.setLoading(false);
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
    const {
      products,
      images,
      users,
      setLoading,
      user,
      setUser,
      name,
      setName,
      image,
      setImage,
    } = this.state;

    return (
      <Profile
        products={products}
        images={images}
        users={users}
        setLoading={setLoading}
        user={user}
        setUser={setUser}
        name={name}
        setName={setName}
        image={image}
        setImage={setImage}
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
  user,
  setUser,
  name,
  setName,
  image,
  setImage,
}) {
  const intl = useIntl();
  const { currentUser } = useContext(AuthContext);
  const email = useState(currentUser ? currentUser.email : "Email");
  const [nameChange, setNameChange] = useState(false);

  async function handleChangeInputImages(event) {
    return Promise.all(
      [...event.target.files].map((image) => {
        storage
          .ref(`users/${image.name}`)
          .put(image)
          .on(
            "state_changed",
            () => {},
            (error) => {
              console.log(error);
            },
            () =>
              storage
                .ref("users")
                .child(image.name)
                .getDownloadURL()
                .then(async (url) => {
                  let data = new FormData();
                  data.append("image", url);
                  await api
                    .updateUserById(currentUser?.email, data)
                    .then((res) => {
                      Alert("Image changed!", true);
                    })
                    .catch((error) => {
                      Alert(error.message);
                    });
                  setImage(url);
                })
          );
      })
    );
  }
  async function handleChangeInputName(event) {
    const newName = event.target.value;
    let data = new FormData();
    data.append("name", newName);
    await api
      .updateUserById(currentUser?.email, data)
      .then((res) => {
        Alert("Name changed!", true);
      })
      .catch((error) => {
        Alert(error.message);
      });
    setName(newName);
    setNameChange(false);
  }
  return (
    <Card className="userSettings" style={{ border: "0px" }}>
      <Card.Header className="userHeader">
        <label
          style={{
            border: "1pxsolid#ccc",
            display: "inline-block",
            padding: "6px12px",
            cursor: "pointer",
          }}
        >
          <input
            type="file"
            onChange={handleChangeInputImages}
            style={{ display: "none" }}
          />
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
            {/* {user
              ? user.name.toString().split(" ")[0][0].toUpperCase() +
                user.name.toString().split(" ")[1][0].toUpperCase()
              : null} */}
          </Avatar>
        </label>
        {/* </Button> */}

        <Card.Title
          style={{
            margin: "1rem",
            width: "80%",
            color: "#147764",
            alignSelf: "center",
          }}
        >
          <label
            style={{
              border: "1pxsolid#ccc",
              display: "inline-block",
              padding: "6px12px",
              cursor: "pointer",
            }}
          >
            <input
              type="text"
              onClick={() => setNameChange(true)}
              // onChange={handleChangeInputName}
              onKeyDown={(e) => e.keyCode === 13 && handleChangeInputName(e)}
              style={{ display: !nameChange ? "none" : "flex" }}
            />
            {!nameChange && name}
          </label>
        </Card.Title>
        <Card.Subtitle>{email}</Card.Subtitle>
      </Card.Header>
      <Card.Body
        style={{ alignItems: "center", width: "100%", height: "100%" }}
      >
        <h1>{intl.formatMessage({ id: "MyProducts" })}</h1>
        {products &&
        user &&
        products.filter((prod) => prod.ownerId === user.uid).length > 0 ? (
          <CardList
            products={
              user ? products.filter((prod) => prod.ownerId === user.uid) : null
            }
            users={users}
            deleteHandler={DeleteProduct}
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
