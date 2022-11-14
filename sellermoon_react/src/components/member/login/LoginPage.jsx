import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginMember } from "../../../service/dbLogic";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { KAKAO_AUTH_URL } from "../../../service/kakaologin";
import NaverLogin from "./NaverLogin";
import KakaoIMG from "../../../images/kakao_login_large_narrow.png";
import {
  BORDERDIV,
  CHKDIV,
  CHKINPUT,
  CHKLABEL,
  LDIV,
  LDIV2,
  LDIV3,
  LDIV4,
  LINPUT,
  LOGINBTN,
  LOGINDIV,
  LSPAN,
  REGISTERLINK,
  SOCIALBTN,
  SOCIALDIV,
  VALIDDIV,
  LJOIN
} from "../../../styles/LoginStyle";

const LoginPage = ({ no, isLogin }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 오류 메시지 담기
  const [emailMessage, setEmailMessage] = useState("");
  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const [isCheck, setIsCheck] = useState(false);
  const isChecked = (e) => {
    if (e.target.checked) {
      setIsCheck(true);
      console.log("setIsCheck =====> ", isCheck);
    } else {
      console.log("setIsCheck =====> ", isCheck);
    }
  };

  // 아이디(이메일) 담기
  const handleInputId = (e) => {
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
  // 비밀번호 담기
  const handleInputPw = (e) => {
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
    console.log(passwordCurrent);
    if (!passwordCurrent) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };
  // 로그인
  const memLogin = (e) => {
    e.preventDefault();
    let body = {
      member_email: email,
      member_password: password,
    };
    loginMember(body).then((res) => {
      console.log(res);
      console.log(res.data);
      // 암호화된 비밀번호와 입력한 비밀번호가 스프링 단에서 비교되기 때문에
      // 출력되는 비밀번호와 res.data.member_password는 서버에서 비교하기엔 다른 값
      // 만약 틀린 비밀번호를 입력한다면 res.data.member_password는 입력한 password와
      // 같은 값으로 출력되므로 res.data.member_password !== password 조건을 추가해 로그인 실패를 비교
      if (
        res.data.member_email === email &&
        res.data.member_password !== password
      ) {
        console.log("로그인 성공");
        sessionStorage.setItem("user_id", email); // 세션에 회원 이메일 저장 브라우저 닫기 전까지 유지
        sessionStorage.setItem("user_name", res.data.member_name); // 세션에 회원 이름 저장
        sessionStorage.setItem("user_no", res.data.member_no); // 세션에 회원 번호 저장
        sessionStorage.setItem("user_level", res.data.member_level); // 세션에 회원 레벨 저장
        navigate("/");
        window.location.reload();
        // 로그인을 실패하면 스프링에서 입력한 값만 vo에 담아 보내기때문에
        // member_no의 값은 0이 출력됨 -> 로그인을 실패한 걸 알 수 있음
        if (isCheck === true) {
          localStorage.setItem("user_no", res.data.member_no);
        }
      } else if (res.data.member_no === 0) {
        alert("이메일 또는 비밀번호를 확인하세요");
      }
    });
  };

  return (
    <>
      <Header />
      <br/>
      <LDIV>
        <LSPAN>로그인</LSPAN>
        <LDIV3>
          <LDIV4>
            <LDIV2>
              <LINPUT
                type="email"
                placeholder="아이디(이메일)"
                name="member_email"
                value={email}
                onChange={handleInputId}
              />
              {email.length > 0 && (
                <VALIDDIV
                  className={`message ${isEmail ? "success" : "error"}`}
                >
                  {emailMessage}
                </VALIDDIV>
              )}
            </LDIV2>
            <LDIV2>
              <LINPUT
                type="password"
                placeholder="비밀번호"
                name="member_password"
                value={password}
                onChange={handleInputPw}
              />
            </LDIV2>
          </LDIV4>
          
          <CHKDIV>
            <CHKINPUT
              type="checkbox"
              value={isCheck}
              onChange={isChecked}
              id="autologin"
              name="autologin"
            />
            <label htmlFor="autologin">자동로그인</label>
            <REGISTERLINK to="/findidpass">아이디 | 비밀번호 찾기</REGISTERLINK>
          </CHKDIV>
          
          <LOGINDIV>
            <LOGINBTN onClick={memLogin} disabled={!(isEmail && isPassword)}>
              로그인
            </LOGINBTN>
          </LOGINDIV>
          <BORDERDIV>SNS 계정으로 간편 로그인</BORDERDIV>
          <SOCIALDIV>
            <a href={KAKAO_AUTH_URL}>
              <SOCIALBTN src={KakaoIMG} alt="이미지" />
            </a>
            <NaverLogin />
          </SOCIALDIV>
          
          <LJOIN onClick={() => {navigate("/register");}}>
            이메일로 회원가입
          </LJOIN>
        
        </LDIV3>
      </LDIV>

      <br />
      <br />
      <br />

      <Footer />
    </>
  );
};

export default LoginPage;
