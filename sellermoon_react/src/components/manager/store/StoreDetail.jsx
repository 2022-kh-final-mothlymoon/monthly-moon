import React, { useEffect, useState } from "react";
import { Button, Col, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { jsonStoreDetail } from "../../../service/dbLogic";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { CONTENTS } from "../../../styles/NoticeStyle";
import styled from "styled-components";
import { TD } from "../../../styles/SubStyle";
import { BANNER_P2 } from "../../../styles/MainStyle";
import { BANNER_P3, CONTENTS2 } from "../../member/orderdetail/TOrderD";
import { TA, Td5, Td6 } from "../amd/AmdDetail";

/*
 * /admin/store/detail/store.STORE_NO
 * 거래처 디테일 페이지입니다.
 * 가능한 기능 R
 */

const StoreDetail = ({ isLogin, isAdmin, adminId }) => {
  const navigate = useNavigate();

  const { STORE_NO } = useParams();

  console.log(STORE_NO);

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

  // storeList 불러오기용(한 건)
  useEffect(() => {
    const asyncDB = async () => {
      const res = await jsonStoreDetail({ STORE_NO: STORE_NO });
      console.log(res);
      setStoreVO(res.data);
    };
    asyncDB();
  }, [STORE_NO]); // 의존배열의 존재 유무는 useState의 순서에는 영향이 없음.
  const storemd = [];

  //store가 취급하는 md의 갯수가 여러 개일 경우 for문 돌려 보여주기
  for (let i = 0; i < storeVO.length; i++) {
    const element = storeVO[i].MD_NO + storeVO[i].MD_NAME;
    if (element.length > 0) {
      storemd.push(element);
      console.log(storemd);
    }
  }

  /*  for (let i = 0; i < storeVO.length; i++) {
    const element = storeVO[i].MD_NO + storeVO[i].MD_NAME;
    if (element.length > 0) {
      storemd.push(element);
      console.log(storemd);
    } else {
      storemd.push("없음");
    }
  }
 */

  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <div className="container">
        <CONTENTS2>
          <TA>
            <tr>
              <Td6 width="20%">
                <strong>거래여부</strong>
              </Td6>
              <Td5>{storeVO.length && storeVO[0].STORE_YN}</Td5>
              <Td5 width="20%">
                <strong>거래처이름</strong>
              </Td5>
              <Td5>{storeVO.length && storeVO[0].FIELD}</Td5>
            </tr>
            <tr>
              <Td6>
                <strong>담당자</strong>
              </Td6>
              <Td5>{storeVO.length && storeVO[0].STORE_MANAGER}</Td5>
              <Td5>
                <strong>전화번호</strong>
              </Td5>
              <Td5>{storeVO.length && storeVO[0].STORE_CONTACT}</Td5>
            </tr>
            <tr>
              <Td6>
                <strong>거래시작일</strong>
              </Td6>
              <Td5>{storeVO.length && storeVO[0].STORE_START_DATE}</Td5>
              <Td5>
                <strong>거래상품</strong>
                <br />
                (상품번호 상품이름)
              </Td5>
              <Td5>
                {storemd.map((storemd) => (
                  <tr>{storemd}</tr>
                ))}
              </Td5>
            </tr>
            <tr>
              <Td6>
                <strong>메모</strong>
              </Td6>
              <Td5>{storeVO.length && storeVO[0].STORE_MEMO}</Td5>
            </tr>
          </TA>

          <br />
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                navigate("/admin/store/modify/" + STORE_NO);
              }}
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
      <br />
      <Footer />
    </>
  );
};

export default StoreDetail;
