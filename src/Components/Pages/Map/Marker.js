import React from "react";
import { Button } from "@material-ui/core";
import reBuy from "../../../Assets/Images/ReBuyLogoBig.png";
import Carousel from "react-bootstrap/Carousel";
import { random } from "lodash";

export default function Marker({
  product,
  images,
  users,
  setIsModelOpen,
  setData,
  navigate,
  $hover,
}) {
  function setProduct(product) {
    setData(product);
    setIsModelOpen(true);
  }

  return (
    <div>
      <Button size="small" onClick={() => setProduct(product)}>
        {product["photo"] && images ? (
          <Carousel style={{ width: "3rem", height: "3rem" }}>
            {product["photo"]
              .toString()
              .split(",")
              .map((Image) => (
                <Carousel.Item
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "30px",
                  }}
                  key={random(0, 10000)}
                >
                  <img
                    className="d-block w-100"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "15px",
                    }}
                    src={Image}
                    alt={Image}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        ) : (
          <img src={reBuy} alt="marker" className={"circleImg"} />
        )}
      </Button>
    </div>
  );
}
