import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { modifyPass } from "../../../service/dbLogic";
import { BROWN_BTN2 } from "../../../styles/NoticeStyle";
import { P_SMALL } from "../../../styles/SubStyle";
import { FORM } from './../../../styles/PaymentStyle';

const MyPassword = ({ no }) => {
  let navigate = useNavigate();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  // 새 비밀번호 담기
  const handleInputPw1 = (e) => {
    setPassword1(e.target.value);
    console.log(e.target.value);
  };
  // 새로운 비밀번호 확인
  const handleInputPw2 = (e) => {
    setPassword2(e.target.value);
    console.log(e.target.value);
  };

  const passModify = (e) => {
    e.preventDefault();
    if (password1 === password2) {
      modifyPass({
        member_no: no,
        member_password: password1,
      }).then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data === 1) {
          alert("수정되었습니다. 다시 로그인해주세요");
          sessionStorage.clear();
          window.localStorage.removeItem("user_no");
          window.localStorage.removeItem("com.naver.nid.access_token");
          navigate("/");
          window.location.reload();
        } else {
          alert("수정에 실패했습니다.");
        }
      });
    } else {
      alert("비밀번호가 같은지 확인해주세요");
    }
  };
  return (
    <>
      <FORM onSubmit={passModify}>
      <P_SMALL>비밀번호 수정</P_SMALL>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label mt-2">새 비밀번호</label>
          <div className="col-sm-5">
            <input
              type="password"
              placeholder="Password"
              name="member_password"
              value={password1}
              onChange={handleInputPw1}
              className="form-control mt-2"
            />
          </div>
        </div>

        <div className="mb-4 mt-3 row">
          <label className="col-sm-2 col-form-label mt-2">새 비밀번호 확인</label>
          <div className="col-sm-5">
            <input
              type="password"
              placeholder="Password"
              name="password2"
              value={password2}
              onChange={handleInputPw2}
              className="form-control mt-2"
            />
          </div>
        
        </div>

        <div className="d-flex justify-content-end">
          <BROWN_BTN2 type="submit" >
            수정하기
          </BROWN_BTN2>
        </div>

        <br />

      </FORM>



    </>
  );
};

export default MyPassword;
