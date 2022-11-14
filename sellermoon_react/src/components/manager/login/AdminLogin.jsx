import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../service/dbLogic";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { Button } from "react-bootstrap";

const AdminLogin = ({ isLogin, isAdmin, adminId }) => {
  let navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleInputId = (e) => {
    setId(e.target.value);
    console.log(e.target.value);
  };
  // 비밀번호 담기
  const handleInputPw = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const adminLoginBtn = (e) => {
    e.preventDefault();
    let body = {
      admin_id: id,
      admin_pw: password,
    };
    adminLogin(body).then((res) => {
      console.log(res);
      console.log(res.data);
      if (res.data.admin_id === id && res.data.admin_pw !== password) {
        console.log("로그인 성공");
        sessionStorage.setItem("admin", id);
        sessionStorage.setItem("level", 5);
        navigate("/admin/member");
        window.location.reload();
      } else if (res.data.member_no === 0) {
        alert("아이디 또는 비밀번호를 확인하세요");
      }
    });
  };

  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <div style={{ width: 300, margin: "12.3rem auto" }}>
        <h4 style={{ textAlign: "center" }}>관리자 로그인</h4>
        <div>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="아이디"
            name="admin_id"
            value={id}
            onChange={handleInputId}
            style={{ marginTop: 30 }}
          />
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="비밀번호"
            name="admin_password"
            value={password}
            onChange={handleInputPw}
            style={{ marginTop: 10 }}
          />
        </div>
        <Button
          className="w-100 btn btn-lg btn-primary"
          onClick={adminLoginBtn}
          style={{ marginTop: 30 }}
        >
          로그인
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
