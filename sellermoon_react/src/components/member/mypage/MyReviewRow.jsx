import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { reviewDelete } from "../../../service/dbLogic";
import { PLUSBTN, STARSPAN } from "../../../styles/ReviewStyle";
import MemberReviewM from "../product_review/MemberReviewM";

const MyReviewRow = ({ review, no }) => {
  const [limit, setLimit] = useState(30); // 더보기 버튼 글자수 제한
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleEllipsis = (str, limit) => {
    return {
      string: str.slice(0, limit),
      isShowMore: str.length > limit,
    };
  };
  const onClickMore = (str) => () => {
    setLimit(str.length);
  };
  // 삭제 버튼
  const delReview = () => {
    console.log(review.MD_REVIEW_NO);
    reviewDelete({ md_review_no: review.MD_REVIEW_NO }).then((res) => {
      console.log(res.data);
      if (res.data === 1) {
        alert("삭제되었습니다!");
        window.location.reload();
      }
    });
  };
  return (
    <>
      <colgroup>
        <col style={{ width: "60%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "20%" }} />
      </colgroup>

      <thead>
        <tr>
          <th colSpan={3} style={{padding:"20px"}}>
            <span style={{fontSize:"18px", margin:"20px"}}>
              <i className="fa-solid fa-gift"></i>
              &nbsp;&nbsp;{review.MD_NAME}
            </span>
          </th>
          <th>
          {review.MD_STAR === 1 ? (
            <STARSPAN>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </STARSPAN>
          ) : review.MD_STAR === 2 ? (
            <STARSPAN>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </STARSPAN>
          ) : review.MD_STAR === 3 ? (
            <STARSPAN>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </STARSPAN>
          ) : review.MD_STAR === 4 ? (
            <STARSPAN>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </STARSPAN>
          ) : (
            <STARSPAN>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </STARSPAN>
          )}
          </th>
        </tr>
      </thead>

      <tbody style={{borderBottom:"2px solid #b29d82"}}>
        <td style={{lineHeight:"28px", fontSize:"17px"}}>
          <br />
          {toggleEllipsis(review.MD_REVIEW_CONTENT, limit).string}
          {toggleEllipsis(review.MD_REVIEW_CONTENT, limit).isShowMore && (
            <PLUSBTN onClick={onClickMore(review.MD_REVIEW_CONTENT)}>
              ...더보기
            </PLUSBTN>
          )}
          <br />
          <br />
        </td>

        <td style={{fontSize:"18px"}}>
            <i className="fa-regular fa-thumbs-up"></i>
            &nbsp;{review.MD_REVIEW_LIKE}
        </td>

        <td>{review.MD_REVIEW_WRITTEN_DATE}</td>

        <td>
          {no == review.MEMBER_NO ? (
            <button className="foot-btnbox" onClick={delReview}>삭제</button>
          ) : null}
          &nbsp;
          {no == review.MEMBER_NO ? (
            <button className="foot-btnbox" onClick={handleShow}>수정</button>
          ) : null}
        </td>
      </tbody>


      <Modal show={show} onHide={handleClose}>
        <MemberReviewM review={review} no={no} />
      </Modal>
    </>
  );
};

export default MyReviewRow;
