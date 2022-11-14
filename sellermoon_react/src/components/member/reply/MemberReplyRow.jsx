import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BROWN_BTN2, BROWN_BTN3, RED_BTN2, YBEIGE_BTN2 } from "../../../styles/NoticeStyle";
import { OTD1 } from "../../../styles/SubStyle";

/*
  <<<<< 회원 댓글 Row >>>>>
*/
const MemberReplyRow = ({ no, reply, isLogin, props }) => {
  console.log("memberReplyRow 호출 성공");

  // 현재 글 번호
  const { board_no } = useParams();
  console.log("현재 글 번호 ===> " + board_no);

  // 댓글 수정 모달 관련
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // [U] 수정 버튼
  const editBtn = async (event) => {
    console.log("댓글 수정 버튼 클릭");
    console.log("수정할 댓글 번호 ===> " + reply.REPLY_NO);
    
    if(window.confirm("댓글을 수정하시겠습니까?")) {
      document.querySelector("#f_rUpdate").action = "http://localhost:9005/member/board/replyUpdate?reply_no" + reply.REPLY_NO;
      document.querySelector("#f_rUpdate").submit();
    } else {
      event.preventDefault();
       // 토스트로 변경
      alert("수정이 취소되었습니다.");
    }
  };

  // [D] 삭제 버튼
  const delBtn = async () => {
    console.log("삭제할 댓글 번호 ===> " + reply.REPLY_NO);
    if (window.confirm("삭제하시겠습니까?")) {
      window.location.href =
        "http://localhost:9005/member/board/replyDelete?reply_no=" +
        reply.REPLY_NO;
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };
  // [C] 댓글 신고
  const sendReplyReport = () => {
    if (window.confirm("해당 댓글을 신고 하시겠습니까?")) {
      document.querySelector("#f_rReport").action =
        "http://localhost:9005/member/board/reportRInsert";
      document.querySelector("#f_rReport").submit();
      alert("신고되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  // ******************** RENDER ********************
  return (
    <>
      <colgroup>
        <col style={{ width: "61%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "15%" }} />
      </colgroup>

      <thead>
        <tr>
          <th colSpan={3} style={{padding:"20px"}}>
            <span style={{fontSize:"18px", margin:"20px"}}>
              <i className="fa-solid fa-user-pen"></i>
              &nbsp; &nbsp; { reply.MEMBER_NAME }
            </span>
          </th>
          <th colSpan={2}>{ reply.REPLY_DATE }</th>
        </tr>
      </thead>

      <tbody style={{borderBottom:"2px solid #b29d82"}}>
        <tr>
          <OTD1 colSpan={5}>
            { reply.REPLY_CONTENT }

            <div className="d-flex justify-content-end">
              {no == reply.MEMBER_NO ? (
                <BROWN_BTN3 variant="primary" onClick={setShow}>
                  수정
                </BROWN_BTN3>
              ) : null}
              {no == reply.MEMBER_NO ? (
                <RED_BTN2 variant="danger" onClick={delBtn}>
                  삭제
                </RED_BTN2>
              ) : null}
              { no == reply.MEMBER_NO ? (
                null
              ) : 
                <YBEIGE_BTN2 variant="warning" onClick={sendReplyReport}>
                  신고
                </YBEIGE_BTN2> 
              }
            </div>
          </OTD1>
        </tr>
      </tbody>

      {/* 댓글 수정 폼 */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>댓글 수정</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="f_rUpdate" method="get">

          <input type="hidden" name="reply_no" id="reply_no" value={ reply.REPLY_NO } />

            {/* 내용 */}
            <Form.Group className="mb-3" controlId="formBasicBoard_content">
              <Form.Control
                type="text"
                name="reply_content"
                defaultValue={ reply.REPLY_CONTENT }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={editBtn}>
            수정
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 댓글 신고 폼 hidden */}
      <Form id="f_rReport" method="get">
        <input type="hidden" name="member_no" id="member_no" value={no} />
        <input
          type="hidden"
          name="member_no2"
          id="member_no2"
          value={reply.MEMBER_NO}
        />
        <input
          type="hidden"
          name="reply_no"
          id="reply_no"
          value={reply.REPLY_NO}
        />
        <input
          type="hidden"
          name="board_no"
          id="board_no"
          value={reply.BOARD_NO}
        />
      </Form>
      
    </>
  );
};

export default MemberReplyRow;
