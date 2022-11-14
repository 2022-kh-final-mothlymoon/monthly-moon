import React from "react";

// 이게 입포트되면 좋은데..
const MemberSendMemoForm = ({ no, isLogin, logout }) => {
  console.log("MemberSendMemoForm 호출 성공");

  // 세션에 담긴 정보 (로그인 한 사용자)
  const user_id = window.sessionStorage.getItem("user_id");
  console.log("로그인한 아이디 ===> " + user_id);

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

  return (
    <div>
      <Button variant="warning" onClick={handleShow}>
        쪽지보내기
      </Button>

      {/* 쪽지 보내기 모달 */}
      {/* 세션에서 받아온 로그인 한 회원 user_id, user_no 들어가야해! */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>쪽지 보내기</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="f_sendMemo" method="get">
            <input type="hidden" name="msg_no" id="msg_no" />
            <input type="hidden" name="read_yn" id="read_yn" />
            <input type="hidden" name="from_id" id="from_id" value={user_id} />

            <Form.Group className="mb-3" controlId="formBasicFromMsg">
              <Form.Label>받는 사람</Form.Label>
              <Form.Control
                type="text"
                name="to_id"
                placeholder="받는 사람의 이메일을 입력하세요."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFromMsg">
              <Form.Label>내용</Form.Label>
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
                value={no}
                hidden={true}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="info" onClick={sendMemoBtn}>
            전송
          </Button>
          <Button variant="danger" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberSendMemoForm;
