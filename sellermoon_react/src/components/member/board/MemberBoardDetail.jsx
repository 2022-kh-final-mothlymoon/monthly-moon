import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { jsonBoardList } from "../../../service/dbLogic";
import {
  BROWN_BTN,
  CONTENTS,
  RED_BTN,
  YBEIGE_BTN,
} from "../../../styles/NoticeStyle";
import Header from "../Common/Header";
import SidebarBoard from "./SidebarBoard";
import MemberReplyForm from "../reply/MemberReplyForm";
import MemberReplyList from "../reply/MemberReplyList";

/* 
  <<<<< 회원 게시판 상세 조회 >>>>>
*/
const MemberBoardDetail = ({ no, isLogin, logout }) => {
  console.log("MemberBoardDetail 호출 성공");

  const navigate = useNavigate();

  // 세션에 담긴 정보 (로그인 한 사용자)
  const user_id = window.sessionStorage.getItem("user_id");
  console.log("로그인한 아이디 ===> " + user_id);

  // 신고 모달 관련
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // 데이터 초기화 -----------------------------------------------------
  const { board_no } = useParams();
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
    FILENAME: "",
    FILENAME: "",
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

  // [D] 삭제 버튼
  const delBtn = async () => {
    console.log("삭제할 글 번호 ===> " + boardVO.BOARD_NO);
    if (window.confirm("삭제하시겠습니까?")) {
      window.location.href =
        "http://localhost:9005/member/board/boardDelete?board_no=" +
        boardVO.BOARD_NO;
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  // [C] 신고 폼 전송하기
  const sendReport = () => {
    if (window.confirm("해당 게시글을 신고 하시겠습니까?")) {
      document.querySelector("#f_bReport").action =
        "http://localhost:9005/member/board/reportBInsert";
      document.querySelector("#f_bReport").submit();
      alert("신고되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  // 목록으로 버튼
  const listBtn = () => {
    console.log("목록으로 버튼 클릭");
    navigate("/board/boardList");
  };

  // 수정 폼 이동 버튼
  const editBtn = () => {
    console.log("수정할 글 번호 ===> " + boardVO.BOARD_NO);
    // 수정 버튼 누르면 해당 게시글의 모든 정보를 가지고 와야함..
    navigate("/board/boardEditForm/" + boardVO.BOARD_NO);
  };

  // ******************** RENDER ********************
  return (
    <>
      <Header isLogin={isLogin} no={no} logout={logout} />

      <div className="container">
        <CONTENTS className="row">
          <SidebarBoard />

          <div className="col-9">
            <div className="list-wrapper">
              <h4>MOON STRORY</h4>

              <br />
              <br />

              {/* 버튼 */}
              <div className="d-flex justify-content-end">
                {no == boardVO.MEMBER_NO ? null : (
                  <YBEIGE_BTN variant="warning" onClick={setShow}>
                    신고
                  </YBEIGE_BTN>
                )}
                {no == boardVO.MEMBER_NO ? (
                  <YBEIGE_BTN onClick={editBtn}>수정</YBEIGE_BTN>
                ) : null}
                {no == boardVO.MEMBER_NO ? (
                  <RED_BTN onClick={delBtn}>삭제</RED_BTN>
                ) : null}
                <BROWN_BTN onClick={() => navigate(-1)}>목록</BROWN_BTN>
              </div>

              <table style={{ width: "1020px" }}>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>

                <br />

                <tbody>
                  <tr>
                    <th>제목</th>
                    <td colSpan={4} id="td-title">
                      [{boardVO.BOARD_CATEGORY}]&nbsp;{boardVO.BOARD_TITLE}
                    </td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td colSpan={4}>{boardVO.MEMBER_NAME}</td>
                  </tr>
                  <tr>
                    <th>작성일</th>
                    <td>{boardVO.BOARD_WRITTEN_DATE}</td>
                    <th>조회수</th>
                    <td colSpan={2}>{boardVO.BOARD_HIT}</td>
                  </tr>
                  <tr>
                    <td colSpan={5} id="td-content">
                      {boardVO.BOARD_CONTENT}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* 댓글 목록 */}
              <MemberReplyList no={no} />

              {/* 댓글 작성 폼 */}
              <MemberReplyForm no={no} />
            </div>
          </div>
        </CONTENTS>

        {/* 신고 모달 */}
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>신고</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form id="f_bReport" method="get">
              <Form.Group className="mb-3" controlId="formBasicFromMsg">
                {/* <Form.Label>신고할 회원</Form.Label> */}
                <Form.Control
                  type="text"
                  name="member_no2"
                  plaintext
                  readOnly
                  defaultValue={boardVO.MEMBER_NO}
                  hidden={true}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFromMsg">
                {/* <Form.Label>신고할 글 번호</Form.Label> */}
                <Form.Control
                  type="text"
                  name="board_no"
                  plaintext
                  readOnly
                  defaultValue={boardVO.BOARD_NO}
                  hidden={true}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFromMsg">
                {/* <Form.Label>신고 내용</Form.Label> */}
                {/* <p>신고할 글 내용을 확인해주세요.</p> */}
                <Form.Control
                  type="text"
                  as="textarea"
                  // name="report_content"
                  plaintext
                  readOnly
                  defaultValue={boardVO.BOARD_CONTENT}
                  hidden={true}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFromMsg">
                {/* <Form.Label>신고 사유 선택</Form.Label> */}
                <Form.Select id="report_sort" name="report_sort">
                  <option defaultValue>신고 사유를 선택헤주세요.</option>
                  <option value="욕설, 비방, 차별, 혐오">
                    욕설, 비방, 차별, 혐오
                  </option>
                  <option value="홍보, 영리목적">홍보, 영리목적</option>
                  <option value="불법 정보">불법 정보</option>
                  <option value="음란, 청소년 유해">음란, 청소년 유해</option>
                  <option value="개인 정보 노출, 유포, 거래">
                    개인 정보 노출, 유포, 거래
                  </option>
                  <option value="도배, 스팸">도배, 스팸</option>
                  <option value="기타">기타</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMember_no">
                {/* <Form.Label>신고 이유</Form.Label> */}
                {/* <p>신고 이유를 작성해주세요.</p> */}
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={10}
                  name="report_reason"
                  placeHolder="신고 이유를 작성해주세요."
                />
              </Form.Group>

              {/* 신고 모달 작성한 회원 정보 hidden */}
              <Form.Group className="mb-3" controlId="formBasicMember_no">
                <Form.Control
                  type="text"
                  name="member_no"
                  value={no}
                  hidden={true}
                />
              </Form.Group>
            </Form>

            <Modal.Footer>
              <BROWN_BTN variant="primary" onClick={handleClose}>
                취소
              </BROWN_BTN>
              <RED_BTN variant="danger" onClick={sendReport}>
                신고
              </RED_BTN>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default MemberBoardDetail;
