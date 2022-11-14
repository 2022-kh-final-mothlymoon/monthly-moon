import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Route, useLocation, useNavigate, useParams } from "react-router-dom";

const PaymentResult = ({ props }) => {
  let navigate = useNavigate();
  const location = useLocation();

  const ORDER_NO = location.state.ORDER_NO;
  console.log(ORDER_NO);

  return (
    <>
      <strong>주문되었습니다</strong>
      <Button
        onClick={() => {
          navigate("/orderdetail/" + ORDER_NO);
        }}
      >
        주문상세페이지로
      </Button>
      <Button>홈으로</Button>
    </>
  );
};

export default PaymentResult;
