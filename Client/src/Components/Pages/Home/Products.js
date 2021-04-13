import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../API/API";
import styled from "styled-components";
import "react-table/index";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Search from "./Search";
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
<<<<<<< HEAD
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import PopUp from "../../Utils/PopUp";
=======
>>>>>>> parent of 413847f86 (3 models and pictures)

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

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      columns: [],
      isLoading: this.props.loading,
      imagePath: "",
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    try {
      await api.getAllProducts().then((product) => {
        this.setState({
          products: product.data.data,
        });
        this.props.setLoading(false);
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
    const { products, isLoading } = this.state;
    return (
      <Wrapper>
        <h1>Market</h1>
        <Search searchHandler={this.searchHandler} />
        <Sort searchHandler={this.searchHandler} />
<<<<<<< HEAD
        <CardLine
          products={products}
          images={images}
          deleteHandler={this.deleteHandler}
        />
=======
        <CardLine products={products} deleteHandler={this.deleteHandler} />
        <h1>Suggested just for you</h1>
        <CardLine products={products} />
>>>>>>> parent of 413847f86 (3 models and pictures)
      </Wrapper>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // width: "100%",
    // height: "100%",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    direction: "ltr",
  },
  gridList: {
    // height: "100%",
    // width: "100%",
    flexWrap: "nowrap",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
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

function CardLine({ products, deleteHandler }) {
  const history = useHistory();
  const cardOnClickHandler = (e, id) => {
    // history.push(`/product/${id}`);
  };
  const classes = useStyles();
<<<<<<< HEAD
  const [isModelOpen, setIsModelOpen] = useState(false);

  function productImages(product) {
    let arr = [];
    product["images"].map((src) => {
      let temp = images.find((element) => element["_id"] === src);
      return temp && arr.push(temp);
    });
    return arr;
  }
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2}>
        {products &&
          products.map((product, i) => (
            <GridListTile
              style={{ height: "100%", maxWidth: 300, minWidth: 100 }}
              key={product["name"]}
            >
              <PopUp
                product={product}
                isModelOpen={isModelOpen}
                setIsModelOpen={setIsModelOpen}
              />
              <Card
                style={{
                  margin: "1rem",
                  maxWidth: 300,
                  minWidth: 100,
=======
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {products &&
          products.map((product) => (
            <GridListTile style={{ height: "100%" }} key={product["name"]}>
              <Card
                style={{
                  margin: "1rem",
                  maxWidth: 600,
>>>>>>> parent of 413847f86 (3 models and pictures)
                  height: "fit-content",
                  border: "1px solid #ececec",
                  borderRadius: "15px",
                }}
              >
<<<<<<< HEAD
                {product["images"] && images[0] && (
                  // productImages(product).map((img) => {
                  //   return (
                  //     <CardMedia
                  //       image={`data:${images[0]["contentType"]};base64,${images[0]["imageBase64"]}`}
                  //       // image={`data:${img["contentType"]};base64,${img["imageBase64"]}`}
                  //       title="Contemplative Reptile"
                  //       style={{ height: 140 }}
                  //     />
                  //   );
                  // })
                  // <CardMedia
                  //   image={`data:${images[i % 5]["contentType"]};base64,${
                  //     images[i % 5]["imageBase64"]
                  //   }`}
                  //   // image={`data:${img["contentType"]};base64,${img["imageBase64"]}`}
                  //   title="Contemplative Reptile"
                  //   style={{ height: 140 }}
                  // />
                  <SingleLineGridList images={images} />
                  // <SingleLineGridList images={productImages(product)} />
                )}{" "}
                <CardActionArea
                  // onClick={(e) => cardOnClickHandler(e, product["_id"])}
                  onClick={() => setIsModelOpen(true)}
                >
=======
                {" "}
                <CardActionArea
                  onClick={(e) => cardOnClickHandler(e, product["_id"])}
                >
                  <CardMedia
                    image={`http://localhost:3000/${product["images"][0]}`}
                    title="Contemplative Reptile"
                    style={{ height: 140 }}
                  />
>>>>>>> parent of 413847f86 (3 models and pictures)
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      <p>{product["name"]}</p>
                      <p>{product["price"]}</p>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {/* <p>Seller:{product["ownerId"]}</p> */}
<<<<<<< HEAD
                      <p>Description:{product["description"]}</p>
=======
                      {/* <p>Description:{product["description"]}</p> */}
>>>>>>> parent of 413847f86 (3 models and pictures)
                      <p>Condition:{product["condition"]}</p>
                      <p>Address:{product["address"]}</p>
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
<<<<<<< HEAD

function SingleLineGridList({ images }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Carousel>
        {images.map((Image) => (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`data:${Image["contentType"]};base64,${Image["imageBase64"]}`}
              alt={Image["fileName"]}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

// function SingleLineGridList({ images }) {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       {/* <GridList className={classes.gridList} cols={1}> */}
//       <Carousel>
//         {images.map((Image) => (
//           <Carousel.Item>
//             <img
//               className="d-block w-100"
//               src={`data:${Image["contentType"]};base64,${Image["imageBase64"]}`}
//               alt={Image["fileName"]}
//             />
//           </Carousel.Item>

//           // <GridListTile key={Image["_id"].img}>
//           //   <img
//           //     src={`data:${Image["contentType"]};base64,${Image["imageBase64"]}`}
//           //     alt={Image["fileName"]}
//           //   />
//           //   {/* <GridListTileBar
//           //     title={Image["fileName"]}
//           //     classes={{
//           //       root: classes.titleBar,
//           //       title: classes.title,
//           //     }}
//           //     actionIcon={
//           //       <IconButton aria-label={`star ${Image["fileName"]}`}>
//           //         <StarBorderIcon className={classes.title} />
//           //       </IconButton>
//           //     }
//           //   /> */}
//           // </GridListTile>
//         ))}
//       </Carousel>
//       {/* </GridList> */}
//     </div>
//   );
// }
=======
>>>>>>> parent of 413847f86 (3 models and pictures)
