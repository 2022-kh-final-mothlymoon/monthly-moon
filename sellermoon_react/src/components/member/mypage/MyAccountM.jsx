import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { memberProfile, modifyProfile } from "../../../service/dbLogic";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Link, useNavigate } from "react-router-dom";
import MyPassword from "./MyPassword";
import Footer from "./../Common/Footer";
import Header from "./../Common/Header";
import { CONTENTS, BROWN_BTN, BROWN_BTN2 } from "./../../../styles/NoticeStyle";
import SidebarMypage from "./../Common/SidebarMypage";
import { P_STRONG, P_SMALL } from "./../../../styles/SubStyle";
import NavbarMypage from "./../Common/NavbarMypage";
import { FORM } from "./../../../styles/PaymentStyle";

const MyAccountM = ({ no, isLogin, logout, myPoint, mySubs, props }) => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [memInfo, setMemInfo] = useState({
    member_no: 0,
    member_name: "",
    member_zipcode: "",
    member_address: "",
    member_address_detail: "",
    member_method: "",
    member_level: "",
    member_phone: 0,
    member_birth: "",
    member_email: "",
    member_date: "",
  });
  // 수정할 회원정보 불러오기
  useEffect(() => {
    console.log("useEffet 호출");
    memberProfile({ member_no: no }).then((res) => {
      if (res.data === null) {
        return () => {};
      } else {
        setMemInfo(res.data);
        console.log(res);
        console.log(res.data);
      }
    });
  }, [no]);
  // 수정하기 onChange 함수
  const EditChange = (e) => {
    setMemInfo({
      ...memInfo,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
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
    console.log(data.zonecode); // 우편번호
    console.log(fullAddress); // 주소
    setMemInfo({
      ...memInfo,
      member_zipcode: data.zonecode, // 새로 수정할 우편번호 담기
      member_address: fullAddress, // 수정할 주소 담기
      member_address_detail: "", // 우편번호 api에서 셀렉되면 상세주소 칸은 비워주기
    });

    setShow(false);
  };
  const memModify = (e) => {
    e.preventDefault();
    modifyProfile({
      member_no: no,
      member_name: memInfo.member_name,
      member_email: memInfo.member_email,
      member_zipcode: memInfo.member_zipcode,
      member_address: memInfo.member_address,
      member_address_detail: memInfo.member_address_detail,
      member_phone: memInfo.member_phone,
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
              <div className="container" style={{ padding: "30px 0 150px 0" }}>
                <P_STRONG>회원 정보</P_STRONG>

                <MyPassword no={no} />

                <br />

                {/* ************회원정보시작 ************ */}
                <FORM id="f_modifym" method="post" onSubmit={memModify}>
                  <P_SMALL>회원정보 수정</P_SMALL>

                  <div className="mb-3 mt-4 row">
                    <label className="col-sm-2 col-form-label">회원번호</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext"
                        value={memInfo.member_no}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">회원등급</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext"
                        value={memInfo.member_level}
                      />
                    </div>
                  </div>

                  <div className="mb-3 mt-3 row">
                    <label className="col-sm-2 col-form-label">이름</label>
                    <div className="col-sm-5">
                      <input
                        type="text"
                        name="member_name"
                        value={memInfo.member_name}
                        className="form-control"
                        onChange={EditChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3 mt-3 row">
                    <label className="col-sm-2 col-form-label">이메일</label>
                    <div className="col-sm-5">
                      <input
                        type="text"
                        name="member_email"
                        value={memInfo.member_email}
                        className="form-control"
                        onChange={EditChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">주소</label>
                    <div className="col-sm-5 d-flex">
                      <input
                        type="text"
                        name="member_zipcode"
                        value={memInfo.member_zipcode}
                        className="form-control"
                        onChange={EditChange}
                      />
                      <BROWN_BTN onClick={handleShow} type="button">
                        우편번호
                      </BROWN_BTN>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-7 d-flex">
                      <input
                        type="text"
                        name="member_address"
                        value={memInfo.member_address}
                        className="form-control"
                        onChange={EditChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-7 d-flex">
                      <input
                        type="text"
                        name="member_address_detail"
                        value={memInfo.member_address_detail}
                        className="form-control"
                        onChange={EditChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4 row">
                    <label className="col-sm-2 col-form-label">전화번호 </label>
                    <div className="col-sm-5">
                      <input
                        type="text"
                        name="member_phone"
                        value={memInfo.member_phone}
                        className="form-control"
                        onChange={EditChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">생일</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext"
                        value={memInfo.member_birth}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">가입일</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext"
                        value={memInfo.member_date}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <BROWN_BTN2 type="submit">수정하기</BROWN_BTN2>
                    <BROWN_BTN2 onClick={() => navigate("/mypage/delmember")}>
                      탈퇴하기
                    </BROWN_BTN2>
                  </div>

                  <br />
                </FORM>
              </div>{" "}
              {/* end of container */}
            </div>{" "}
            {/* end of list-wrapper */}
          </div>{" "}
          {/* end of col */}
        </CONTENTS>
      </div>{" "}
      <Footer />
      {/* 우편번호 모달 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>우편번호 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyAccountM;
