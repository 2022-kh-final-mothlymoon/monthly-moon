import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  jsonOrderDetail,
  jsonOrderDetail2,
  paymentlist,
  paytotal,
} from "../../../service/dbLogic";
import { CONTENTS } from "../../../styles/NoticeStyle";
import {
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
import OrderPageRow from "../Payment/OrderPageRow";
import {
  ORDER_BTN2,
  BANNER_P2,
  FORM2,
  FORM3,
  ORDER_UL2,
  P_SMALL2,
  P_STRONG2,
  BANNER_P3,
  CONTENTS2,
  TA,
  Td3,
  ORDER_H4,
  ORDER_H5,
  TA2,
  Td4,
  ORDER_H4_1,
  Td2,
} from "./TOrderD";

const OrderD = ({ no, props }) => {
  const navigate = useNavigate();

  const { ORDER_NO } = useParams();

  const [payList, setPayList] = useState([]);

  /* payList 데이터 가져오기 */
  useEffect(() => {
    const paymentList = async () => {
      await paymentlist({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          console.log(res.data);
          setPayList(res.data);
        }
      });
    };
    paymentList();
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
  const [shipFee, setShipFee] = useState(0); /* 배송비 */

  useEffect(() => {
    const payTotal = async () => {
      await paytotal({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          console.log(res.data);
          setOrderInfo({ order_amount: res.data.ORDER_AMOUNT });

          /* 구매금액 3만원 이상이면 배송비 0원 */
          if (res.data.ORDER_AMOUNT < 30000) {
            setShipFee(3000);
          } else setShipFee(0);
        }
      });
    };
    payTotal();
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

    //주문취소 오더테이블 업데이트
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
          <BANNER_P3>{odVO.ORDER_NO}[개별구매]</BANNER_P3>
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
                      {parseInt(pay.CART_QUANTITY) > 1
                        ? (
                            parseInt(pay.MD_PRICE) * parseInt(pay.CART_QUANTITY)
                          ).toLocaleString()
                        : parseInt(pay.MD_PRICE).toLocaleString()}
                      원
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
                <ORDER_H4_1>{odVO.DELIVERY_FEE}</ORDER_H4_1>
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
              <Td2 colSpan="3">
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
                <ORDER_H4_1>+ {shipFee}</ORDER_H4_1>
              </Td3>
              <Td3>
                <ORDER_P2 style={{ textAlign: "center", margin: "8px 18px" }}>
                  {parseInt(odVO.ORDER_USED_POINT) > 0
                    ? (
                        parseInt(orderInfo.order_amount) -
                        parseInt(odVO.ORDER_USED_POINT) +
                        shipFee
                      ).toLocaleString()
                    : parseInt(orderInfo.order_amount).toLocaleString()}
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

export default OrderD;
