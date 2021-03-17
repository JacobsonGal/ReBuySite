import React, { useState, useRef, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import SharePop from "./SharePop";
import Modal from "react-modal";
import MediaQuery from "react-responsive";

export default function Share({ modalIsOpen, setModalIsOpen }) {
  const quitPopUp = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <MediaQuery maxWidth={800}>
        <div
          style={{
            height: "100%",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Modal
            style={{
              overlay: {},
              content: {
                inset: "0px",
                height: "fit-content",
                direction: "rtl",
                marginTop: "57px",
                borderRadius: "15px",
                boxShadow: "1px 1px 5px 1px #e5eefa",
              },
            }}
            isOpen={modalIsOpen}
            onRequestClose={quitPopUp}
          >
            <SharePop quitPopUp={quitPopUp} />
          </Modal>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={800}>
        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Modal
            style={{
              overlay: {},
              content: {
                inset: "0px",
                height: "fit-content",
                width: "40%",
                direction: "rtl",
                margin: "auto",
                borderRadius: "15px",
                boxShadow: "1px 1px 5px 1px #e5eefa",
              },
            }}
            isOpen={modalIsOpen}
            onRequestClose={quitPopUp}
          >
            <SharePop />
          </Modal>
        </div>
      </MediaQuery>
    </div>
  );
}
