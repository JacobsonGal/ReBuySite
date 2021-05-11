import React, { Component, useState, useContext } from "react";
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
import { AuthContext, Admins } from "../../SSO/Auth";

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
      console.log("after res");
      // window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>DELETE</Delete>;
  }
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    width: "100%",
    direction: "ltr",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
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
  const user = users.find(
    (usr) =>
      usr["email"] === currentUser.email.toUpperCase() ||
      (usr["email"] === currentUser.email.toLowerCase() && usr["email"])
  );

  function setData(product) {
    setproduct(product);
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
      <GridList className={classes.gridList} cols={3}>
        {products &&
          products.slice(from, to).map(
            (product, i) =>
              product && (
                <GridListTile
                  style={{ height: "100%", width: "fit-content" }}
                  key={product["name"]}
                >
                  {/* <PopUp
                product={product}
                users={users}
                images={images}
                isModelOpen={isModelOpen}
                setIsModelOpen={setIsModelOpen}
              /> */}
                  <Card
                    style={{
                      margin: "1rem",
                      width: 250,
                      minHeight: 400,
                      maxHeight: "fit-content",
                      border: "1px solid #ececec",
                      borderRadius: "15px",
                    }}
                  >
                    {product["images"] && images && (
                      <Carousel>
                        {images.map(
                          (Image) =>
                            product["images"].some(
                              (id) => id === Image._id
                            ) && (
                              <Carousel.Item
                                style={{ width: "100%", height: "10rem" }}
                              >
                                <img
                                  className="d-block w-100"
                                  style={{ width: "100%", height: "100%" }}
                                  src={`data:${Image["contentType"]};base64,${Image["imageBase64"]}`}
                                  alt={Image["fileName"]}
                                />
                              </Carousel.Item>
                            )
                        )}
                      </Carousel>
                    )}{" "}
                    <CardActionArea

                    >
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {/* <p>{product["name"]}</p>    */}
                          <p
                            style={{
                              height: "3rem",
                              overflow: "scroll",
                              justifyContent: "center",
                            }}
                          >
                            {product["name"]}
                          </p>
                          <p>{product["price"]}₪</p>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {users.some(
                            (user) => user._id === product["owner"]
                          ) && (
                              <div
                                style={{
                                  backgroundColor: "#ececec",
                                  borderRadius: "15px",
                                  font: "15px assistant bold",
                                }}
                              >
                                <p>
                                  {
                                    users.find(
                                      (user) => user._id === product["owner"]
                                    )["name"]
                                  }
                                </p>
                                <p>
                                  Phone:{" "}
                                  {
                                    users.find(
                                      (user) => user._id === product["owner"]
                                    )["phone"]
                                  }
                                </p>
                              </div>
                            )}
                          <p>Description: {product["description"]}</p>
                          <p>Condition: {product["condition"]}</p>
                          <p>Category: {product["category"]}</p>
                          <p>Address: {product["address"]}</p>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {user && user["products"].some((id) => id === product._id) && (
                      <CardActions
                        style={{ justifyContent: "center", height: 50 }}
                      >
                        <Button size="small" color="primary">
                          <DeleteProduct
                            id={product["_id"]}
                            deleteHandler={deleteHandler}
                          />
                        </Button>
                        {/* <Button size="small" color="primary">
                    <StarBorderIcon />
                  </Button> */}
                        <Button size="small" color="primary">
                          <UpdateProduct id={product["_id"]} />
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </GridListTile>
              )
          )}
      </GridList>
    </div>
  );
}
