import React from "react";
import { Modal, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BROWN_BTN } from "../../../styles/NoticeStyle";
import { pointlist } from "./../../../service/dbLogic";

const PointUpAdmin = () => {
  const { point_no } = useParams();

  /* 모달 관련 */
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* *************************************************  */

  const [pointVO, setPointVO] = useState({
    point_no: 0,
    point_date: "",
    point_used_saved: 0,
    member_no: 0,
    point_sum: 0,
    point_type: 0,
  });

  useEffect(() => {
    // 오라클 경유
    const asyncDB = async () => {
      const res = await pointlist({ point_no: point_no });
      //console.log(res);
      console.log(res.data);
      console.log(res.data[0]);
      setPointVO(res.data[0]); /////////////////////////// 데이터 초기화
    };
    asyncDB();
  }, [point_no]);

  /* *************************************************  */

  // onchange 이벤트로 input 값 가져오기
  const onChange = (e) => {
    if (e.currentTarget == null) return;
    console.log("폼 내용 변경 발생 name : " + e.target.name);
    console.log("폼 내용 변경 발생 value : " + e.target.value);
    e.preventDefault();
    /* faq배열 복제하고 n_no속성만 n_no로 덮어쓰기 */
    setPointVO({
      ...pointVO,
      point_no: point_no,
      [e.target.name]: e.target.value,
    });
  };

  /* ************************************************** */
  ////////////// 글수정 //////////////////
  const pointUpdate = (e) => {
    console.log(e.target.point_no.value);
    e.preventDefault();

    const point_type = document.querySelector("#point_type").value;
    console.log(point_type); /* option value="정기구독" 이부분 출력됨 */

    let list = {
      // json 형태로 spring에 값을 넘김
      point_no: parseInt(e.target.point_no.value),
      member_no: parseInt(e.target.member_no.value),
      point_used_saved: parseInt(e.target.point_used_saved.value),
      point_type: parseInt(point_type),
    };
    console.log("pointUpdate => " + JSON.stringify(list));

    axios
      .post(process.env.REACT_APP_SPRING_IP + "point/pointupdate", list)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        window.location.replace("/admin/point");
        alert("수정되었습니다!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /* ************************************************** */

  return (
    <>
      {/* ========[[[적립금 수정 모달 시작]]]======= */}
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title className="m_title">적립금 수정</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* ##########################[[Form 전송 update]]########################### */}
          <form id="f_board" onSubmit={pointUpdate} method="post">
            <Container>
              <Form.Group className="mb-4 mt-3">
                <input
                  id="faq_no"
                  name="faq_no"
                  type="hidden"
                  defaultValue={pointVO.POINT_NO}
                  onChange={onChange}
                />
                <Form.Label className="member_no">회원번호</Form.Label>
                <Form.Control
                  type="text"
                  name="member_no"
                  size="lg"
                  onChange={onChange}
                  defaultValue={pointVO.MEMBER_NO}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="m_label">적립/사용 내용</Form.Label>
                <p>선택된 내용 : {pointVO.POINT_TYPE} </p>
                <Form.Select
                  aria-label="Default select example"
                  size="lg"
                  id="point_type"
                  name="point_type"
                >
                  <option>내용 선택</option>
                  <option value="0">회원가입적립</option>
                  <option value="1">추천인기입</option>
                  <option value="2">주문적립</option>
                  <option value="3">상품후기등록</option>
                  <option value="4">베스트후기선정</option>
                  <option value="5">적립금사용</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="point_used_saved">적용금액</Form.Label>
                <Form.Control
                  type="text"
                  name="point_used_saved"
                  size="lg"
                  defaultValue={pointVO.POINT_USED_SAVED}
                  onChange={onChange}
                />
              </Form.Group>
            </Container>

            <div
              className="d-flex justify-content-end"
              style={{ marginBottom: "20px" }}
            >
              <BROWN_BTN type="submit">저장</BROWN_BTN>
            </div>
          </form>
          {/* ############################################################# */}
        </Modal.Body>
      </Modal>
      {/* ========[[[ 모달 끝]]]======= */}
    </>
  );
};

export default PointUpAdmin;
