import React, { Children, useState } from "react";
import { useIntl } from "react-intl";
import PageBody from "./PageBody";
import LoadingOverlay from "react-loading-overlay";
// import Guest from "../../Redux/userControl";
import icon from "../../Assets/Logo/ReBuyLogoTrans.png";

export default function Page({
  onlyTop,
  data,
  title,
  setTitle,
  color,
  boldPar,
  par,
  pic,
  to,
  button,
  children,
  loading,
  setEdit,
  edit,
  share,
  setShare,
  dots,
  editdisabled,
  add,
  FAB,
  print,
  setPrint,
  printArr,
  setPrintArr,
  dataArr,
  main,
  shareRecord,
  type,
}) {
  const intl = useIntl();
  document.title = "ReBuy | " + title;
  setTitle(title);
  function Body() {
    return children ? (
      children
    ) : !loading ? (
      <PageBody
        data={data}
        color={color}
        boldPar={boldPar}
        par={par}
        pic={pic}
        to={to}
        button={button}
      />
    ) : null;
  }

  return (
    <div>
      <LoadingOverlay
        active={loading}
        spinner={<img src={icon} className="pageLoader" alt="loader" />}
        styles={{
          wrapper: {},
          overlay: (base) => ({
            ...base,
            height: "110%",
            backgroundColor: "#f5f7fb",
            opacity: "0.7",
          }),
        }}
      >
        {!loading ? (
          <div className="page">
            <Body />
          </div>
        ) : null}
      </LoadingOverlay>
    </div>
  );
}
