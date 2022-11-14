import React, { useState } from "react";
import { bestReview, reviewDelete } from "../../../service/dbLogic";
import { PLUSBTN, STARSPAN } from "../../../styles/ReviewStyle";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const AdminReviewRow = ({ review }) => {
  const [limit, setLimit] = useState(30); // 더보기 버튼 글자수 제한
  const toggleEllipsis = (str, limit) => {
    return {
      string: str.slice(0, limit),
      isShowMore: str.length > limit,
    };
  };
  const onClickMore = (str) => () => {
    setLimit(str.length);
  };
  // 베스트 리뷰 선정
  const bestR = () => {
    console.log(review.MD_REVIEW_NO);
    console.log(review.MEMBER_NO);
    bestReview({
      md_review_no: review.MD_REVIEW_NO,
      member_no: review.MEMBER_NO,
    }).then((res) => {
      console.log(res.data);
      if (res.data === 1) {
        alert("베스트 리뷰로 선정했습니다!");
        window.location.reload();
      }
    });
  };
  // 삭제 버튼
  const delReview = (e) => {
    console.log(review.MD_REVIEW_NO);
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
        /* ********알림창에서 삭제 클릭 시 axios 실행********** */
        reviewDelete({ md_review_no: review.MD_REVIEW_NO }).then((res) => {
          console.log(res.data);
          if (res.data === 1) {
            alert("삭제되었습니다!");
            window.location.reload();
            Swal.fire("삭제되었습니다!");
          }
        });
      }
    });
  };
  return (
    <>
      <tr>
        <td>{review.MD_NO}</td>
        <td>{review.MD_NAME}</td>
        <td>
          {toggleEllipsis(review.MD_REVIEW_CONTENT, limit).string}
          {toggleEllipsis(review.MD_REVIEW_CONTENT, limit).isShowMore && (
            <PLUSBTN onClick={onClickMore(review.MD_REVIEW_CONTENT)}>
              ...더보기
            </PLUSBTN>
          )}
        </td>
        <td>{review.MEMBER_NAME}</td>
        <td>{review.MD_REVIEW_WRITTEN_DATE}</td>
        <td>{review.MD_REVIEW_LIKE}</td>
        <td>
          {review.MD_STAR === 1 ? (
            <STARSPAN>★</STARSPAN>
          ) : review.MD_STAR === 2 ? (
            <STARSPAN>★★</STARSPAN>
          ) : review.MD_STAR === 3 ? (
            <STARSPAN>★★★</STARSPAN>
          ) : review.MD_STAR === 4 ? (
            <STARSPAN>★★★★</STARSPAN>
          ) : (
            <STARSPAN>★★★★★</STARSPAN>
          )}
        </td>
        <td>{review.BEST_REVIEW}</td>
        <td>
          <div className="d-flex" style={{ margin: "auto" }}>
            <Button
              variant="outline-secondary"
              id="btn_search"
              style={{ width: "150px" }}
              onClick={bestR}
            >
              베스트 리뷰 선정
            </Button>
            <Button
              variant="outline-secondary"
              id="btn_search"
              style={{ marginLeft: "10px", width: "80px" }}
              onClick={delReview}
            >
              {" "}
              <i className="fa-regular fa-trash-can"></i>
              &nbsp;삭제
            </Button>
          </div>
        </td>
        <hr />
        <br />
      </tr>
    </>
  );
};

export default AdminReviewRow;
