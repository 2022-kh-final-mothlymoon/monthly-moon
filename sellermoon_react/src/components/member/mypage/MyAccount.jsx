import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { memberProfile } from "../../../service/dbLogic";
import { BROWN_BTN2, CONTENTS } from "../../../styles/NoticeStyle";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import NavbarMypage from "../Common/NavbarMypage";
import SidebarMypage from "../Common/SidebarMypage";
import { P_STRONG } from "./../../../styles/SubStyle";
import { FORM } from "./../../../styles/PaymentStyle";

const MyAccount = ({ no, isLogin, logout, myPoint, mySubs }) => {
  let navigate = useNavigate();

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
    member_code: "",
  });

  useEffect(() => {
    console.log("useEffet 호출");
    const memProfile = async () => {
      await memberProfile({ member_no: no }).then((res) => {
        if (res.data === null) {
          return () => {};
        } else {
          setMemInfo(res.data);
          console.log(res);
          console.log(res.data);
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
          <div className="col-9">
            <div className="list-wrapper">
              <NavbarMypage myPoint={myPoint} mySubs={mySubs} />
              <div className="container" style={{ padding: "30px 0 150px 0" }}>
                <P_STRONG>회원 정보</P_STRONG>

                <FORM id="f_modifym">
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">회원번호</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext fw-bold"
                        value={memInfo.member_no}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">이름</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext fw-bold"
                        value={memInfo.member_name}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">회원등급</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext fw-bold"
                        value={memInfo.member_level}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">이메일</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext fw-bold"
                        value={memInfo.member_email}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">주소</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext fw-bold"
                        value={
                          memInfo.member_address +
                          " " +
                          memInfo.member_address_detail
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">전화번호</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext fw-bold"
                        value={memInfo.member_phone}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">생일</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext fw-bold"
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
                        className="form-control-plaintext fw-bold"
                        value={memInfo.member_date}
                      />
                    </div>
                  </div>
                </FORM>

                <br />
                {/* 이메일 가입은 비밀번호 확인이 가능하니 
              정보 수정 전 비밀번호 확인 페이지로 가기 */}
                <div className="d-flex justify-content-end">
                  {memInfo.member_method === "이메일" ? (
                    <BROWN_BTN2 onClick={() => navigate("/mypage/chkpass")}>
                      정보 수정
                    </BROWN_BTN2>
                  ) : (
                    <BROWN_BTN2
                      onClick={() => navigate("/mypage/modifyprofile")}
                    >
                      정보 수정
                    </BROWN_BTN2>
                  )}
                </div>
              </div>{" "}
              {/* end of container */}
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

export default MyAccount;
