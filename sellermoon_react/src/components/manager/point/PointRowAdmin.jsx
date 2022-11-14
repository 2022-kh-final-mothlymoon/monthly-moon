import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { pointlist } from "./../../../service/dbLogic";
import { BROWN_BTN } from "../../../styles/NoticeStyle";

const PointRowAdmin = (props) => {
  let navigate = useNavigate();

  let result = props.point;

  /* 모달 관련 */
  const [show, setShow] = useState(false);
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

  //onchange 이벤트로 input 값 가져오기
  const onChange = (e) => {
    if (e.currentTarget == null) return;
    console.log("폼 내용 변경 발생 name : " + e.target.name);
    console.log("폼 내용 변경 발생 value : " + e.target.value);
    e.preventDefault();
    /* faq배열 복제하고 n_no속성만 n_no로 덮어쓰기 */
    setPointVO({
      ...pointVO,
      point_no: result.POINT_NO,
      [e.target.name]: e.target.value,
    });
  };

  /* ************************************************** */
  ////////////// 글수정 //////////////////
  const pointUpdate = (e) => {
    console.log(e.target.point_no.value);
    e.preventDefault();

    let list = {
      // json 형태로 spring에 값을 넘김
      point_no: parseInt(e.target.point_no.value),
      member_no: parseInt(e.target.member_no.value),
      point_type: parseInt(e.target.point_type.value),
      point_used_saved: parseInt(e.target.point_used_saved.value),
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

  /* *************************************************  */
  // 내용 삭제
  const pointDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        /* ********알림창에서 삭제 클릭 시 axios 실행********** */

        axios
          .get(
            process.env.REACT_APP_SPRING_IP +
              "point/pointdelete?point_no=" +
              props.point.POINT_NO
          )
          .then((response) => {
            console.log(response);
            console.log(response.data);
            window.location.reload();

            Swal.fire("삭제되었습니다!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  /* ************************************************** */

  return (
    <>
      <tr>
        <td>{result.POINT_NO}</td>
        <td>{result.MEMBER_NO}</td>
        <td style={{ fontWeight: "600" }}>
          {result.POINT_USED_SAVED.toLocaleString()}
        </td>
        <td>{result.POINT_TYPE}</td>
        <td style={{ color: "red", fontWeight: "600" }}>
          {result.POINT_SUM.toLocaleString()}
        </td>
        <td>{result.POINT_DATE}</td>
        <td>
          <div className="d-flex" style={{ margin: "auto" }}>
            <Button
              onClick={handleShow}
              variant="outline-secondary"
              id="btn_search"
              style={{ width: "80px" }}
            >
              <i className="fa-regular fa-file-lines"></i>
              &nbsp;수정
            </Button>
            {/* ************************[[ 삭제 버튼 클릭 시 해당 Row삭제**************************** */}
            <Button
              variant="outline-secondary"
              id="btn_search"
              style={{ marginLeft: "10px", width: "80px" }}
              onClick={pointDelete}
            >
              {" "}
              <i className="fa-regular fa-trash-can"></i>
              &nbsp;삭제
            </Button>
            {/* *********************************************************************************** */}
          </div>
        </td>
      </tr>

      {/* ========[[[적립금 수정 모달 시작]]]======= */}
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title className="m_title">적립금 수정</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* ##########################[[Form 전송 update]]########################### */}
          <form id="f_board" onSubmit={pointUpdate}>
            <Container>
              <Form.Group className="mb-4 mt-3">
                <Form.Label className="m_title">적립금번호</Form.Label>
                <Form.Control
                  type="text"
                  name="point_no"
                  id="point_no"
                  size="md"
                  onChange={onChange}
                  defaultValue={result.POINT_NO}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="m_title">회원번호</Form.Label>
                <Form.Control
                  type="text"
                  id="member_no"
                  name="member_no"
                  size="md"
                  onChange={onChange}
                  defaultValue={result.MEMBER_NO}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="m_title">적립/사용 내용</Form.Label>
                <p>선택된 내용 : {result.POINT_TYPE} </p>
                <Form.Select
                  aria-label="Default select example"
                  size="md"
                  id="point_type"
                  name="point_type"
                  onChange={onChange}
                >
                  <option>내용 선택</option>
                  <option value="0">회원가입적립</option>
                  <option value="1">추천인기입</option>
                  <option value="2">주문적립</option>2{" "}
                  <option value="3">상품후기등록</option>
                  <option value="4">베스트후기선정</option>
                  <option value="5">적립금사용</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="m_label">적용금액</Form.Label>
                <Form.Control
                  type="text"
                  id="point_used_saved"
                  name="point_used_saved"
                  size="md"
                  defaultValue={result.POINT_USED_SAVED}
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

export default PointRowAdmin;
