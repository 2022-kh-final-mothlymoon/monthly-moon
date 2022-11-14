import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, InputGroup, Modal, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { jsonMemoList } from '../../../service/dbLogic';
import { BEIGE_BTN, BROWN_BTN, BROWN_BTN2, BROWN_BTN3, RED_BTN, RED_BTN2, RED_BTN3, YBEIGE_BTN } from '../../../styles/NoticeStyle';

const MemberReceiveMemoRow = (props) => {
  console.log("[회원] MemberReceiveMemoRow 호출 성공");

  const { msg_no } = useParams();

  // 세션에 담긴 정보 (로그인 한 사용자)
  const user_id = window.sessionStorage.getItem("user_id");
  console.log("로그인한 아이디 ===> " + user_id);
  const user_no = window.sessionStorage.getItem("user_no");
  console.log("로그인한 회원번호 ===> " + user_no);
  
  // 보낸 / 받은 쪽지 모달 관련
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // 답장 모달
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  // [C] 답장하기
  const sendMemoBtn = () => {
    // confirm문 작성하기
    document.querySelector("#f_reSendMemo").action = "http://localhost:9005/member/memo/memoInsert";
    document.querySelector("#f_reSendMemo").submit();
  }

  // [U] 읽음 여부 갱신
  const readYN = () => {
    console.log("읽음 여부 갱신할 쪽지 번호 ===> " + props.memo.MSG_NO)
    document.querySelector("#f_receivememo").action = "http://localhost:9005/member/memo/memoUpdate?msg_no" + props.memo.MSG_NO;
    document.querySelector("#f_receivememo").submit();
  }

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
        // receive --> 로그인한 user_id가 받은메세지 (user_id === to_id)
        user_id === props.memo.TO_ID
        ?
        <>
          <tr>
            {/* <td>{ props.memo.TO_ID }</td> */}
            <td>{ props.memo.FROM_ID }</td>
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
            <td>{ props.memo.READ_YN }</td>
            <td>
              <BEIGE_BTN onClick={handleShow2}>답장</BEIGE_BTN>
            </td>
            <td>
              <RED_BTN3 onClick={msgDelBtn}>삭제</RED_BTN3>
            </td>
          </tr>
        </>
        :
        null
      }

      {/* 받은 쪽지 상세보기 모달 */}
      <Modal 
        show={show} 
        onHide={() => {
          handleClose()
          readYN()
        }} 
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>받은 쪽지</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form id="f_receivememo" method="get">

            <input type="hidden" name="msg_no" id="msg_no" value={props.memo.MSG_NO} />

            <Form.Group className="mb-3" controlId="formBasicFromMsg">
              <Form.Label>보낸 사람 : { props.memo.FROM_ID }</Form.Label>
              
              <br />
              <br />

              <Form.Control 
                readOnly
                type="text"
                as="textarea"
                rows={10}
                name="msg_content"
                defaultValue={ props.memo.MSG_CONTENT }
              />
            </Form.Group>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <RED_BTN variant="danger" onClick={msgDelBtn}>
            삭제
          </RED_BTN>
          <BROWN_BTN
            variant="primary"
            onClick={() => {
              handleClose()
              readYN()
              }}
          >
            닫기
          </BROWN_BTN>
        </Modal.Footer>
      </Modal>

      {/* 답장 모달 띄우기 */}
      <Modal show={show2} onHide={handleClose2} animation={false}>
        
        <Modal.Header closeButton>
          <Modal.Title>답장하기</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="f_reSendMemo" method="get">
            <input type="hidden" name="msg_no" id="msg_no" />
            <input type="hidden" name="read_yn" id="read_yn" />
            <input type="hidden" name="from_id" id="from_id" value={user_id} />
          
            <Form.Group className="mb-3" controlId="formBasicFromMsg">
              <Form.Label>받는 사람</Form.Label>
              <Form.Control 
                type="text"
                name="to_id"
                plaintext readOnly defaultValue={ props.memo.FROM_ID }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFromMsg">
              <Form.Label>내용</Form.Label>

              <Form.Control 
                type="text"
                as="textarea"
                rows={10}
                name="msg_content"
                defaultValue={
                  // 이전에 받은 내용을 같이 메세지로 보내고싶어..
                  (props.memo.MSG_CONTENT)
                }
              >
              </Form.Control>
            
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMember_no">
              <Form.Control
                type="text"
                name="member_no"
                defaultValue={user_no}
                hidden={true}
              />
            </Form.Group>

          </Form>

          <Modal.Footer>
          <Button variant="info" onClick={sendMemoBtn}>
            전송
          </Button>
          <Button variant="danger" onClick={handleClose2}>
            닫기
          </Button>
        </Modal.Footer>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default MemberReceiveMemoRow;