import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import DaumPostcodeEmbed from "react-daum-postcode";
import axios from "axios";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import {
  RBUTTON,
  RDIV,
  RDIV2,
  RDIV3,
  RINPUT,
  RNDIV,
  RTEXTDIV,
  RTEXTDIV2,
  RVALIDDIV,
  RZINPUT,
} from "../../../styles/RegisterStyle";
import { LOGINBTN, LSPAN, VALIDDIV } from "../../../styles/LoginStyle";

const RegisterPage = (props) => {
  const registerM = (e) => {
    e.preventDefault();
    document.querySelector("#f_register").action =
      process.env.REACT_APP_SPRING_IP + "register";
    document.querySelector("#f_register").submit();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  // 오류 메시지 담기
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isName, setIsName] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [zipcode, setZipcode] = useState(""); // 우편번호
  const [address, setAddress] = useState(""); // 주소

  ///// 다음 우편번호 찾기 함수 //////
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(data.zonecode);
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setZipcode(data.zonecode);
    setAddress(fullAddress);
    setShow(false);
  };
  ////// 다음 우편번호 함수 끝 //////
  const Inputzipcode = (e) => {
    console.log(e.target.value);
    setZipcode(e.target.value);
  };
  const Inputaddress = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  };

  const eCheck = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    console.log(emailCurrent);
    setEmail(emailCurrent);
    if (!emailCurrent || !emailRegex.test(emailCurrent)) {
      setIsEmail(false);
      setEmailMessage("이메일 형식이 아닙니다.");
    } else {
      setIsEmail(true);
      setEmailMessage("올바른 이메일 형식입니다.");
    }
  };

  const emailChk = (e) => {
    console.log("이메일 중복체크");
    axios
      .post(process.env.REACT_APP_SPRING_IP + "emailcheck", null, {
        params: { member_email: email },
      })
      .then((result) => {
        console.log(result);
        if (result.data === 1) {
          alert("중복된 이메일 입니다.");
          return () => {};
        } else {
          alert("가입 가능한 이메일입니다.");
        }
      })
      .catch((err) => {});
  };

  // 비밀번호 유효성 검사
  const passwordChk = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
    console.log(passwordCurrent);
    if (!passwordCurrent || !passwordRegex.test(passwordCurrent)) {
      setIsPassword(false);
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 6자리 이상 입력해주세요."
      );
    } else {
      setIsPassword(true);
      setPasswordMessage("안전한 비밀번호 입니다.");
    }
  };

  const nameChk = (e) => {
    const nameCurrent = e.target.value;
    console.log(nameCurrent);
    if (!nameCurrent) {
      setIsName(false);
    } else {
      setIsName(true);
    }
  };

  return (
    <>
      <Header />
      <br/>
      <RDIV>
        <h2 style={{fontWeight:"700", borderBottom:"3px solid #5e514d", padding:"20px", color:"#5e514d"}}>
          회원가입
        </h2>
        <RDIV3>
          <form id="f_register" method="post">
            <RDIV2>
              <RTEXTDIV>이메일(아이디)</RTEXTDIV>
              <RZINPUT
                type="email"
                name="member_email"
                value={email}
                onChange={eCheck}
                placeholder="Enter email"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={emailChk}
              >
                이메일 중복검사
              </button>
            </RDIV2>
            {email.length > 0 && (
              <RVALIDDIV className={`message ${isEmail ? "success" : "error"}`}>
                {emailMessage}
              </RVALIDDIV>
            )}
            <RNDIV>
              <RTEXTDIV>비밀번호</RTEXTDIV>
              <RINPUT
                type="password"
                name="member_password"
                placeholder="Password"
                onChange={passwordChk}
                value={password}
              />
            </RNDIV>
            {password.length > 0 && (
              <RVALIDDIV
                className={`message ${isPassword ? "success" : "error"}`}
              >
                {passwordMessage}
              </RVALIDDIV>
            )}
            <RNDIV>
              <RTEXTDIV2>이 름</RTEXTDIV2>
              <RINPUT
                type="text"
                name="member_name"
                placeholder="이름"
                onChange={nameChk}
              />
            </RNDIV>
            <RDIV2>
              <RTEXTDIV>우편번호</RTEXTDIV>
              <RZINPUT
                name="member_zipcode"
                value={zipcode}
                onChange={Inputzipcode}
                type="text"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleShow}
              >
                우편번호 찾기
              </button>
            </RDIV2>
            <RNDIV>
              <RTEXTDIV2>주 소</RTEXTDIV2>
              <RINPUT
                type="text"
                name="member_address"
                value={address}
                onChange={Inputaddress}
                placeholder="주소"
              />
            </RNDIV>
            <RNDIV>
              <RTEXTDIV>상세주소</RTEXTDIV>
              <RINPUT
                type="text"
                name="member_address_detail"
                placeholder="상세주소"
              />
            </RNDIV>
            <RNDIV>
              <RTEXTDIV>전화번호</RTEXTDIV>
              <RINPUT type="text" name="member_phone" placeholder="전화번호" />
            </RNDIV>
            <RNDIV>
              <RTEXTDIV2>생 일</RTEXTDIV2>
              <RINPUT name="member_birth" type="date" />
            </RNDIV>
            <RNDIV>
              <RTEXTDIV>추천인 코드</RTEXTDIV>
              <RZINPUT name="member_recommend" type="text" />
            </RNDIV>
            <RBUTTON>
              <LOGINBTN
                type="submit"
                onClick={registerM}
                disabled={!(isEmail && isPassword && isName)}
              >
                회원가입
              </LOGINBTN>
            </RBUTTON>
          </form>
        </RDIV3>
        <br/>
      </RDIV>
      <br/>
      <br/>
      <br/>
      <Footer />

      {/* 우편번호 모달 시작 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>우편번호 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
        </Modal.Body>
      </Modal>
      {/* 우편번호 모달 끝 */}
    </>
  );
};

export default RegisterPage;
