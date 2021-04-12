import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import reBuy from "../../Assets/Images/ReBuyLogoBig.png";
import Modal from "react-modal";
import { IoPinOutline } from "react-icons/io5";

export default function Marker({ product, setIsModelOpen, isModelOpen }) {
  let img = product["image"]
    ? `http://localhost:3000/${product["images"][0]}`
    : reBuy;

  return (
    <div>
      <Modal
        style={{
          overlay: {
            zIndex: "999",
            margin: "auto",
          },
          content: {
            inset: "0px",
            height: "fit-content",
            width: "fit-content",
            direction: "rtl",
            padding: "10px",
            margin: "auto",
            borderRadius: "15px",
            boxShadow: "1px 1px 5px 1px #e5eefa",
          },
        }}
        isOpen={isModelOpen}
        onRequestClose={() => setIsModelOpen(false)}
      >
        {product && (
          <Card
            style={{
              width: "20rem",
              height: "20rem",
              border: "1px solid #ececec",
              borderRadius: "15px",
            }}
          >
            <CardActionArea>
              <CardMedia
                image={`http://localhost:3000/${product["images"][0]}`}
                title="Contemplative Reptile"
                style={{ height: 140 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  <p>{product["name"]}</p>
                  <p>{product["price"]}</p>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <p>Seller:{product["ownerId"]}</p>
                  <p>Description:{product["description"]}</p>
                  <p>Condition:{product["condition"]}</p>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
      </Modal>
    </div>
  );
}
