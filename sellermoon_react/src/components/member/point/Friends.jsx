import React from "react";
import Header from "./../Common/Header";
import { CONTENTS } from "./../../../styles/NoticeStyle";
import SidebarMypage from "./../Common/SidebarMypage";
import NavbarMypage from "./../Common/NavbarMypage";
import Footer from "./../Common/Footer";
import {
  FRIEND_BTN,
  FRIEND_IMG,
  FRIEND_P,
  POINT_P,
} from "../../../styles/MypageStyle";
import { FRIEND_CODE, POINT_LI } from "./../../../styles/MypageStyle";
import { useState } from "react";
import FriendsAlert from "./FriendsAlert";
import { memberProfile } from "../../../service/dbLogic";
import { useEffect } from "react";

const Friends = ({ myPoint, no, isLogin, logout, mySubs }) => {
  let [alert, setAlert] = useState(false);

  const copyCode = () => {
    setAlert(true);
    const code = document.getElementById("friendCode");
    code.select();
    code.setSelectionRange(0, 99999);
    document.execCommand("Copy");
    setTimeout(() => {
      setAlert(false);
    }, 2000); /* 2초뒤 창닫힘 */
  };

  const [mycode, setMycode] = useState("");

  useEffect(() => {
    console.log("useEffet 호출");
    const memProfile = async () => {
      await memberProfile({ member_no: no }).then((res) => {
        if (res.data === null) {
          return () => {};
        } else {
          setMycode(res.data.member_code);
          console.log(res);
          console.log(res.data.member_code);
        }
      });
    };
    memProfile();
  }, [no]);

  return (
    <>
      <Header isLogin={isLogin} logout={logout} />
      <div className="container">
        <CONTENTS className="row">
          <SidebarMypage />
          <div className="col-9 mb-5">
            <div className="list-wrapper">
              <NavbarMypage myPoint={myPoint} mySubs={mySubs} />

              <div style={{ textAlign: "center", marginBottom: "150px" }}>
                <FRIEND_IMG
                  src="https://res.cloudinary.com/drxxdsv01/image/upload/v1667328789/%EC%B9%9C%EA%B5%AC%EC%B4%88%EB%8C%80_dvu6fy.png"
                  alt="friend_event"
                />
                <FRIEND_P>나의 초대코드</FRIEND_P>
                {/* <FRIEND_CODE>YE98QYQU</FRIEND_CODE> */}{" "}
                {/* ##################################### 상수 */}
                <FRIEND_CODE value={mycode} id="friendCode" readOnly />{" "}
                {/* ############################# 상수 */}
                <FRIEND_BTN onClick={copyCode}>초대코드 복사하기</FRIEND_BTN>
                {/* 복사 완료 알림창 */}
                {alert === true ? (
                  <>
                    <FriendsAlert />
                  </>
                ) : null}
              </div>

              <POINT_P>안내사항</POINT_P>
              <ul style={{ marginTop: "10px", marginBottom: "100px" }}>
                <POINT_LI>
                  친구초대 적립금은 초대코드를 통해 가입한 친구가 회원 가입 완료
                  시 자동 지급됩니다.
                </POINT_LI>
                <POINT_LI>
                  본 이벤트에 대한 허위/과장 정보를 게시하거나, 이벤트 혜택을
                  기반으로 타인에게 금전거래를 요구하는 등 이벤트의 취지에 맞지
                  않는 <br /> 부정 행위가 확인되는 경우 이벤트 포인트 회수 혹은
                  이벤트 참여 제한 등의 조치가 적용될 수 있습니다.
                </POINT_LI>
                <POINT_LI>
                  본 이벤트는 사전 예고 없이 변경되거나 종료될 수 있습니다.
                </POINT_LI>
              </ul>
            </div>{" "}
            {/* end of list-wrapper */}
          </div>{" "}
          {/* end of col */}
        </CONTENTS>
      </div>{" "}
      {/* end of container */}
      <Footer isLogin={isLogin} logout={logout} />
    </>
  );
};

export default Friends;
