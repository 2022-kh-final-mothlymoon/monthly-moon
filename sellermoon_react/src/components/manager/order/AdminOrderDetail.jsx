import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { adminOrderList } from "../../../service/dbLogic";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const AdminOrderDetail = ({ isLogin, isAdmin, logout }) => {
  const { order_no } = useParams();
  const [orderd, setOrderD] = useState({
    ORDER_NO: "",
    MEMBER_NO: 0,
    MEMBER_NAME: "",
    MEMBER_EMAIL: "",
    MEMBER_PHONE: "",
    ORDER_PAYMENT: 0,
    PURCHASE_METHOD: "",
    MEMBER_ZIPCODE: "",
    MEMBER_ADDRESS: "",
    MEMBER_ADDRESS_DETAIL: "",
    ORDER_DATE: "",
    SUB: "",
  });
  useEffect(() => {
    adminOrderList({ order_no: order_no }).then((res) => {
      console.log(res);
      console.log(res.data);
      console.log(res.data[0]);
      setOrderD(res.data[0]);
    });
  }, [order_no]);
  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} />
      <br />
      <div>
        <table style={{ width: "60%", margin: "0 auto" }}>
          <br />
          <h4>주문 상세 정보</h4>
          <br />
          <tbody>
            <tr>
              <th>주문번호</th>
              <td>{orderd.ORDER_NO}</td>
            </tr>
            <tr>
              <th>회원번호</th>
              <td>{orderd.MEMBER_NO}</td>
            </tr>
            <tr>
              <th>주문자</th>
              <td>{orderd.MEMBER_NAME}</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>{orderd.MEMBER_EMAIL}</td>
            </tr>
            <tr>
              <th>결제금액</th>
              <td>{orderd.ORDER_PAYMENT}</td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>{orderd.MEMBER_PHONE}</td>
            </tr>
            <tr>
              <th>우편번호</th>
              <td>{orderd.MEMBER_ZIPCODE}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{orderd.MEMBER_ADDRESS}</td>
            </tr>
            <tr>
              <th>상세주소</th>
              <td>{orderd.MEMBER_ADDRESS_DETAIL}</td>
            </tr>
            <tr>
              <th>결제수단</th>
              <td>{orderd.PURCHASE_METHOD}</td>
            </tr>
            <tr>
              <th>주문날짜</th>
              <td>{orderd.ORDER_DATE}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AdminOrderDetail;
