import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { jsonBoardList } from "../../../service/dbLogic";
import { BROWN_BTN, CONTENTS, RED_BTN } from "../../../styles/NoticeStyle";
import Header from "../Common/Header";
import SidebarBoard from "./SidebarBoard";

/* 
  <<<<< 회원 게시판 글 수정 >>>>>
*/
const MemberEditBoardForm = ({ isLogin, logout, no }) => {
  console.log("MemberEditBoardForm 호출 성공");

  const navigate = useNavigate();
  const [file, setFile] = useState({ fileName: null, fileURL: null }); // 이미지 등록
  const { board_no } = useParams();
  // 데이터 초기화
  const [boardVO, setBoardVO] = useState({
    BOARD_NO: 0,
    BOARD_CATEGORY: "",
    BOARD_TITLE: "",
    BOARD_CONTENT: "",
    MEMBER_NAME: "",
    BOARD_WRITTEN_DATE: "",
    BOARD_HIT: 0,
    BOARD_LIKE: 0,
    BOARD_DISLIKE: 0,
  });

  // [R] 데이터 가져오기
  useEffect(() => {
    const boardDetailDB = async () => {
      console.log("[회원] : boardDetailDB 호출 성공");
      // spring - jsonBoardList 데이터 읽기
      const result = await jsonBoardList({ board_no: board_no });
      console.log(result);
      // console.log(result.data);
      // console.log(res.data[0].BOARD_TITLE);
      setBoardVO(result.data[0]); // 한 건을 받아올 때는 [] 배열 사용
    };
    boardDetailDB();
  }, [board_no]);

  // [U] 글 수정 버튼
  const boardUpdateBtn = (event) => {
    if (window.confirm("글을 수정하시겠습니까?")) {
      document.querySelector("#f_board").action =
        "http://localhost:9005/member/board/boardUpdate?board_no" + board_no;
      document.querySelector("#f_board").submit();
    } else {
      event.preventDefault();
      // 토스트로 변경
      alert("수정이 취소되었습니다.");
    }
  };

  // 글쓰기 취소 버튼
  const cancelBtn = (event) => {
    if (window.confirm("취소하시겠습니까? 수정된 내용은 저장되지 않습니다.")) {
      // 토스트로 변경
      alert("취소되었습니다.");
      navigate("/board/boardList");
    } else {
      event.preventDefault();
    }
  };

  //
  const handleChangeForm = (e) => {
    if (e.currentTarget == null) return;
    e.preventDefault();
    console.log(board_no);
    setBoardVO({
      ...boardVO, // 처음에 초기화된 정보에 얕은 복사 처리
      BOARD_NO: board_no,

      [e.target.name]: e.target.value,
    });
    console.log(board_no);
  };

  return (
    <>
      <Header isLogin={isLogin} no={no} logout={logout} />

      <div className="container">
        <CONTENTS className="row">
          <SidebarBoard />

          <div className="col-9">
            <h4>
              MOON STRORY <small>글 수정하기</small>
            </h4>

            <br />
            <br />

            <Form id="f_board" method="get" style={{ width: "1020px" }}>
              <input type="hidden" name="filename" id="filename" />
              <input type="hidden" name="fileurl" id="fileurl" />

              {/* 카테고리 선택 */}
              <Form.Group className="mb-3">
                <Form.Select
                  id="board_category"
                  name="board_category"
                  style={{ width: "150px" }}
                  type="text"
                  defaultValue={boardVO.BOARD_CATEGORY}
                  onChange={handleChangeForm}
                >
                  <option value="자유게시판">자유게시판</option>
                  <option value="Q&A">Q&A</option>
                </Form.Select>
              </Form.Group>

              {/* 제목 */}
              <Form.Group className="mb-3" controlId="formBasicBoard_title">
                <Form.Control
                  type="text"
                  name="board_title"
                  defaultValue={boardVO.BOARD_TITLE}
                  onChange={handleChangeForm}
                />
              </Form.Group>

              {/* 내용 */}
              <Form.Group className="mb-3" controlId="formBasicBoard_content">
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={10}
                  name="board_content"
                  defaultValue={boardVO.BOARD_CONTENT}
                  onChange={handleChangeForm}
                />
              </Form.Group>

              {/* 회원번호 hidden */}
              <Form.Group className="mb-3" controlId="formBasicMember_no">
                <Form.Control
                  type="text"
                  name="member_no"
                  value={no}
                  hidden={true}
                />
              </Form.Group>

              {/* 글 번호 hidden */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  type="hidden"
                  name="board_no"
                  defaultValue={boardVO.BOARD_NO}
                  onChange={handleChangeForm}
                />
              </Form.Group>
            </Form>

            {/* 버튼 */}
            <div
              className="d-flex justify-content-end"
              style={{ width: "1020px" }}
            >
              <BROWN_BTN onClick={boardUpdateBtn}>수정</BROWN_BTN>
              <RED_BTN onClick={cancelBtn}>취소</RED_BTN>
            </div>
          </div>
        </CONTENTS>
      </div>
    </>
  );
};

export default MemberEditBoardForm;
