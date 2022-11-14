import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { jsonMemoList } from "../../../service/dbLogic";
import { BROWN_BTN, CONTENTS, RED_BTN } from "../../../styles/NoticeStyle";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Pagination from "../Common/Pagination";
import MemberReceiveMemoRow from "./MemberReceiveMemoRow";
import SidebarMemo from "./SidebarMemo";

/*
  <<회원>> 받은 쪽지리스트 (user_id === to_id)
*/
const MemberReceiveMemoList = ({ no, isLogin, logout }) => {
  console.log("MemberReceiveMemoList 호출 성공");

  // 세션에 담긴 정보 (로그인 한 사용자)
  const user_id = window.sessionStorage.getItem("user_id");
  console.log("로그인 한 사용자 ==> " + user_id);

  // 페이지네이션 선언
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 쪽지 보내기 모달
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // [C] 쪽지 보내기
  const sendMemoBtn = () => {
    // confirm문 작성하기
    document.querySelector("#f_sendMemo").action =
      "http://localhost:9005/member/memo/memoInsert";
    document.querySelector("#f_sendMemo").submit();
  };

  // [R] 데이터 가져오기
  const [memoList, setMemoList] = useState([]);
  useEffect(() => {
    const memoListDB = async () => {
      console.log("[회원] memoListDB 호출 성공");
      const result = await jsonMemoList({ member_no: no });
      console.log(result);
      setMemoList(result.data);
    };
    memoListDB();
  }, []);

  return (
    <>
      <Header isLogin={isLogin} no={no} logout={logout} />

      <div className="container">
        <CONTENTS className="row">
          <SidebarMemo />
          <div className="col-9">
            <div className="list-wrapper">
              <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>
                받은쪽지함
              </p>

              <br />
              <br />

              {/* 버튼 */}
              <div className="d-flex justify-content-end">
                <BROWN_BTN onClick={handleShow}>쪽지전송</BROWN_BTN>
              </div>

              <table style={{ width: "1020px" }}>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>

                <thead>
                  <tr>
                    {/* <th>받은사람(나)</th> */}
                    <th>보낸사람</th>
                    <th>내용</th>
                    <th>보낸날짜</th>
                    <th>읽음여부</th>
                    <th>답장</th>
                    <th>삭제</th>
                  </tr>
                </thead>

                <tbody>
                  {memoList.slice(offset, offset + limit).map((memo, i) => (
                    <MemberReceiveMemoRow key={i} memo={memo} />
                  ))}
                </tbody>
              </table>

              {/* 페이지네이션 */}
              <Pagination
                total={memoList.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>
        </CONTENTS>
      </div>

      {/* 쪽지 보내기 모달 */}
      {/* 세션에서 받아온 로그인 한 회원 user_id, user_no 들어가야해! */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>쪽지 전송</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="f_sendMemo" method="get">
            <input type="hidden" name="msg_no" id="msg_no" />
            <input type="hidden" name="read_yn" id="read_yn" />
            <input type="hidden" name="from_id" id="from_id" value={user_id} />

            <Form.Group className="mb-3" controlId="formBasicFromMsg">
              {/* <Form.Label>받는 사람</Form.Label> */}
              <Form.Control
                type="text"
                name="to_id"
                placeholder="받는 사람의 이메일을 입력하세요."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFromMsg">
              {/* <Form.Label>내용</Form.Label> */}
              <Form.Control
                type="text"
                as="textarea"
                rows={10}
                name="msg_content"
                placeholder="내용을 입력해주세요."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMember_no">
              <Form.Control
                type="text"
                name="member_no"
                defaultValue={no}
                hidden={true}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <BROWN_BTN variant="info" onClick={sendMemoBtn}>
            전송
          </BROWN_BTN>
          <RED_BTN variant="danger" onClick={handleClose}>
            닫기
          </RED_BTN>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default MemberReceiveMemoList;
