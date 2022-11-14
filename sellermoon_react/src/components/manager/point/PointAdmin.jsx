import React from "react";
import { Col, Form, Row, Button, Modal, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BROWN_BTN } from "../../../styles/NoticeStyle";
import Pagination from "./../../member/Common/Pagination";
import PointRowAdmin from "./PointRowAdmin";
import { pointlist } from "./../../../service/dbLogic";
import axios from "axios";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const PointAdmin = ({ isLogin, isAdmin, adminId }) => {
  let navigate = useNavigate();

  const [pointList, setPointList] = useState([]);

  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  /* ************************************************** */

  /* 포인트리스트 데이터 가져오기 */
  useEffect(() => {
    const pointList = async () => {
      await pointlist().then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          //console.log(res);
          console.log(res.data);
          setPointList(res.data);
        }
      });
    };
    pointList();
  }, []);

  /* *************************************************  */
  // onchange 이벤트로 input 값 가져오기
  const onChange = (e) => {
    if (e.currentTarget == null) return;
  };

  /* ************************************************** */
  ////////////// 글등록 //////////////////

  const pointInsert = (e) => {
    e.preventDefault();
    const point_type = document.querySelector("#point_type").value;
    //console.log(point_type); /* 0~6 출력 decode 번호 */

    let list = {
      // json 형태로 spring에 값을 넘김
      member_no: parseInt(e.target.member_no.value),
      point_type: parseInt(point_type),
      point_used_saved: parseInt(e.target.point_used_saved.value),
    };
    // console.log(e.target.faq_category.value);
    console.log("pointInsert => " + JSON.stringify(list));

    axios
      .post(process.env.REACT_APP_SPRING_IP + "point/pointinsert", list)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        window.location.replace("/admin/point");
        alert("등록되었습니다!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* ************************************************** */
  /////////// 조건검색
  const dataSearch = (e) => {
    e.preventDefault();
    const gubun = document.querySelector("#gubun").value;
    const keyword = document.querySelector("#keyword").value;
    console.log(gubun + "," + keyword);
    const asyncDB = async () => {
      const res = await pointlist({ gubun: gubun, keyword: keyword });
      if (res.data) {
        console.log(res.data);
        setPointList(res.data);
      }
    };
    asyncDB();
  };

  /* ************************************************** */
  // 새로고침
  const refresh = () => {
    window.location.reload();
  };

  /* ************************************************** */
  /* 오름차 내림차 정렬 관련 */
  const [sortBtn, setSortBtn] = useState(0); // 0일때와 1일때 버튼명 변경
  const [memNo, setMemNo] = useState("회원번호 ▼"); // 버튼명 저장
  const [point, setPoint] = useState("적용금액 ▼"); // 버튼명 저장
  const [type, setType] = useState("적립/사용 내용 ▼"); // 버튼명 저장

  const sortMemNo = () => {
    let sorting1 = [...pointList];
    if (sortBtn === 0) {
      setMemNo("회원번호 ▲");
      setPointList(
        sorting1.sort((a, b) => (a.MEMBER_NO < b.MEMBER_NO ? -1 : 1))
      );
      setSortBtn(1); /* 버튼 상태를 1로 - 토글 */
    } else if (sortBtn === 1) {
      setMemNo("회원번호 ▼");
      setPointList(
        sorting1.sort((a, b) => (a.MEMBER_NO > b.MEMBER_NO ? -1 : 1))
      );
      setSortBtn(0); /* 버튼 상태를 0으로 - 토글 */
    }
  };

  const sortPoint = () => {
    let sorting2 = [...pointList];
    if (sortBtn === 0) {
      setPoint("적용금액 ▲");
      setPointList(
        sorting2.sort((a, b) =>
          a.POINT_USED_SAVED < b.POINT_USED_SAVED ? -1 : 1
        )
      );
      setSortBtn(1); /* 버튼 상태를 1로 - 토글 */
    } else if (sortBtn === 1) {
      setPoint("적용금액 ▼");
      setPointList(
        sorting2.sort((a, b) =>
          a.POINT_USED_SAVED > b.POINT_USED_SAVED ? -1 : 1
        )
      );
      setSortBtn(0); /* 버튼 상태를 0으로 - 토글 */
    }
  };

  const sortType = () => {
    let sorting3 = [...pointList];
    if (sortBtn === 0) {
      setType("적립/사용 내용 ▲");
      setPointList(
        sorting3.sort((a, b) => (a.POINT_TYPE < b.POINT_TYPE ? -1 : 1))
      );
      setSortBtn(1); /* 버튼 상태를 1로 - 토글 */
    } else if (sortBtn === 1) {
      setType("적립/사용 내용 ▼");
      setPointList(
        sorting3.sort((a, b) => (a.POINT_TYPE > b.POINT_TYPE ? -1 : 1))
      );
      setSortBtn(0); /* 버튼 상태를 0으로 - 토글 */
    }
  };

  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <br />
      <div className="container">
        <h4>적립금 수동 관리</h4>
        <hr />

        <Row>
          <Col xs={12} md={9}>
            <Row>
              <Col xs={12} md={8}>
                {/* ####################[[조건 검색]]############################## */}
                <div
                  className="d-flex justify-content-baseline"
                  style={{ width: "90%", height: "45px" }}
                >
                  <select
                    id="gubun"
                    name="gubun"
                    className="form-select"
                    aria-label="분류"
                    style={{ width: "40%", marginRight: "10px" }}
                  >
                    <option defaultValue>분류선택</option>
                    <option value="point_no">적립금번호</option>
                    <option value="member_no">회원번호</option>
                    <option value="point_type">적립/사용 내용</option>
                  </select>
                  <input
                    type="text"
                    id="keyword"
                    name="keyword"
                    className="form-control"
                    placeholder="검색어를 입력하세요"
                  />
                  <Button
                    variant="outline-secondary"
                    id="btn_search"
                    style={{ marginLeft: "10px", width: "100px" }}
                    onClick={dataSearch}
                  >
                    검색
                  </Button>
                </div>
                {/* ###################[[조건검색 끝]]####################### */}
              </Col>

              <Col xs={6} md={4}>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-secondary"
                    id="btn_search"
                    style={{ marginRight: "20px", width: "120px" }}
                    onClick={refresh}
                  >
                    <i className="fa-solid fa-arrows-rotate"></i>
                    &nbsp;새로고침
                  </Button>
                </div>
              </Col>
            </Row>

            <p style={{ margin: "10px 10px", fontSize: "0.9rem" }}>
              [적립/사용 검색 분류코드] 0 : 회원가입적립 / 1 : 추천인기입 / 2 :
              주문적립 / 3 : 상품후기등록 / 4 : 베스트후기선정 / 5 : 적립금사용
            </p>

            <table>
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "13%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "23%" }} />
                <col style={{ width: "13%" }} />
                <col style={{ width: "13%" }} />
                <col style={{ width: "16%" }} />
              </colgroup>

              <thead>
                <tr>
                  <th>적립번호</th>
                  <th onClick={sortMemNo} style={{ cursor: "pointer" }}>
                    {memNo}
                  </th>
                  <th onClick={sortPoint} style={{ cursor: "pointer" }}>
                    {point}
                  </th>
                  <th onClick={sortType} style={{ cursor: "pointer" }}>
                    {type}
                  </th>
                  <th>잔여적립금</th>
                  <th>적용일자</th>
                  <th>수정 / 삭제</th>
                </tr>
              </thead>

              <tbody>
                {pointList.slice(offset, offset + limit).map((point, i) => (
                  <PointRowAdmin key={i} point={point} i={i} />
                ))}
              </tbody>
            </table>

            <Pagination
              total={pointList.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </Col>

          {/* ******************************************************************** */}

          <Col xs={6} md={3}>
            <div
              style={{ borderLeft: "2px solid #e6e6e6", padding: "5px 20px" }}
            >
              <form
                id="f_board"
                onSubmit={pointInsert}
                encType="multipart/form-data"
              >
                <Container>
                  <Form.Group className="mb-4 mt-3">
                    <h5 style={{ marginBottom: "30px" }}>적립금 추가</h5>
                    <Form.Label className="member_no">회원번호</Form.Label>
                    <Form.Control
                      type="text"
                      id="member_no"
                      name="member_no"
                      size="lg"
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="m_label">적립/사용 내용</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      size="lg"
                      id="point_type"
                      name="point_type"
                    >
                      <option>내용 선택</option>
                      <option value="2">주문적립</option>
                      <option value="5">적립금사용</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="point_used_saved">
                      적용금액
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="point_used_saved"
                      name="point_used_saved"
                      size="lg"
                      onChange={onChange}
                    />
                    <Form.Text className="text-muted">
                      &nbsp;적립금사용 ex) -2000
                    </Form.Text>
                  </Form.Group>
                </Container>

                <div
                  className="d-flex justify-content-end"
                  style={{ marginBottom: "20px" }}
                >
                  <BROWN_BTN type="submit">저장</BROWN_BTN>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default PointAdmin;
