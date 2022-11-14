import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BROWN_BTN, CONTENTS, RED_BTN } from "../../../styles/NoticeStyle";
import Header from "../Common/Header";
import SidebarBoard from "./SidebarBoard";

/* 
  <<<<< 회원 게시판 글 작성 >>>>>
*/
const MemberBoardForm = ({ no, isLogin, logout }) => {
  console.log("MemberBoardForm 호출 성공");

  const navigate = useNavigate();

  // [C] 글 전송 버튼
  const boardSubmitBtn = (event) => {
    if (window.confirm("글을 등록하시겠습니까?")) {
      document.querySelector("#f_board").action =
        "http://localhost:9005/member/board/boardInsert";
      document.querySelector("#f_board").submit();
    } else {
      event.preventDefault();
      // 토스트로 변경
      alert("등록이 취소되었습니다.");
    }
  };

  // 글쓰기 취소 버튼
  const cancelBtn = (event) => {
    if (window.confirm("취소하시겠습니까? 작성된 내용은 저장되지 않습니다.")) {
      // 토스트로 변경
      alert("취소되었습니다.");
      navigate("/board/boardList");
    } else {
      event.preventDefault();
    }
  };

  return (
    <>
      <Header isLogin={isLogin} no={no} logout={logout} />

      <div className="container">
        <CONTENTS className="row">
          <SidebarBoard />

          <div className="col-9">
            <h4>
              MOON STRORY <small>글 작성하기</small>
            </h4>

            <br />
            <br />

            <Form id="f_board" method="get" style={{ width: "1020px" }}>
              <input type="hidden" name="filename" id="filename" />
              <input type="hidden" name="fileurl" id="fileurl" />

              <Form.Group className="mb-3">
                <Form.Select
                  id="board_category"
                  name="board_category"
                  style={{ width: "150px" }}
                >
                  <option defaultValue="">게시판 선택</option>
                  <option value="자유게시판">자유게시판</option>
                  <option value="Q&A">Q&A</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBoard_title">
                <Form.Control
                  type="text"
                  name="board_title"
                  placeholder="제목을 입력해주세요."
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicBoard_content">
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={10}
                  name="board_content"
                  placeholder="내용을 입력해주세요."
                />
              </Form.Group>

              {/* 회원번호 hidden */}
              <Form.Group className="mb-3" controlId="formBasicMember_no">
                <Form.Control
                  type="text"
                  name="member_no"
                  value={no}
                  placeholder="회원번호를 입력해주세요."
                  hidden={true}
                />
              </Form.Group>
            </Form>

            {/* 버튼 */}
            <div
              className="d-flex justify-content-end"
              style={{ width: "1020px" }}
            >
              <BROWN_BTN onClick={boardSubmitBtn}>등록</BROWN_BTN>
              <RED_BTN onClick={cancelBtn}>취소</RED_BTN>
            </div>
          </div>
        </CONTENTS>
      </div>
    </>
  );
};

export default MemberBoardForm;
