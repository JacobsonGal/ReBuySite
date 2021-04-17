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
          console.log("stam");
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

export default class ProductsList extends Component {
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
      await api.getAllImages().then((image) => {
        this.setState({
          images: image.data.data,
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
    const { products, images, users } = this.state;
    // console.log(users);

    return (
      <Wrapper>
        <h1>Market</h1>
        <Search searchHandler={this.searchHandler} />
        {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Sort searchHandler={this.searchHandler} />
          <Groupby searchHandler={this.searchHandler} />
        </div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Sort searchHandler={this.searchHandler} />
          <Groupby searchHandler={this.searchHandler} />
        </div>

        <CardLine
          products={products}
          images={images}
          users={users}
          deleteHandler={this.deleteHandler}
          from={0}
          to={50}
        />
        <CardLine
          products={products}
          images={images}
          users={users}
          deleteHandler={this.deleteHandler}
          from={50}
          to={100}
        />
        {this.props.setLoading(false)}
      </Wrapper>
    );
  }
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
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

export function CardLine({ products, images, users, deleteHandler, from, to }) {
  const classes = useStyles();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [product, setproduct] = useState(null);

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
          products.slice(from, to).map((product, i) => (
            <GridListTile
              style={{ height: "100%", width: "fit-content" }}
              key={product["name"]}
            >
              <Card
                style={{
                  margin: "1rem",
                  maxWidth: 300,
                  minWidth: 100,
                  height: "fit-content",
                  border: "1px solid #ececec",
                  borderRadius: "15px",
                }}
              >
                {product["images"] && images && (
                  <Carousel>
                    {images.map(
                      (Image) =>
                        product["images"].some((id) => id === Image._id) && (
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
                  // onClick={(e) => cardOnClickHandler(e, product["_id"])}
                  onClick={() => setData(product)}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {/* <p>{product["name"]}</p>    */}
                      <p
                        style={{
                          height: "6rem",
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
                      {users.some((user) => user._id === product["owner"]) && (
                        <div
                          style={{
                            backgroundColor: "#ececec",
                            borderRadius: "15px",
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
                <CardActions style={{ justifyContent: "center" }}>
                  <Button size="small" color="primary">
                    <DeleteProduct
                      id={product["_id"]}
                      deleteHandler={deleteHandler}
                    />
                  </Button>
                  <Button size="small" color="primary">
                    <StarBorderIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <UpdateProduct id={product["_id"]} />
                  </Button>
                </CardActions>
              </Card>
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}
