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
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBView,
  MDBIcon,
} from "mdbreact";

import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import PopUp from "../../Utils/PopUp";
import { AuthContext, Admins } from "../../SSO/Auth";
import Person from "@material-ui/icons/PersonRounded";
import Phone from "@material-ui/icons/Phone";
import WhatsApp from "@material-ui/icons/WhatsApp";
import ReactWhatsapp from "react-whatsapp";
import { IoPinOutline } from "react-icons/io5";

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
          this.props.deleteHandler(this.props.id);
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
    padding: "2rem",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: " space-around",
    textAlign: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
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
      {/* <GridList className={classes.gridList} cols={3}> */}
      {products &&
        products.map((product, i) => (
          // <GridListTile
          //   style={{ height: "100%", width: "fit-content" }}
          //   key={product["name"]}
          // >
          <CardEx
            product={product}
            users={users}
            user={user}
            setData={setData}
            deleteHandler={deleteHandler}
          />
        ))}
    </div>
  );
}

function CardEx({ product, users, user, setData, deleteHandler }) {
  return (
    <MDBRow>
      <MDBCol md="4">
        <MDBCard wide cascade>
          <MDBView wide cascade onClick={() => setData(product)}>
            {product["photo"] && (
              <Carousel>
                {product["photo"]
                  .toString()
                  .split(",")
                  .map((Image) => (
                    <Carousel.Item>
                      <MDBCardImage
                        hover
                        overlay="white-slight"
                        className="card-img-top"
                        src={Image}
                        alt={Image}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            )}{" "}
          </MDBView>
          <MDBCardBody cascade className="text-center">
            <MDBCardTitle className="card-title">
              <strong>{product["name"]}</strong>
            </MDBCardTitle>

            <p className="font-weight-bold blue-text">{product["price"]}₪</p>

            <MDBCardText>
              {product["description"]}
              <p>
                {product["address"]} <IoPinOutline />
              </p>
            </MDBCardText>
            <Typography variant="body2" color="textSecondary" component="p">
              {users.some((user) => user._id === product["owner"]) && (
                <div
                  style={{
                    backgroundColor: "#ececec",
                    borderRadius: "15px",
                  }}
                >
                  <p>
                    {users
                      .find((user) => user.uid === product.ownerId)
                      ["name"].toUpperCase()}
                    <Person />
                  </p>
                </div>
              )}
            </Typography>

            {user && user.uid === product.ownerId ? (
              <MDBCol md="12" className="d-flex justify-content-center">
                <Button size="small" color="primary">
                  <DeleteProduct
                    id={product["name"]}
                    deleteHandler={deleteHandler}
                  />
                </Button>

                <Button size="small" color="primary">
                  <StarBorderIcon onClick={() => console.log(user)} />
                </Button>

                <Button size="small" color="primary">
                  <UpdateProduct id={product["_id"]} />
                </Button>
              </MDBCol>
            ) : (
              <Button size="small" color="primary">
                <StarBorderIcon
                  onClick={() => api.addToFavorites(user, product)}
                />
              </Button>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}
