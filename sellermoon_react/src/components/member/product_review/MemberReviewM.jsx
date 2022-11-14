import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { modReview, reviewModify } from "../../../service/dbLogic";

const MemberReviewM = ({ review, no }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [content, setContent] = useState({
    md_review_no: 0,
    member_no: 0,
    md_no: 0,
    md_review_content: "",
    md_review_written_date: "",
  }); // 수정할 리뷰 내용 담기
  const mdfReview = (e) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  // 수정 버튼
  const modiReview = (e) => {
    console.log(review.MD_REVIEW_NO);
    reviewModify({
      md_review_no: review.MD_REVIEW_NO,
      md_review_content: content.md_review_content,
    }).then((res) => {
      console.log(res.data);
      if (res.data === 1) {
        alert("수정되었습니다!");
        window.location.reload();
      } else {
        alert("수정에 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    modReview({ md_review_no: review.MD_REVIEW_NO }).then((res) => {
      console.log(res.data);
      setContent(res.data);
    });
  }, []);

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>리뷰 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          aria-label="With textarea"
          type="text"
          name="md_review_content"
          value={content.md_review_content}
          onChange={mdfReview}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={modiReview}>
          리뷰 수정
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default MemberReviewM;
