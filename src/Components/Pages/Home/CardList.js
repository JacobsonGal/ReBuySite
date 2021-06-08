import React, { Component, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../API/API";
import styled from "styled-components";
import "react-table/index";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
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
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import PopUp from "../../Utils/PopUp";
import { AuthContext, Admins } from "../../SSO/Auth";
import Person from "@material-ui/icons/PersonRounded";

import { IoPinOutline } from "react-icons/io5";
import Alert from "../../Utils/Alert";
import rebuyProduct from "../../../Assets/Images/ReBuy.png";
import MediaQuery from "react-responsive";
import swal from "@sweetalert/with-react";

const auth = firebase.auth();
const firestore = firebase.firestore();

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

function UpdateProduct({ id }) {
  const history = useHistory();
  console.log(id, "btam");
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

    swal({
      title: "Are you sure?",
      text: `Do tou want to delete the product ${this.props.id} permanently?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        firestore
          .collection("products")
          .where("seconderyId", "==", this.props.id)
          .get()
          .then((Snapshot) => {
            Snapshot.forEach((doc) => {
              doc.ref.delete().then((res) => {
                this.props.deleteHandler(this.props.id);
                swal("Poof! Your Product has been deleted!", {
                  icon: "success",
                });
              });
            });
          })
          .catch((error) => {
            Alert(error.message);
          });
      } else {
        swal("Your Product file is safe!");
      }
    });
  };

  render() {
    return <Delete onClick={this.deleteUser}>DELETE</Delete>;
  }
}
const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.up("md")]: {
    root: {
      display: "flex",
      padding: "1rem",
      flexWrap: "wrap",
      width: "100%",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      overflow: "hidden",
      // backgroundColor: themeגק.palette.background.paper,
    },
    gridList: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
    },
    tile: {
      height: "100%",
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
  },
  [theme.breakpoints.down("md")]: {
    root: {
      direction: "ltr",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    gridList: {
      width: "100%",
      height: "100%",
    },
    icon: {
      color: "black",
    },
    tileBar: {
      backgroundColor: "rgba(255,255,255,0.7)",
      justifyContent: "center",
      color: "black",
      display: "flex",
    },
  },
}));

export default function CardList({
  products,
  images,
  users,
  deleteHandler,
  from,
  to,
}) {
  const classes = useStyles();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [product, setproduct] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [change, setChange] = useState(false);

  useEffect(() => {
    console.log(change);
  }, [change]);

  const user = users?.find(
    (usr) =>
      usr["email"] === currentUser.email.toUpperCase() ||
      (usr["email"] === currentUser.email.toLowerCase() && usr["email"])
  );

  function setData(product) {
    setproduct(product);
    let category = product.category;
    firestore
      .collection("users")
      // .where("email", "==", currentUser?.email)
      .where("email", "in", [
        currentUser?.email.toUpperCase(),
        currentUser?.email.toLowerCase(),
      ])
      .get()
      .then((Snapshot) => {
        Snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          let favCategory = doc.data().favCategory;
          console.log(favCategory);
          if (!favCategory) {
            console.log("new fav");
            let newfavCategory = [];
            newfavCategory.push({ key: category, val: 1 });
            doc.ref.update({
              favCategory: newfavCategory,
            });
          } else {
            let newfavCategory = [{}];
            let flag = false;
            newfavCategory = favCategory;
            console.log(newfavCategory);
            newfavCategory.forEach((cat) => {
              if (cat.key === category) {
                cat.val++;
                flag = true;
              }
            });
            if (flag === false) {
              newfavCategory.push({ key: category, val: 1 });
            }
            doc.ref.update({
              favCategory: newfavCategory,
            });
          }
        });
      })
      .catch((error) => {});
    setIsModelOpen(true);
  }

  return (
    <div className={classes.root}>
      <PopUp
        product={product}
        users={users}
        images={images}
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
      />
      <MediaQuery maxWidth={800}>
        <GridList cellHeight={200} className={classes.gridList}>
          {products &&
            products.map((product, i) => (
              <GridListTile key={i}>
                <Card
                  style={{
                    margin: "5px",
                    // width: "5rem",
                    // height: 500,
                    border: "1px solid #ececec",
                    borderRadius: "15px",
                    zIndex: 100,
                  }}
                  onClick={() => setData(product)}
                >
                  {product["photo"] ? (
                    <Carousel>
                      {product["photo"]
                        .toString()
                        .split(",")
                        .map((Image) => (
                          <Carousel.Item
                            style={{
                              width: "100%",
                              height: 200,
                            }}
                          >
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src={Image}
                              alt={Image}
                            />
                          </Carousel.Item>
                        ))}
                    </Carousel>
                  ) : (
                    <img
                      style={{ width: "100%", height: 200 }}
                      src={rebuyProduct}
                      alt={"rebuyProduct"}
                    />
                  )}{" "}
                </Card>
                <GridListTileBar
                  title={
                    <h6
                      style={{
                        font: "16px bold",
                        marginRight: "5rem",
                        color: "black",
                      }}
                    >
                      {product["name"].toUpperCase()}
                    </h6>
                  }
                  subtitle={
                    <>
                      <h8 style={{ marginRight: "5rem", color: "black" }}>
                        {product["price"]}₪
                      </h8>
                    </>
                  }
                  actionIcon={
                    <div>
                      {(user && user.uid === product.ownerId) ||
                      Admins(currentUser.email) ? (
                        <>
                          <Button size="medium" variant="primary">
                            <DeleteProduct
                              id={product["seconderyId"]}
                              deleteHandler={deleteHandler}
                            />
                          </Button>
                          <Button size="medium" variant="primary">
                            <UpdateProduct id={product["seconderyId"]} />
                          </Button>
                        </>
                      ) : user &&
                        user.favorites &&
                        user.favorites?.some((p) => {
                          return product.name === p.name;
                        }) ? (
                        <Button size="small" color="primary">
                          <Star
                            onClick={() => {
                              api.removeFromFavorites(user, product);
                              setChange((prev) => !prev);
                            }}
                          />
                        </Button>
                      ) : (
                        <Button size="small" color="primary">
                          <StarBorderIcon
                            onClick={() => {
                              api.addToFavorites(user, product);
                              setChange((prev) => !prev);
                            }}
                          />
                        </Button>
                      )}
                    </div>
                  }
                  className={classes.tileBar}
                />
              </GridListTile>
            ))}
        </GridList>
        <GridList className={classes.gridList} cols={3}></GridList>
      </MediaQuery>
      <MediaQuery minWidth={800}>
        {products &&
          products.map((product, i) => (
            <Card
              style={{
                margin: "5px",
                width: 300,
                border: "1px solid #ececec",
                borderRadius: "15px",
              }}
            >
              {product["photo"] ? (
                <Carousel>
                  {product["photo"]
                    .toString()
                    .split(",")
                    .map((Image) => (
                      <Carousel.Item
                        style={{
                          width: "100%",
                          height: 200,
                        }}
                      >
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={Image}
                          alt={Image}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              ) : (
                <img
                  style={{ width: "100%", height: 200 }}
                  src={rebuyProduct}
                  alt={"rebuyProduct"}
                />
              )}{" "}
              <CardActionArea
                onClick={() => setData(product)}
                // style={{
                //   height: 400,
                // }}
              >
                <CardContent>
                  <Typography>
                    <h4 style={{ font: "bold" }}>
                      {product["name"].toUpperCase()}
                    </h4>
                    <h5 style={{ color: "dodgerblue" }}>{product["price"]}₪</h5>
                    <p>{product["description"]}</p>
                    <p>
                      {product["address"]} <IoPinOutline />
                    </p>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {users?.some((user) => user._id === product["owner"]) && (
                      <div
                        style={{
                          backgroundColor: "#ececec",
                          borderRadius: "15px",
                        }}
                      >
                        <p>
                          {users?.some(
                            (user) => user.uid === product.ownerId
                          ) &&
                            users
                              .find((user) => user.uid === product.ownerId)
                              ["name"].toUpperCase()}
                          <Person />
                        </p>
                      </div>
                    )}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions style={{ justifyContent: "center", height: "2rem" }}>
                {(user && user.uid === product.ownerId) ||
                Admins(currentUser.email) ? (
                  <>
                    <Button size="small" color="primary">
                      <DeleteProduct
                        id={product["seconderyId"]}
                        deleteHandler={deleteHandler}
                      />
                    </Button>
                    <Button size="small" color="primary">
                      <UpdateProduct id={product["seconderyId"]} />
                    </Button>
                  </>
                ) : user &&
                  user.favorites &&
                  user.favorites?.some((p) => {
                    return product.name === p.name;
                  }) ? (
                  <Button size="small" color="primary">
                    <Star
                      onClick={() => {
                        api.removeFromFavorites(user, product);
                        setChange((prev) => !prev);
                      }}
                    />
                  </Button>
                ) : (
                  <Button size="small" color="primary">
                    <StarBorderIcon
                      onClick={() => {
                        api.addToFavorites(user, product);
                        setChange((prev) => !prev);
                      }}
                    />
                  </Button>
                )}
              </CardActions>
              {/* {console.log(user)} */}
            </Card>
          ))}
      </MediaQuery>
    </div>
  );
}
