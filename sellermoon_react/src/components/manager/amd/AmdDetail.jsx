import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { jsonAmdList } from "../../../service/dbLogic";
import { CONTAINER_TAB } from "../../../styles/MainStyle";
import { CONTENTS2 } from "../../member/orderdetail/TOrderD";
import Swal from "sweetalert2";
import { BROWN_BTN } from "../../../styles/NoticeStyle";
import styled from "styled-components";

const AmdDetail = ({ isLogin, isAdmin, adminId }) => {
  const navigate = useNavigate();

  const { MD_NO } = useParams();

  console.log(MD_NO);

  const [isOk, setIsOk] = useState(false);

  const [amdVO, setAmdVO] = useState({
    STORE_NO: 0,
    MD_NO: 0,
    MD_NAME: "",
    MD_CONTENT: "",
    MD_PRICE: 0,
    MD_COST: 0,
    MD_CATEGORY: "",
    MD_IMAGE: "",
    MD_IMAGE_URL: "",
    MD_DETAIL_IMAGE: "",
    MD_DETAIL_IMAGE_URL: "",
    MD_DISCOUNT: 0,
    MD_BRAND: "",
    ST_AMOUNT: "",
  });

  // html 렌더링 된 후 호출됨 -> amdList 불러오기용(다건용)
  useEffect(() => {
    const asyncDB = async () => {
      const res = await jsonAmdList({ MD_NO: MD_NO });
      console.log(res);
      setAmdVO(res.data[0]);
    };
    asyncDB();
  }, [MD_NO]);

  console.log(MD_NO);

  const amdDel = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        /* ********알림창에서 삭제 클릭 시  실행********** */
        window.location.href =
          "http://localhost:9005/admin/amd/amdDelete?MD_NO=" + amdVO.MD_NO;

        Swal.fire("삭제되었습니다!").catch((error) => {
          console.log(error);
        });
      }
    });
  };

  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <div className="container" width="80%">
        <CONTENTS2>
          <TA>
            <tr>
              <Td6 width="20%">
                <strong>상품이름</strong>
              </Td6>
              <Td5>
                {amdVO.MD_NAME}[{amdVO.MD_NO}]
              </Td5>
              <Td5 width="20%">
                <strong>거래처 번호</strong>
              </Td5>
              <Td5>{amdVO.STORE_NO}</Td5>
            </tr>
            <tr>
              <Td6>
                <strong>브랜드</strong>
              </Td6>
              <Td5>{amdVO.MD_BRAND}</Td5>
              <Td5>
                <strong>카테고리</strong>
              </Td5>
              <Td5>{amdVO.MD_CATEGORY}</Td5>
            </tr>
            <tr>
              <Td6>
                <strong>상품가격</strong>
              </Td6>
              <Td5>{amdVO.MD_PRICE}</Td5>
              <Td5>
                <strong>상품원가</strong>
              </Td5>
              <Td5>{amdVO.MD_COST}</Td5>
            </tr>
            <tr>
              <Td6>
                <strong>할인율</strong>
              </Td6>
              <Td5>{amdVO.MD_DISCOUNT}</Td5>
              <Td5>
                <strong>상품재고</strong>
              </Td5>
              <Td5>{amdVO.ST_AMOUNT}</Td5>
            </tr>
            <tr>
              <Td6>
                <strong>상세 내용</strong>
              </Td6>
              <Td5>{amdVO.MD_CONTENT}</Td5>
            </tr>
            <tr>
              <Td6>
                <strong>메인 이미지</strong>
              </Td6>
              <Td5 colSpan="3">
                <Card.Img
                  variant="top"
                  style={{ width: "250px" }}
                  src={`${amdVO.MD_IMAGE_URL}`}
                />
              </Td5>
            </tr>
            <tr>
              <Td6>
                <strong>상세 이미지</strong>
              </Td6>
              <Td5 colSpan="3">
                <Card.Img
                  variant="top"
                  style={{ width: "250px" }}
                  src={`${amdVO.MD_DETAIL_IMAGE_URL}`}
                />
              </Td5>
            </tr>
          </TA>

          <br />
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                navigate("/admin/md/modify/" + amdVO.MD_NO);
              }}
              variant="outline-secondary"
              id="btn_search"
              style={{ width: "100px" }}
            >
              <i className="fa-regular fa-file-lines"></i>
              &nbsp;수정
            </Button>
            <Button
              variant="outline-secondary"
              id="btn_search"
              style={{ marginLeft: "20px", width: "100px" }}
              onClick={amdDel}
            >
              <i className="fa-regular fa-trash-can"></i>
              &nbsp;삭제
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="outline-secondary"
              id="btn_search"
              onClick={() => {
                navigate("/admin/md");
              }}
            >
              &nbsp;&nbsp;전체목록&nbsp;&nbsp;
            </Button>
          </div>
        </CONTENTS2>
      </div>
      <Footer />
    </>
  );
};

export default AmdDetail;

export const TA = styled.table`
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
  border-collapse: collapse;
`;

export const Td5 = styled.td`
  border-left: 0.2px solid grey;
  border-right: none;
  border-bottom: 0.2px solid grey;
  border-top: 0.2px solid grey;
  border-collapse: collapse;
`;
export const Td6 = styled.td`
  border-right: none;
  border-bottom: 0.2px solid grey;
  border-top: 0.2px solid grey;
  border-collapse: collapse;
`;
