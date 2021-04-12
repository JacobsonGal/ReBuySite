import React, { useState, useEffect, useRef } from "react";
import api from "../../../API/API";
import { Container, Card } from "react-bootstrap";

function Product() {
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);
  const [Images, setImages] = useState([]);
  const inputRef = useRef(null);
  const varRed = useRef(Images.length);

  useEffect(() => {
    inputRef.current.focus();
    async function fetchData() {
      if (product === null) {
        setId(window.location.href.split("product/")[1]);
        // console.log("id", id);
        if (id) {
          const newProduct = await api.getProductById(id);
          // const imgArr = await api.getAllImages();
          await api.getAllImages().then((image) => {
            setImages(image.data);
          });
          // const imgArr = [];
          // newProduct.data["images"] &&
          //   newProduct.data["images"].map((image) => {
          //     console.log(image);
          //     const newImage = api.getProductImagesById(image);
          //     imgArr.push(newImage);
          //   });
          setProduct(newProduct.data);
          // setImages(imgArr.data.data);
        }
      }
      // if (product) {
      //   let imgArr = [];
      //   product.data["images"].map((image) => {
      //     console.log(image);
      //     const newImage = api.getProductImagesById(image);
      //     imgArr.push(newImage);
      //   });
      //   // const newImages = await api.getProductImagesById(id);
      //   setImages(imgArr);
      //   console.log("Images : " + imgArr);
      //   // console.log("Images : " + Images);
      // }
    }

    fetchData();
  }, [id, product, Images]);

  return (
    product && (
      <Container className="mt-5">
        <h1>{product.data.name}</h1>
        {console.log("Images : " + Images.data)}
        {product.data["images"].map((image) => {
          return (
            <img
              style={{ width: "300px" }}
              src={`http://localhost:3000/${image}`}
            />
          );
        })}
        {/* {product.data["images"].map((image) => {
          return (
            <img
              style={{ width: "300px" }}
              src={`http://localhost:3000/${image}`}
            />
          );
        })} */}
        <Card>
          <Card.Body>{product.data.description}</Card.Body>
          <Card.Body>{product.data.condition}</Card.Body>
          <Card.Body>{product.data.price} NIS</Card.Body>
          <Card.Body>from {product.data.address}</Card.Body>
        </Card>
      </Container>
    )
  );
}

export default Product;
