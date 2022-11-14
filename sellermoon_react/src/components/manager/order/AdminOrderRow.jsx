import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { adminOrderList } from "../../../service/dbLogic";

const MTR = styled.tr`
  &:hover {
    background-color: #ead3b1;
  }
`;

const AdminOrderRow = ({ order }) => {
  let navigate = useNavigate();
  const orderDetail = () => {
    adminOrderList({ order_no: order.ORDER_NO }).then((res) => {
      console.log(res.data);
      navigate("/admin/order/" + order.ORDER_NO);
    });
  };
  return (
    <>
      <MTR id="list" onClick={orderDetail}>
        <td>{order.ORDER_NO}</td>
        <td>{order.MEMBER_NO}</td>
        <td>{order.MEMBER_EMAIL}</td>
        <td>{order.ORDER_PAYMENT}</td>
        <td>{order.ORDER_DATE}</td>
        <td>{order.SUB}</td>
      </MTR>
    </>
  );
};

export default AdminOrderRow;
