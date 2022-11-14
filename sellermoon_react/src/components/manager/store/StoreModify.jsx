import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { jsonStoreDetail } from "../../../service/dbLogic";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { CONTENTS2 } from "../../member/orderdetail/TOrderD";

/*
 * /admin/store/modify/store.STORE_NO
 * 거래처 수정 페이지입니다.
 * 가능한 기능 R, U
 */

const StoreModify = ({ isLogin, isAdmin, adminId }) => {
  const navigate = useNavigate();

  const { STORE_NO } = useParams();

  const [storeVO, setStoreVO] = useState({
    STORE_NO: 0,
    MD_NO: 0,
    MD_NAME: "",
    STORE_CONTACT: "",
    STORE_MANAGER: "",
    STORE_MEMO: "",
    STORE_YN: "",
    STORE_START_DATE: "",
    FIELD: "",
  });

  // input 정보 가져오기
  useEffect(() => {
    const asyncDB = async () => {
      const res = await jsonStoreDetail({ STORE_NO: STORE_NO });
      console.log(res);
      setStoreVO(res.data[0]);
    };
    asyncDB();
  }, [STORE_NO]);

  // 폼 스프링단으로 쏘기
  const storeUpdate = () => {
    document.querySelector("#f_store").action =
      "http://localhost:9005/admin/store/storeUpdate";
    document.querySelector("#f_store").submit();
  };

  // input 수정한 정보로 업데이트 하기
  const handleChangeForm = (e) => {
    if (e.currentTarget == null) return;
    e.preventDefault();
    setStoreVO({
      ...storeVO, // 처음에 초기화된 정보에 얕은 복사 처리
      STORE_NO: STORE_NO,
      [e.target.name]: e.target.value,
    });
    console.log(storeVO);
  };

  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <br />
      <br />
      <br />
      <div className="container">
        <CONTENTS2>
          {/*  <h1>
            <strong>{storeVO.STORE_NO}</strong>
          </h1> */}
          <Form id="f_store" method="get">
            <Form.Group className="mb-3" controlId="formBasicWriter">
              <Form.Label>
                <strong>거래처 이름</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="FIELD"
                value={storeVO.FIELD}
                onChange={handleChangeForm}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicWriter">
              <Form.Label>
                <strong>사용 여부</strong>
              </Form.Label>
              <Form.Select
                type="text"
                name="STORE_YN"
                id="STORE_YN"
                aria-label="Default select example"
                value={storeVO.STORE_YN}
                onChange={handleChangeForm}
              >
                <option defaultValue>{"사용여부:" + storeVO.STORE_YN}</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicWriter">
              <Form.Label>
                <strong>담당자</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="STORE_MANAGER"
                value={storeVO.STORE_MANAGER}
                onChange={handleChangeForm}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <strong>전화번호</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="STORE_CONTACT"
                value={storeVO.STORE_CONTACT}
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <strong>메모</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="STORE_MEMO"
                value={storeVO.STORE_MEMO}
                onChange={handleChangeForm}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="hidden"
                name="STORE_NO"
                value={storeVO.STORE_NO}
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Form>
          <br />
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={storeUpdate}
              variant="outline-secondary"
              id="btn_search"
              style={{ width: "100px" }}
            >
              <i className="fa-regular fa-file-lines"></i>
              &nbsp;수정
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="outline-secondary"
              id="btn_search"
              onClick={() => {
                navigate("/admin/store");
              }}
            >
              &nbsp;&nbsp;전체목록&nbsp;&nbsp;
            </Button>
          </div>
        </CONTENTS2>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default StoreModify;
