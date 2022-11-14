import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const Payment = () => {
  const navigate = useNavigate();
  const [dataVO, setDataVO] = useState({});

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = (props) => {
    // Set a same-site cookie for first-party contexts
    document.cookie = "cookie1=value1; SameSite=Lax";
    // Set a cross-site cookie for third-party contexts
    document.cookie = "cookie2=value2; SameSite=None; Secure";
    const { IMP } = window;
    IMP.init("imp15502331"); // 가맹점 식별코드 // 결제 데이터 정의
    const data = {
      pg: "html5_inicis", // PG사 (필수항목)
      pay_method: "card", // 결제수단 (필수항목)
      merchant_uid: `o_${new Date().getTime()}`, // 결제번호 (필수항목)
      name: dataVO.name, // 주문명 (필수항목)
      amount: dataVO.amount, // 금액 (필수항목)
      custom_data: { name: "부가정보", desc: "세부 부가정보" },
      buyer_name: dataVO.buyer_name, // 구매자 이름
      buyer_tel: dataVO.buyer_tel, // 구매자 전화번호 (필수항목)
      buyer_email: dataVO.buyer_email, // 구매자 이메일
      buyer_addr: "주소",
      buyer_postalcode: "우편번호", // ....
    };
    IMP.request_pay(data, callback);
  };

  const callback = (res) => {
    const { success } = res;
    if (success) {
      alert("결제 성공");
      console.log(res);
      console.log(res.merchant_uid);
      //navigation.navigate("/payment/result", { ORDER_NO: "res.merchant_uid" })
      navigate("/payment/result", { state: { ORDER_NO: res.merchant_uid } });
      let list = {
        // json 형태로 spring에 값을 넘김
        ORDER_NO: res.merchant_uid,
        MEMBER_NO: 1, /////////////////// 일단 상수로 넣음
        CART_NO: "2", /////////////////// 일단 상수로 넣음
        ORDER_PAYMENT: res.paid_amount,
        ORDER_AMOUNT: res.paid_amount,
        ORDER_DATE: `${new Date().getTime()}`,
        ORDER_USED_POINT: 0, /////////////////// 일단 상수로 넣음
        PURCHASE_NO: "p" + res.merchant_uid,
        PURCHASE_METHOD: res.pay_method + res.card_name + res.card_number,
        ORDER_DE_NO: "d" + res.merchant_uid,
        ORDER_DE_QUANTITY: 5, /////////////////// 일단 상수로 넣음
        ORDER_DE_PRICE: res.paid_amount,
        ORDER_DE_CANCEL: "N",
        DELIVERY_STATUS: "상품준비중",
        DELIVERY_ADDRESS: res.buyer_addr,
        DELIVERY_PHONE: res.buyer_tel,
      };

      axios
        .post(process.env.REACT_APP_SPRING_IP + "paymentInsert", list)
        .then((response) => {
          console.log(response);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleChangeForm = (e) => {
    if (e.currentTarget == null) return;
    e.preventDefault();
    setDataVO({
      ...dataVO, // 처음에 초기화된 정보에 얕은 복사 처리
      [e.target.name]: e.target.value,
    });
    console.log(dataVO);
  };
  return (
    <>
      <Header />
      <Form>
        <Form.Label>주문명</Form.Label>
        <Form.Control
          type="text"
          name="name"
          defaultValue="아임포트 결제 데이터 분석"
          onChange={handleChangeForm}
        />
      </Form>
      <Form>
        <Form.Label>결제금액</Form.Label>
        <Form.Control
          type="text"
          name="order_payment"
          defaultValue="100"
          onChange={handleChangeForm}
        />
      </Form>

      <Form>
        <Form.Label>이름</Form.Label>
        <Form.Control
          type="text"
          name="buyer_name"
          defaultValue="홍길동"
          onChange={handleChangeForm}
        />
      </Form>
      <Form>
        <Form.Label>전화번호</Form.Label>
        <Form.Control
          type="text"
          name="buyer_tel"
          defaultValue="01044246614"
          onChange={handleChangeForm}
        />
      </Form>
      <Form>
        <Form.Label>이메일</Form.Label>
        <Form.Control
          type="text"
          name="buyer_email"
          defaultValue="example@example.com"
          onChange={handleChangeForm}
        />
      </Form>
      <Button onClick={handleChangeForm}>저장하기</Button>
      <Button onClick={onClickPayment}>결제</Button>
      <Footer />
    </>
  );
};
export default Payment;
