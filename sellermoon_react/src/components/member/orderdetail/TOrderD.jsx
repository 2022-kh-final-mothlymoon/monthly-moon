import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  jsonOrderDetail,
  jsonOrderDetail2,
  paymentlist,
  spaymentlist,
  spaytotal,
} from "../../../service/dbLogic";
import { BANNER_P } from "../../../styles/MainStyle";
import {
  FORM,
  ORDER_BTN,
  ORDER_H3,
  ORDER_IMG,
  ORDER_LI,
  ORDER_NUM1,
  ORDER_NUM2,
  ORDER_P1,
  ORDER_P2,
  ORDER_SPAN,
  ORDER_UL,
} from "../../../styles/PaymentStyle";
import { P_STRONG, TABLE, TD } from "../../../styles/SubStyle";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import SorderPageRow from "../Payment/SorderPageRow";

const TOrderD = ({ no, props }) => {
  const navigate = useNavigate();

  const { ORDER_NO } = useParams();

  const [payList, setPayList] = useState([]);

  /* payList 데이터 가져오기 */
  useEffect(() => {
    const spaymentList = async () => {
      await spaymentlist({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          console.log(res.data);
          setPayList(res.data);
        }
      });
    };
    spaymentList();
  }, [no]);

  const [orderInfo, setOrderInfo] = useState({
    cart_no: 0,
    cart_quantity: 0,
    order_type: "",
    md_name: "",
    order_amount: 0 /* 주문총금액 (상품금액*개수)  */,
    order_payment: 0 /* 총결제금액 (상품금액*개수 - 포인트사용) */,
    order_used_point: 0,
  });

  /* 총결제금액 데이터 가져오기 */
  useEffect(() => {
    const spayTotal = async () => {
      await spaytotal({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          console.log(res.data);
          setOrderInfo({ order_amount: res.data.ORDER_AMOUNT });
        }
      });
    };
    spayTotal();
  }, [no]);

  const [odVO, setOdVO] = useState({
    ORDER_NO: "",
    ORDER_PAYMENT: 0,
    ORDER_DATE: "",
    ORDER_USED_POINT: 0,
    ORDER_DE_CANCEL: "",
    DELIVERY_STATUS: "",
    DELIVERY_DATE: "",
    DELIVERY_COMPANY: "",
    DELIVERY_NO: "",
    DELIVERY_FEE: "",
    DELIVERY_ADDRESS: "",
    DELIVERY_PHONE: "",
    PURCHASE_METHOD: "",
  });

  const [odVO2, setOdVO2] = useState({
    //ORDER_NO: "",
    ORDER_PAYMENT: 0,
    ORDER_DATE: "",
    ORDER_USED_POINT: 0,
    MD_NO: 0,
    CART_QUANTITY: 0,
    ORDER_TYPE: "",
    MD_PRICE: 0,
    MD_IMAGE: "",
    MD_NAME: "",
    MD_BRAND: "",
    MD_IMAGE_URL: "",
  });

  console.log(ORDER_NO);

  useEffect(() => {
    const asyncDB = async () => {
      const res = await jsonOrderDetail({ ORDER_NO: ORDER_NO });
      console.log(res);
      setOdVO(res.data[0]);
    };
    asyncDB();
  }, [ORDER_NO]);

  useEffect(() => {
    const asyncDB = async () => {
      const res = await jsonOrderDetail2({ ORDER_NO: ORDER_NO });
      console.log(res);
      setOdVO2(res.data[0]);
    };
    asyncDB();
  }, [ORDER_NO]);

  //주문취소 업데이트
  const orderCancle = () => {
    let list = {
      // json 형태로 spring에 값을 넘김
      ORDER_NO: ORDER_NO,
    };

    //주문취소 배송테이블 업데이트
    axios
      .post(process.env.REACT_APP_SPRING_IP + "deliUpdate", list)
      .then((response) => {
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //주문취소 배송테이블 업데이트
    axios
      .post(process.env.REACT_APP_SPRING_IP + "cancelUpdate", list)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("주문이 취소되었습니다");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="container">
        <br />
        <br />
        <CONTENTS2>
          <P_STRONG2>주문상세내역</P_STRONG2>
          <BANNER_P3>{odVO.ORDER_NO}[정기구독]</BANNER_P3>
          <br />
          <br />
          <br />
          <P_SMALL2>주문 상품 정보</P_SMALL2>
          <TA2>
            <tr>
              <Td3 colSpan="2">
                <ORDER_H4>상품정보</ORDER_H4>
              </Td3>
              <Td3>
                <ORDER_H4>가격</ORDER_H4>
              </Td3>
              <Td3>
                <ORDER_H4>주문현황</ORDER_H4>
              </Td3>
            </tr>

            {payList.map((pay, i) => (
              <tr>
                <td width="10%">
                  <ORDER_IMG src={pay.MD_IMAGE_URL} alt="orderimg" />
                </td>
                <td>
                  <div>
                    <ORDER_H5>[{pay.MD_BRAND}]</ORDER_H5>
                    <ORDER_H5>{pay.MD_NAME}</ORDER_H5>
                    <ORDER_P1>
                      [{pay.MD_DISCOUNT}%]&nbsp;
                      {pay.MD_PRICE.toLocaleString()}원 / 수량
                      {pay.CART_QUANTITY}개
                    </ORDER_P1>
                  </div>
                </td>
                <td>
                  <div>
                    <ORDER_H4>
                      {pay.MD_PRICE.toLocaleString() * pay.CART_QUANTITY}원
                    </ORDER_H4>
                  </div>
                </td>
                <td>
                  <div>
                    <ORDER_H4>{odVO.DELIVERY_STATUS}</ORDER_H4>
                  </div>
                </td>
              </tr>
            ))}
          </TA2>
          <br />
          <br />
          <br />
          <P_SMALL2>구매자 정보</P_SMALL2>
          <TA2>
            <tr>
              <Td4>
                <ORDER_H4>주문자</ORDER_H4>
              </Td4>
              <Td2 width="30%">
                <ORDER_H4_1>{odVO2.MEMBER_NAME}</ORDER_H4_1>
              </Td2>
              <Td2>
                <ORDER_H4>이메일주소</ORDER_H4>
              </Td2>
              <Td2 width="30%">
                <ORDER_H4_1>{odVO2.MEMBER_EMAIL}</ORDER_H4_1>
              </Td2>
            </tr>
            <tr>
              <Td4>
                <ORDER_H4>전화 번호</ORDER_H4>
              </Td4>
              <Td2 width="30%"></Td2>
              <Td2>
                <ORDER_H4>휴대폰 번호</ORDER_H4>
              </Td2>
              <Td2 width="30%">
                <ORDER_H4_1>{odVO.DELIVERY_PHONE}</ORDER_H4_1>
              </Td2>
            </tr>
          </TA2>
          <br />
          <br />
          <br />
          <P_SMALL2>배송지 정보</P_SMALL2>
          <TA2>
            <tr>
              <Td4 width="20%" border-right="none">
                <ORDER_H4>받는 사람</ORDER_H4>
              </Td4>
              <Td2>
                <ORDER_H4_1>{odVO2.MEMBER_NAME}</ORDER_H4_1>
              </Td2>
            </tr>
            <tr>
              <Td4 width="20%">
                <ORDER_H4>전화번호</ORDER_H4>
              </Td4>
              <Td2>
                <ORDER_H4_1>{odVO.DELIVERY_PHONE}</ORDER_H4_1>
              </Td2>
              <Td2 width="20%">
                <ORDER_H4>휴대폰번호</ORDER_H4>
              </Td2>
              <Td2>
                <ORDER_H4_1>{odVO.DELIVERY_PHONE}</ORDER_H4_1>
              </Td2>
            </tr>
            <tr>
              <Td4 width="20%">
                <ORDER_H4>주소</ORDER_H4>
              </Td4>
              <Td2 colSpan="3">
                <ORDER_H4_1>{odVO.DELIVERY_ADDRESS}</ORDER_H4_1>
              </Td2>
            </tr>
            {/*  <tr>
              <Td2 width="20%">
                <ORDER_H4>배송요청사항</ORDER_H4>
              </Td2>
              <Td2 colSpan="3"></Td2>
            </tr> */}
          </TA2>
          <br />
          <br />
          <br />
          <P_SMALL2>배송 현황</P_SMALL2>
          <TA2>
            <tr>
              <Td4 colSpan="4">
                <ORDER_H4>{odVO.DELIVERY_STATUS}</ORDER_H4>
              </Td4>
            </tr>
            <tr>
              <Td4 width="20%">
                <ORDER_H4>배송 회사</ORDER_H4>
              </Td4>
              <Td2>
                <ORDER_H4_1>{odVO.DELIVERY_COMPANY}</ORDER_H4_1>
              </Td2>
              <Td2 width="20%">
                <ORDER_H4>배송 번호</ORDER_H4>
              </Td2>
              <Td2>
                <ORDER_H4_1>{odVO.DELIVERY_NO}</ORDER_H4_1>
              </Td2>
            </tr>
            <tr>
              <Td4 width="20%">
                <ORDER_H4>배송 시작 일자</ORDER_H4>
              </Td4>
              <Td2>
                <ORDER_H4_1>{odVO.DELIVERY_DATE}</ORDER_H4_1>
              </Td2>
              <Td2 width="20%">
                <ORDER_H4>배송비</ORDER_H4>
              </Td2>
              <Td2 width="30%">
                <ORDER_H4_1>무료배송</ORDER_H4_1>
              </Td2>
            </tr>
          </TA2>
          <br />
          <br />
          <br />
          <br />
          <P_SMALL2>결제 정보</P_SMALL2>
          <TA2>
            <tr>
              <Td4 width="20%">
                <ORDER_H4>결제수단</ORDER_H4>
              </Td4>
              <Td2 width colSpan="3">
                <ORDER_H4_1>{odVO.PURCHASE_METHOD}</ORDER_H4_1>
              </Td2>
            </tr>
            <tr>
              <Td3 width="20%">
                <ORDER_H4>총 상품금액</ORDER_H4>
              </Td3>
              <Td3 width="20%">
                <ORDER_H4>적립금 사용</ORDER_H4>
              </Td3>
              <Td3 width="20%">
                <ORDER_H4>배송비</ORDER_H4>
              </Td3>
              <Td3>
                <ORDER_H4>총 결제금액</ORDER_H4>
              </Td3>
            </tr>
            <tr>
              <Td3 width="25%">
                <ORDER_H4_1>
                  {parseInt(orderInfo.order_amount).toLocaleString()}원
                </ORDER_H4_1>
              </Td3>
              <Td3 width="25%">
                <ORDER_H4_1>
                  -{" "}
                  {parseInt(odVO.ORDER_USED_POINT) > 0
                    ? parseInt(odVO.ORDER_USED_POINT).toLocaleString()
                    : 0}
                  원
                </ORDER_H4_1>
              </Td3>
              <Td3 width="25%">
                <ORDER_H4_1>무료배송</ORDER_H4_1>
              </Td3>
              <Td3>
                <ORDER_P2 style={{ textAlign: "center", margin: "8px 18px" }}>
                  {parseInt(odVO.ORDER_USED_POINT) > 0
                    ? (
                        parseInt(orderInfo.order_amount) -
                        parseInt(odVO.ORDER_USED_POINT)
                      ).toLocaleString()
                    : parseInt(orderInfo.order_amount).toLocaleString()}{" "}
                  원
                </ORDER_P2>
              </Td3>
            </tr>
          </TA2>
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <ORDER_BTN2 onClick={orderCancle}>주문취소</ORDER_BTN2>
            <ORDER_BTN2
              onClick={() => {
                navigate("/");
              }}
            >
              뒤로가기
            </ORDER_BTN2>
          </div>
        </CONTENTS2>
      </div>
      <Footer />
    </>
  );
};

export default TOrderD;

export const TA2 = styled.table`
  border-top: 2px solid #b29d82;
  border-bottom: 2px solid #b29d82;
  border-collapse: collapse;
`;
export const Td2 = styled.td`
  border-left: 0.2px solid #b29d82;
  border-right: none;
  border-bottom: 0.2px solid #b29d82;
  border-top: 0.2px solid #b29d82;
  border-collapse: collapse;
`;
export const Td4 = styled.td`
  border-bottom: 0.2px solid #b29d82;
  border-top: 0.2px solid #b29d82;
  border-collapse: collapse;
`;
export const Td3 = styled.td`
  border-bottom: 0.2px solid #b29d82;
  border-collapse: collapse;
`;

export const BANNER_P3 = styled.p`
  text-align: center;
  font-size: 20px;
  line-height: 1.3;
  font-weight: 700;
  color: #5e514d;
  padding-bottom: 100px;
  border-bottom: 0.2px solid #b29d82;
`;
export const ORDER_BTN2 = styled.button`
  width: 150px;
  height: 50px;
  color: #fafafa;
  background-color: #5e514d;
  border: none;
  margin: 30px 15px 0 15px;
  font-weight: 600;
  font-size: 15px;
`;

export const P_STRONG2 = styled.p`
  text-align: center;
  font-size: 2rem;
  margin: 30px 0 0 0;
  font-weight: 600;
  padding-bottom: 10px;
`;

export const P_SMALL2 = styled.p`
  font-size: 1.15rem;
  font-weight: 600;
  padding: 0;
  color: #5e514d;
`;

export const FORM2 = styled.form`
  padding: 20px 20px 50px 20px;
  border-bottom: 2px solid #b29d82;
`;

export const FORM3 = styled.form`
  border-top: 2px solid #b29d82;
  border-bottom: 2px solid #b29d82;
`;
export const ORDER_UL2 = styled.ul`
  margin: 0;
`;

export const CONTENTS2 = styled.div`
  height: 100%;
  margin-top: 50px;
  margin-bottom: 150px;
`;
export const CONTENTS3 = styled.div`
  height: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const ORDER_H4 = styled.h3`
  font-size: 18px;
  line-height: 20px;
  font-weight: 600;
  overflow-wrap: break-word;
  margin: 0;
  text-align: center;
  padding: 15px 0px 15px;
`;
export const ORDER_H4_1 = styled.h3`
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
  margin: 0;
  text-align: center;
`;
export const ORDER_H5 = styled.h3`
  padding-bottom: 5px;
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  overflow-wrap: break-word;
  margin: 0;
`;
