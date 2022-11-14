import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Modal,
  Container,
  Form,
  Nav,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";
import { faqlist } from "../../../service/dbLogic";
import { TABTITLE } from "./../../../styles/MainStyle";
import FaqRowAdmin from "./FaqRowAdmin";
import Pagination from "./../../member/Common/Pagination";
import { BROWN_BTN } from "../../../styles/NoticeStyle";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const FaqAdmin = ({ isLogin, isAdmin, adminId }) => {
  let navigate = useNavigate();

  const [faqList, setFaqList] = useState([]);

  const [tab, setTab] = useState(0); // 탭기능 0이면 0번째 내용 보이게, 1이면 1번째 내용 ...

  /* 모달 관련 */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  /* **************************************************** */
  /* faqlist 데이터 가져오기 */
  useEffect(() => {
    const oracleDB = async () => {
      //const result = await jsonDeptList({ DEPTNO: 30 }) -> 스프링콘솔에 com.example.demo.dao.DeptDao  : pMap : {DEPTNO=30}
      const result = await faqlist(); // pMap : {}
      console.log(result);
      //console.log(result.data[3])
      setFaqList(result.data);
    };
    oracleDB();
  }, []);

  /* *************************************************  */
  // onchange 이벤트로 input 값 가져오기
  const onChange = (e) => {
    if (e.currentTarget == null) return;
  };

  /* ************************************************** */
  ////////////// 글등록 //////////////////

  const faqInsert = (e) => {
    e.preventDefault();
    const category = document.querySelector("#category").value;
    console.log(category); /* option value="정기구독" 이부분 출력됨 */

    let list = {
      // json 형태로 spring에 값을 넘김
      admin_id: "002", /////////////////// 일단 상수로 넣음
      faq_title: e.target.faq_title.value,
      faq_content: e.target.faq_content.value,
      faq_category: category,
    };
    // console.log(e.target.faq_category.value);
    console.log("faqInsert => " + JSON.stringify(list));

    axios
      .post(process.env.REACT_APP_SPRING_IP + "faq/faqinsert", list)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        handleClose();
        window.location.replace("/admin/faq");
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
      const res = await faqlist({ gubun: gubun, keyword: keyword });
      if (res.data) {
        console.log(res.data);
        setFaqList(res.data);
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
  const [title, setTitle] = useState("제목 ▼"); // 버튼명 저장
  const [hitCount, setHitCount] = useState("조회수 ▼"); // 버튼명 저장

  const sortTitle = () => {
    let sorting1 = [...faqList];
    if (sortBtn === 0) {
      setTitle("제목 ▲");
      setFaqList(
        sorting1.sort((a, b) =>
          a.FAQ_TITLE.toLowerCase() < b.FAQ_TITLE.toLowerCase() ? -1 : 1
        )
      );
      setSortBtn(1); /* 버튼 상태를 1로 - 토글 */
    } else if (sortBtn === 1) {
      setTitle("제목 ▼");
      //setFaqList(sorting.sort((a,b) => a.FAQ_NO < b.FAQ_NO ? -1 : 1))
      setFaqList(
        sorting1.sort((a, b) =>
          a.FAQ_TITLE.toLowerCase() > b.FAQ_TITLE.toLowerCase() ? -1 : 1
        )
      );
      setSortBtn(0); /* 버튼 상태를 0으로 - 토글 */
    }
  };

  const sortCount = () => {
    let sorting2 = [...faqList];
    if (sortBtn === 0) {
      setHitCount("조회수 ▲");
      setFaqList(
        sorting2.sort((a, b) => (a.FAQ_VIEW_COUNT < b.FAQ_VIEW_COUNT ? -1 : 1))
      );
      setSortBtn(1); /* 버튼 상태를 1로 - 토글 */
    } else if (sortBtn === 1) {
      setHitCount("조회수 ▼");
      //setFaqList(sorting.sort((a,b) => a.FAQ_NO < b.FAQ_NO ? -1 : 1))
      setFaqList(
        sorting2.sort((a, b) => (a.FAQ_VIEW_COUNT > b.FAQ_VIEW_COUNT ? -1 : 1))
      );
      setSortBtn(0); /* 버튼 상태를 0으로 - 토글 */
    }
  };

  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <div className="container">
        <h4>FAQ 관리</h4>
        <hr />

        <Row className="mt-4 mb-5">
          <Col xs={12} md={6}>
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
                <option value="faq_no">번호</option>
                <option value="faq_title">제목</option>
                <option value="faq_category">카테고리</option>
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

          <Col xs={6} md={6}>
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

              <Button
                variant="outline-secondary"
                id="btn_search"
                style={{ marginRight: "20px", width: "180px" }}
                onClick={() => {
                  navigate("/faq");
                }}
              >
                <i className="fa-solid fa-arrow-right"></i>
                &nbsp;회원페이지 이동
              </Button>

              <Button
                variant="outline-secondary"
                id="btn_search"
                style={{ marginRight: "20px", width: "100px" }}
                onClick={handleShow}
              >
                <i className="fa-regular fa-pen-to-square"></i>
                &nbsp;글쓰기
              </Button>
            </div>
          </Col>
        </Row>

        {/* ********************* Tab Content start ************************ */}
        <Nav fill variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTab(0);
              }}
              eventKey="link0"
            >
              <TABTITLE>전체보기</TABTITLE>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTab(1);
              }}
              eventKey="link1"
            >
              <TABTITLE>정기구독</TABTITLE>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTab(2);
              }}
              eventKey="link2"
            >
              <TABTITLE>주문/배송</TABTITLE>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTab(3);
              }}
              eventKey="link3"
            >
              <TABTITLE>회원혜택</TABTITLE>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTab(4);
              }}
              eventKey="link4"
            >
              <TABTITLE>상품관련</TABTITLE>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <table>
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "33%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "18%" }} />
          </colgroup>

          <thead>
            <tr>
              <th>번호</th>
              <th>카테고리</th>
              <th onClick={sortTitle} style={{ cursor: "pointer" }}>
                {title}
              </th>
              <th>작성자</th>
              <th>작성일</th>
              <th onClick={sortCount} style={{ cursor: "pointer" }}>
                {hitCount}
              </th>
              <th>수정 / 삭제</th>
            </tr>
          </thead>

          {
            [
              <tbody>
                {faqList.slice(offset, offset + limit).map((faq, i) => (
                  <FaqRowAdmin key={i} faq={faq} />
                ))}
              </tbody>,

              <tbody>
                {faqList.slice(offset, offset + limit).map((faq, i) => {
                  //console.log(faqList[i].FAQ_CATEGORY);
                  if (faqList[i].FAQ_CATEGORY === "정기구독")
                    return <FaqRowAdmin key={i} faq={faq} />;
                })}
              </tbody>,

              <tbody>
                {faqList.slice(offset, offset + limit).map((faq, i) => {
                  if (faqList[i].FAQ_CATEGORY === "주문/배송")
                    return <FaqRowAdmin key={i} faq={faq} />;
                })}
              </tbody>,

              <tbody>
                {faqList.slice(offset, offset + limit).map((faq, i) => {
                  if (faqList[i].FAQ_CATEGORY === "회원혜택")
                    return <FaqRowAdmin key={i} faq={faq} />;
                })}
              </tbody>,

              <tbody>
                {faqList.slice(offset, offset + limit).map((faq, i) => {
                  if (faqList[i].FAQ_CATEGORY === "상품관련")
                    return <FaqRowAdmin key={i} faq={faq} />;
                })}
              </tbody>,
            ][tab]
          }
        </table>
        {/* ********************* Tab Content end ************************ */}

        <Pagination
          total={faqList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />

        {/* ========[[[등록 모달 시작]]]======= */}
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title className="m_title">FAQ 등록</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* ##########################[[Form 전송 insert]]########################### */}
            {/* encType="multipart/form-data" */}
            <form id="f_board" onSubmit={faqInsert}>
              <Container>
                <Row>
                  <Col xs={6} md={4}>
                    <input id="admin_id" name="admin_id" type="hidden" />
                    <Form.Group className="mb-4 mt-3">
                      <Form.Label className="m_label">글제목</Form.Label>
                      <Form.Control
                        type="text"
                        name="faq_title"
                        size="lg"
                        onChange={onChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="m_label">카테고리</Form.Label>

                      <Form.Select
                        aria-label="Default select example"
                        size="lg"
                        id="category"
                        name="category"
                      >
                        <option>카테고리 선택</option>
                        <option value="정기구독">정기구독</option>
                        <option value="주문/배송">주문/배송</option>
                        <option value="회원혜택">회원혜택</option>
                        <option value="상품관련">상품관련</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={8}>
                    <Form.Group className="mb-5 mt-3">
                      <Form.Label className="m_label">글내용</Form.Label>
                      <Form.Control
                        name="faq_content"
                        onChange={onChange}
                        as="textarea"
                        rows={13}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Container>

              <div
                className="d-flex justify-content-end"
                style={{ marginBottom: "20px" }}
              >
                <BROWN_BTN type="submit">저장</BROWN_BTN>
              </div>
              {/* <input type="submit" value="저장" /> */}
            </form>
            {/* ##########################[[Form 전송 insert]]########################### */}
          </Modal.Body>
        </Modal>
        {/* ========[[[ 등록 모달 끝]]]======= */}
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default FaqAdmin;
