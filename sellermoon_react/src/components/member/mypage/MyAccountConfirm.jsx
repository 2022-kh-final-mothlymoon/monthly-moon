import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkMem } from "../../../service/dbLogic";
import { BROWN_BTN2, CONTENTS } from "../../../styles/NoticeStyle";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import NavbarMypage from "../Common/NavbarMypage";
import SidebarMypage from "../Common/SidebarMypage";

const MyAccountConfirm = ({ no, isLogin, logout, myPoint, mySubs }) => {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleInputPw = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const chkPass = (e) => {
    e.preventDefault();
    checkMem({ member_no: no, member_password: password }).then((res) => {
      console.log(res.data);
      console.log(res.data.member_no);
      if (password !== res.data.member_password) {
        alert("비밀번호가 확인되었습니다!");
        navigate("/mypage/modifyprofile");
      } else {
        alert("비밀번호를 확인해주세요!");
      }
    });
  };
  return (
    <>
      <Header isLogin={isLogin} logout={logout} />
      <div className="container">
        <CONTENTS className="row">
          <SidebarMypage />
          <div className="col-9">
            <div className="list-wrapper">
              <NavbarMypage myPoint={myPoint} mySubs={mySubs} />
              <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>
                비밀번호 확인
              </p>
              <div className="mb-4 mt-3 row">
                <label className="col-sm-2 col-form-label mt-2">비밀번호</label>
                <div className="col-sm-5">
                  <input
                    type="password"
                    className="form-control mt-2"
                    placeholder="정보보호를 위해 비밀번호를 확인합니다."
                    name="member_password"
                    value={password}
                    onChange={handleInputPw}
                  />
                </div>
                <BROWN_BTN2 variant="warning" onClick={chkPass}>
                  비밀번호 확인
                </BROWN_BTN2>
              </div>
            </div>
          </div>
        </CONTENTS>
      </div>

      <Footer />
    </>
  );
};

export default MyAccountConfirm;
