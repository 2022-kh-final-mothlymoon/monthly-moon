import axios from "axios";
import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const KakaoLogin = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    // 인가코드 받아오기
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    axios
      .get(process.env.REACT_APP_SPRING_IP + `kakaologin?code=${code}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.member_no);
        alert("로그인 성공");
        sessionStorage.setItem("user_no", res.data.member_no); // 세션에 스프링에서 넘어온 member_no값 저장
        sessionStorage.setItem("user_id", res.data.member_email); // 세션에 회원 이메일 저장 브라우저 닫기 전까지 유지
        sessionStorage.setItem("user_name", res.data.member_name); // 세션에 회원 이름 저장
        sessionStorage.setItem("user_level", res.data.member_level); // 세션에 회원 레벨 저장
        navigate("/");
        window.location.reload();
      });
  }, []);

  return (
    <>
      <div>
        <Spinner animation="border" variant="warning" />
      </div>
    </>
  );
};

export default KakaoLogin;
