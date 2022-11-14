import React, { useEffect, useState } from "react";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Login from "../Common/Login";
import { BOX, CONTAINER_TAB } from "../../../styles/MainStyle";

const AMain = () => {
  return (
    <>
      {/* <Login /> */}
      <Header />
      <CONTAINER_TAB></CONTAINER_TAB>
      <Footer />
    </>
  );
};

export default AMain;
