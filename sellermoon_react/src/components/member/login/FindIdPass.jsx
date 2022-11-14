import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FindPass from "./FindPass";
import Header from "./../Common/Header";
import Footer from "./../Common/Footer";
import { LDIVV } from "./../../../styles/LoginStyle";
import { P_STRONG, P_SMALL } from "./../../../styles/SubStyle";
import { FORM } from "./../../../styles/PaymentStyle";
import { BROWN_BTN2 } from "../../../styles/NoticeStyle";
import { findMemberEmail } from "../../../service/dbLogic";

const FindIdPass = (props) => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleInputId = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handleInputName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleInputPhone = (e) => {
    console.log(e.target.value);
    setPhone(e.target.value);
  };

  // 이메일 찾기 버튼
  const findEmail = (e) => {
    e.preventDefault();
    findMemberEmail({ member_name: name, member_phone: phone }).then((res) => {
      console.log(res);
      console.log(res.data);
      if (res.data === null) {
        alert("가입된 이메일이 없습니다.");
      } else {
        setEmail(res.data.member_email);
      }
    });
  };

  return (
    <>
      <Header />

      <br />

      <LDIVV>
        <P_STRONG>아이디 / 비밀번호 찾기</P_STRONG>

        <FORM>
          <P_SMALL>아이디 찾기</P_SMALL>
          <div className="mb-3 mt-3 row">
            <label className="col-sm-2 col-form-label">이름</label>
            <div className="col-sm-5">
              <input
                type="text"
                name="member_name"
                value={name}
                onChange={handleInputName}
                placeholder="이름"
                className="form-control"
              />
            </div>
          </div>

          <div className="mb-3 mt-3 row">
            <label className="col-sm-2 col-form-label">전화번호</label>
            <div className="col-sm-5">
              <input
                type="text"
                name="member_phone"
                value={phone}
                onChange={handleInputPhone}
                placeholder="전화번호"
                className="form-control"
              />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <BROWN_BTN2 onClick={findEmail}>아이디 찾기</BROWN_BTN2>
          </div>
          <div className="d-flex justify-content-end">
            <P_SMALL>가입하신 이메일은 {email} 입니다.</P_SMALL>
          </div>
          <br />
        </FORM>

        <FindPass />

        <div></div>
      </LDIVV>

      <br />
      <br />
      <br />

      <Footer />
    </>
  );
};

export default FindIdPass;
