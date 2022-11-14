import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { BROWN_BTN, BROWN_BTN3, RED_BTN, RED_BTN2, RED_BTN3 } from '../../../styles/NoticeStyle';

const MemberSendMemoRow = (props) => {
  console.log("[회원] MemberSendeMemoRow 호출 성공");

  // 세션에 담긴 정보 (로그인 한 사용자)
  const user_id = window.sessionStorage.getItem("user_id");
  console.log("로그인한 아이디 ===> " + user_id);
      
  // 모달 관련
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // [D] 쪽지 한 건 삭제하기
  const msgDelBtn = () => {
  // alert("삭제 버튼 클릭");
  console.log("삭제할 쪽지 번호 ===> " + props.memo.MSG_NO);

  if(window.confirm("쪽지를 삭제하시겠습니까?")) {
    window.location.href 
    = "http://localhost:9005/member/memo/memoDelete?msg_no=" + props.memo.MSG_NO;
    alert("삭제되었습니다.");
  } else {
    alert("취소되었습니다.");
  }
  };

  // ******************** RENDER ********************
  return (
    <>
      {
        // send --> 로그인한 user_id가 보낸 메세지 (user_id === from_id)
        user_id === props.memo.FROM_ID
        ?
        <>
          <tr>
            {/* <td>{ props.memo.FROM_ID }</td> */}
            <td>{ props.memo.TO_ID }</td>
            <td>
              {/* 클릭하면 모달 띄우기 */}
              <Button
                variant="outline-secondary"
                id="btn_search"
                style={{ marginRight: "20px", width: "100%" }}
                onClick={handleShow}
              >
                { props.memo.MSG_CONTENT }
              </Button>
            </td>
            <td>{ props.memo.MSG_SEND_DATE }</td>
            <td>
              <RED_BTN3 onClick={msgDelBtn}>삭제</RED_BTN3>
            </td>
          </tr>
        </>
        :
        null
      }

      {/* 받은 상세보기 모달 */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>보낸 쪽지</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_sendmemo" method="get">
            <Form.Group className="mb-3" controlId="formBasicFromMsg">
              <Form.Label>받는 사람 : { props.memo.TO_ID }</Form.Label>
              
              <br />
              <br />
              
              <Form.Control 
                readOnly
                type="text"
                as="textarea"
                rows={10}
                name="msg_content"
                value={ props.memo.MSG_CONTENT }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <RED_BTN variant="danger" onClick={msgDelBtn}>
            삭제
          </RED_BTN>
          <BROWN_BTN variant="primary" onClick={handleClose}>
            닫기
          </BROWN_BTN>
        </Modal.Footer>
      </Modal>

      {/* 답장 모달 띄우기 */}
    </>
  );
}

export default MemberSendMemoRow;