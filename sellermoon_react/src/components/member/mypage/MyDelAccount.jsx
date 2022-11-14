import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { delMember } from "../../../service/dbLogic";
import Footer from "./../Common/Footer";
import Header from "./../Common/Header";
import { CONTENTS, BROWN_BTN2 } from "./../../../styles/NoticeStyle";
import SidebarMypage from "./../Common/SidebarMypage";
import NavbarMypage from "./../Common/NavbarMypage";
import { ORDER_CHECKS, ORDER_CHECK } from "./../../../styles/PaymentStyle";

const MyDelAccount = ({ no, isLogin, logout, myPoint, mySubs }) => {
  let navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false);
  const isChecked = (e) => {
    if (e.target.checked) {
      setIsCheck(true);
      console.log("setIsCheck =====> ", isCheck);
    } else {
      console.log("setIsCheck =====> ", isCheck);
    }
  };
  const delMem = (e) => {
    e.preventDefault();
    if (isCheck === true) {
      delMember({ member_no: no }).then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          alert("탈퇴되었습니다.");
          window.localStorage.removeItem("user_no");
          window.localStorage.removeItem("com.naver.nid.access_token");
          sessionStorage.clear();
          navigate("/");
          window.location.reload();
        } else {
          alert("오류가 있습니다");
        }
      });
    } else {
      alert("동의해주세요");
    }
  };

  const userName = sessionStorage.getItem("user_name");

  return (
    <>
      <Header isLogin={isLogin} logout={logout} />
      <div className="container">
        <CONTENTS className="row">
          <SidebarMypage />
          <div className="col-9">
            <div className="list-wrapper">
              <NavbarMypage myPoint={myPoint} mySubs={mySubs} />

              <div
                className="d-flex justify-content-center"
                style={{ color: "rgb(51, 51, 51)" }}
              >
                <div
                  style={{
                    border: "2px solid #b29d82",
                    width: "700px",
                    padding: "60px 70px",
                    float: "center",
                  }}
                >
                  <h4 style={{ lineHeight: "40px", fontWeight: "600" }}>
                    {userName} 회원님,
                    <br />
                    바로 사용할 수 있는 혜택을 포기하실 건가요?
                  </h4>

                  <br />

                  <ul
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      lineHeight: "38px",
                    }}
                  >
                    <li>
                      보유 적립금&nbsp;
                      <strong style={{ color: "rgb(255, 72, 0)" }}>
                        {myPoint.POINT_SUM.toLocaleString()} Point
                      </strong>
                    </li>
                    <li>정기구독 무료배송 서비스</li>
                    <li>회원등급별 구매적립, 후기적립 혜택</li>
                  </ul>

                  <div className="d-flex mt-4">
                    <ORDER_CHECK
                      value={isCheck}
                      type="checkbox"
                      id="flexCheckDefault"
                      onChange={isChecked}
                    />
                    <ORDER_CHECKS>
                      (필수) 내용을 확인했으며, 회원 탈퇴에 동의합니다.
                    </ORDER_CHECKS>
                  </div>

                  <div className="d-flex justify-content-center mt-5">
                    <BROWN_BTN2 onClick={delMem}>회원 탈퇴</BROWN_BTN2>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end of list-wrapper */}
          </div>{" "}
          {/* end of col */}
        </CONTENTS>
      </div>{" "}
      <Footer />
    </>
  );
};

export default MyDelAccount;
