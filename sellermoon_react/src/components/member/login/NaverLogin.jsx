import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NaverBTN from "../../../images/btnG_완성형.png";
import { SOCIALBTN } from "../../../styles/LoginStyle";

const NaverLogin = (props) => {
  const { naver } = window;
  const naverRef = useRef();
  let navigate = useNavigate();
  // 네이버 로그인 버튼
  const btnNaver = async () => {
    const naverLogin = await new naver.LoginWithNaverId({
      clientId: "RHVEy9MDa5Qd9ly1kZmA",
      callbackUrl: "http://localhost:3000/naverlogin",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 3, height: "45" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        console.log(userid);
        console.log(username);
        const naverDB = async () => {
          await axios
            .post(process.env.REACT_APP_SPRING_IP + "naverlogin", null, {
              params: { member_email: userid, member_name: username },
            })
            .then((res) => {
              console.log(res);
              sessionStorage.setItem("user_id", res.data.member_email); // 세션에 회원 이메일 저장 브라우저 닫기 전까지 유지
              sessionStorage.setItem("user_name", res.data.member_name); // 세션에 회원 이름 저장
              sessionStorage.setItem("user_no", res.data.member_no); // 세션에 회원 번호 저장
              sessionStorage.setItem("user_level", res.data.member_level); // 세션에 회원 레벨 저장
              navigate("/");
              window.location.reload();
            });
        };
        naverDB();
      }
    });
  };

  // 토큰 받아오기
  const getNaverToken = () => {
    if (!window.location.hash) return;
    const token = window.location.hash.split("=")[1].split("&")[0];
    console.log(token);
  };
  useEffect(() => {
    btnNaver();
    getNaverToken();
  }, []);

  const naverClick = () => {
    console.log("네이버 클릭");
    naverRef.current.children[0].click();
  };
  return (
    <>
      <div id="naverIdLogin" ref={naverRef} style={{ display: "none" }}>
        네이버 로그인
      </div>
      <SOCIALBTN src={NaverBTN} alt="" onClick={naverClick} />
    </>
  );
};

export default NaverLogin;
