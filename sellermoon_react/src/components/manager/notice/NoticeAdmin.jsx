import React from "react";
import { Button, Form, Modal, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { noticelist } from "./../../../service/dbLogic";
import Pagination from "./../../member/Common/Pagination";
import NoticeRowAdmin from "./NoticeRowAdmin";
import { BROWN_BTN } from "../../../styles/NoticeStyle";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const NoticeAdmin = ({ isLogin, isAdmin, adminId }) => {
  let navigate = useNavigate();
  let admin_id = sessionStorage.getItem("admin");
  const [noticeList, setNoticeList] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  /* **************************************************** */
  /* noticelist 데이터 가져오기 */
  useEffect(() => {
    const oracleDB = async () => {
      //const result = await jsonDeptList({ DEPTNO: 30 }) -> 스프링콘솔에 com.example.demo.dao.DeptDao  : pMap : {DEPTNO=30}
      const result = await noticelist(); // pMap : {}
      console.log(result);
      //console.log(result.data[3])
      setNoticeList(result.data);
    };
    oracleDB();
  }, []);

  /* *************************************************  */
  // onchange 이벤트로 input 값 가져오기
  //File은 e.target.files[0]로 가져오는게 핵심 - e.target.value로 가져오면 에러
  const onChange = (e) => {
    if (e.currentTarget == null) return;
  };

  const onChangeFile = (e) => {
    if (e.currentTarget == null) return;
    console.log(e.target.files[0]);
  };

  /* ************************************************** */
  ////////////// 글등록 //////////////////
  const noticeInsert = (e) => {
    e.preventDefault();
    let list = {
      // json 형태로 spring에 값을 넘김
      admin_id: admin_id,
      notice_title: e.target.notice_title.value,
      notice_content: e.target.notice_content.value,
      notice_category: e.target.notice_category.value,
      notice_file: e.target.notice_file.files[0],
    };
    console.log(e.target.notice_file.files[0]);
    console.log("noticeInsert => " + JSON.stringify(list));

    axios
      .post(process.env.REACT_APP_SPRING_IP + "notice/noticeinsert", list, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        handleClose();
        window.location.replace("/admin/notice");
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
      const res = await noticelist({ gubun: gubun, keyword: keyword });
      if (res.data) {
        console.log(res.data);
        setNoticeList(res.data);
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
    let sorting1 = [...noticeList];
    if (sortBtn === 0) {
      setTitle("제목 ▲");
      setNoticeList(
        sorting1.sort((a, b) =>
          a.NOTICE_TITLE.toLowerCase() < b.NOTICE_TITLE.toLowerCase() ? -1 : 1
        )
      );
      setSortBtn(1); /* 버튼 상태를 1로 - 토글 */
    } else if (sortBtn === 1) {
      setTitle("제목 ▼");
      //setFaqList(sorting.sort((a,b) => a.FAQ_NO < b.FAQ_NO ? -1 : 1))
      setNoticeList(
        sorting1.sort((a, b) =>
          a.NOTICE_TITLE.toLowerCase() > b.NOTICE_TITLE.toLowerCase() ? -1 : 1
        )
      );
      setSortBtn(0); /* 버튼 상태를 0으로 - 토글 */
    }
  };

  const sortCount = () => {
    let sorting2 = [...noticeList];
    if (sortBtn === 0) {
      setHitCount("조회수 ▲");
      setNoticeList(
        sorting2.sort((a, b) => (a.NOTICE_HIT < b.NOTICE_HIT ? -1 : 1))
      );
      setSortBtn(1); /* 버튼 상태를 1로 - 토글 */
    } else if (sortBtn === 1) {
      setHitCount("조회수 ▼");
      //setFaqList(sorting.sort((a,b) => a.FAQ_NO < b.FAQ_NO ? -1 : 1))
      setNoticeList(
        sorting2.sort((a, b) => (a.NOTICE_HIT > b.NOTICE_HIT ? -1 : 1))
      );
      setSortBtn(0); /* 버튼 상태를 0으로 - 토글 */
    }
  };

  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <br />
      <div className="container">
        <h4>공지사항 관리</h4>
        <hr />

        <Row>
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
                <option value="notice_no">번호</option>
                <option value="notice_title">제목</option>
                <option value="notice_category">카테고리</option>
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
                  navigate("/notice");
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

        <table>
          <colgroup>
            <col style={{ width: "7%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
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

          <tbody>
            {noticeList.slice(offset, offset + limit).map((notice, i) => (
              <NoticeRowAdmin key={i} notice={notice} />
            ))}
          </tbody>
        </table>

        <Pagination
          total={noticeList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />

        {/* ========[[[등록 모달 시작]]]======= */}
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title className="m_title">공지사항 등록</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* ##########################[[Form 전송 insert]]########################### */}
            <form
              id="f_board"
              onSubmit={noticeInsert}
              encType="multipart/form-data"
            >
              <Container>
                <Row>
                  <Col xs={6} md={4}>
                    <input
                      id="admin_id"
                      name="admin_id"
                      value={admin_id}
                      type="hidden"
                    />
                    <Form.Group className="mb-4 mt-3">
                      <Form.Label className="m_label">글제목</Form.Label>
                      <Form.Control
                        type="text"
                        name="notice_title"
                        size="lg"
                        onChange={onChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="m_label">카테고리</Form.Label>
                      <Form.Control
                        type="text"
                        name="notice_category"
                        size="lg"
                        onChange={onChange}
                      />
                      <Form.Text className="text-muted">
                        &nbsp;안내사항 / 이벤트 / 긴급안내 / 기쁜소식 / 출시소식
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        className="form-control"
                        size="lg"
                        type="file"
                        id="notice_file"
                        name="notice_file"
                        onChange={onChangeFile}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={8}>
                    <Form.Group className="mb-5 mt-3">
                      <Form.Label className="m_label">글내용</Form.Label>
                      <Form.Control
                        name="notice_content"
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

export default NoticeAdmin;
