import React, { useState } from "react";
import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { adminOrderList } from "../../../service/dbLogic";
import Pagination from "../../member/Common/Pagination";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import AdminOrderRow from "./AdminOrderRow";

const AdminOrder = ({ adminId, isLogin, isAdmin }) => {
  const [orders, setOrders] = useState([]);
  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    adminOrderList().then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, []);

  return (
    <>
      <Header adminId={adminId} isLogin={isLogin} isAdmin={isAdmin} />
      <div className="container">
        <br />
        <h4>주문관리</h4>
        <hr />
        <Row>
          <table>
            <colgroup>
              <col style={{ width: "7%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead>
              <tr style={{ width: "100%" }}>
                <th>주문번호</th>
                <th>회원번호</th>
                <th>이메일</th>
                <th>주문금액</th>
                <th>주문날짜</th>
                <th>구독여부</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(offset, offset + limit).map((order, i) => (
                <AdminOrderRow key={i} order={order} />
              ))}
            </tbody>
          </table>
          <Pagination
            total={orders.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </Row>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AdminOrder;
