import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Row } from "react-bootstrap";
import { adminReview, selectReview } from "../../../service/dbLogic";
import Pagination from "../../member/Common/Pagination";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import AdminReviewRow from "./AdminReviewRow";

const AdminReview = ({ isLogin, isAdmin, adminId }) => {
  const [reviews, setReviews] = useState([]); // 리뷰 리스트 담기
  const [selectMd, setSelectMd] = useState(""); // 리뷰 리스트 담기
  const [mdList, setMdList] = useState([]); // 상품명 리스트 담기
  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const reviewChange = (e) => {
    console.log(e.target.value);
    setSelectMd(e.target.value);
    adminReview({ md_no: e.target.value }).then((res) => {
      console.log(res.data);
      setReviews(res.data);
    });
  };
  useEffect(() => {
    selectReview().then((res) => {
      console.log(res.data);
      setMdList(res.data);
    });
  }, []);

  useEffect(() => {
    adminReview().then((res) => (console.log(res.data), setReviews(res.data)));
  }, []);
  // 새로고침
  const refresh = () => {
    window.location.reload();
  };
  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <div className="container">
        <div style={{ display: "flex", marginTop: "1.8rem" }}>
          <h4>상품리뷰 관리</h4>
          <select
            value={selectMd}
            onChange={reviewChange}
            className="form-select"
            style={{ width: "15%", marginLeft: "1rem" }}
          >
            <option defaultValue>상품선택</option>
            {mdList.map((selectMd, i) => (
              <option key={i} value={selectMd.MD_NO}>
                {selectMd.MD_NAME}
              </option>
            ))}
          </select>
          <Button
            variant="outline-secondary"
            id="btn_search"
            style={{ marginLeft: "1rem", width: "120px" }}
            onClick={refresh}
          >
            <i className="fa-solid fa-arrows-rotate"></i>
            &nbsp;새로고침
          </Button>
        </div>
        <hr />
        <Row>
          <table>
            <colgroup>
              <col style={{ width: "8%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "23%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "9%" }} />
              <col style={{ width: "18%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>상품번호</th>
                <th>상품명</th>
                <th>내용</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>좋아요</th>
                <th>별점</th>
                <th>베스트리뷰</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reviews.slice(offset, offset + limit).map((review, i) => (
                <AdminReviewRow key={i} review={review} />
              ))}
            </tbody>
          </table>
        </Row>
      </div>
      <Pagination
        total={reviews.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <br />
      <br />
      <br />

      <Footer />
    </>
  );
};

export default AdminReview;
