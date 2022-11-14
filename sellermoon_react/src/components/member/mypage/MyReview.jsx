import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { myReview } from "../../../service/dbLogic";
import MyReviewRow from "./MyReviewRow";
import Header from "./../Common/Header";
import Footer from "./../Common/Footer";
import SidebarMypage from "./../Common/SidebarMypage";
import Pagination from "./../Common/Pagination";
import NavbarMypage from "./../Common/NavbarMypage";
import { CONTENTS } from "../../../styles/NoticeStyle";
import { OTD1 } from './../../../styles/SubStyle';

const MyReview = ({ myPoint, no, isLogin, logout, mySubs  }) => {
  const [myReviews, setMyReviews] = useState([]);
  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    myReview({ member_no: no }).then((res) => {
      if (res.data.length === 0) {
        return () => {};
      } else {
        console.log(res.data);
        setMyReviews(res.data);
      }
    });
  }, [no]);
  return (
    <>
      <Header isLogin={isLogin} logout={logout} />
      <div className="container">
        <CONTENTS className="row">
          <SidebarMypage />
          <div className="col-9">
            <div className="list-wrapper">
              <NavbarMypage myPoint={myPoint} mySubs={mySubs} />

      <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>
        나의 상품 리뷰
      </p>

      <table style={{ width: "1020px" }}>
          {
            myReviews.length > 0 
            ? 
            myReviews.slice(offset, offset + limit).map((review, i) => (
              <MyReviewRow key={i} review={review} no={no} />
            ))
            : 
            <tr style={{textAlign:"center"}}>
              <OTD1 colSpan={3}>
                <br/>
                <br/>
                <h5 style={{fontWeight:"600"}}>아직 작성된 리뷰내역이 없습니다.</h5>
                <br/>
                <br/>
              </OTD1>
            </tr>
          }
      </table>

              <Pagination
                total={myReviews.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />


            </div>{" "}
            {/* end of list-wrapper */}
          </div>{" "}
          {/* end of col */}
        </CONTENTS>
      </div>{" "}
      {/* end of container */}
      <Footer isLogin={isLogin} logout={logout} />
    </>
  );
};

export default MyReview;
