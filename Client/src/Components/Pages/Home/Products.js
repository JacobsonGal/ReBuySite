import React, { Component } from "react";
import api from "../../../API/API";
import styled from "styled-components";
import "react-table/index";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
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

class UpdateProduct extends Component {
  updateUser = (event) => {
    event.preventDefault();

    window.location.href = `/Update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

class DeleteProduct extends Component {
  deleteUser = (event) => {
    event.preventDefault();

    if (
      window.confirm(
        `Do tou want to delete the product ${this.props.id} permanently?`
      )
    ) {
      api.deleteProductById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
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
        console.log(product.data.data);
        this.setState({
          products: product.data.data,
        });
        this.props.setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { products, isLoading } = this.state;
    console.log("Products", products);
    return (
      <Wrapper>
        <h1>Market</h1>
        <CardLine products={products} />
        <h1>Suggested just for you</h1>
        <CardLine products={products} />
      </Wrapper>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    height: "100%",
    width: "100%",
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

function CardLine({ products }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {products &&
          products.map((product) => (
            <GridListTile style={{ height: "100%" }} key={product["name"]}>
              <Card
                style={{
                  margin: "1rem",
                  maxWidth: 200,
                  height: "fit-content",
                  border: "1px solid #ececec",
                  borderRadius: "15px",
                }}
              >
                {" "}
                {console.log(product["image"])}
                <CardActionArea>
                  {product["image"] && (
                    <CardMedia
                      image={`/${product["image"].split("public/")[1]}`}
                      title="Contemplative Reptile"
                      style={{ height: 140 }}
                    />
                  )}
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
                      {/* <p>Description:{product["description"]}</p> */}
                      <p>Condition:{product["condition"]}</p>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions style={{ justifyContent: "center" }}>
                  <Button size="small" color="primary">
                    <DeleteProduct id={product["_id"]} />
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
