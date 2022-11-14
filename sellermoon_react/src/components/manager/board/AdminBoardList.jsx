import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { jsonBoardList } from "../../../service/dbLogic";
import AdminBoardRow from "./AdminBoardRow";
import Pagination from "./../../member/Common/Pagination";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { useNavigate } from "react-router-dom";
/*
  <<<<< 관리자 게시판 전체 조회 >>>>>
*/
const AdminBoardList = ({ isAdmin, adminId }) => {
  console.log("AdminBoardList 호출 성공");

  const navigate = useNavigate();

  // 페이지네이션 선언
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 조건검색
  const dataSearch = (e) => {
    e.preventDefault();
    const gubun = document.querySelector("#gubun").value;
    const keyword = document.querySelector("#keyword").value;
    console.log(gubun + "," + keyword);
    const asyncDB = async () => {
      const res = await jsonBoardList({ gubun: gubun, keyword: keyword });
      if (res.data) {
        console.log(res.data);
        setBoardList(res.data);
      }
    };
    asyncDB();
  };

  // 새로고침
  const refresh = () => {
    window.location.reload();
  };

  // [ R ] 데이터 가져오기
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    const boardListDB = async () => {
      console.log("[관리자] boardListDB 호출 성공");
      const result = await jsonBoardList();
      // console.log(result);
      // console.log(result.data);
      // console.log(result.data[1].MEMBER_NAME);
      setBoardList(result.data);
    };
    boardListDB();
  }, []);

  // ******************** RENDER ********************
  return (
    <>
      <Header isAdmin={isAdmin} adminId={adminId} />
      
      <br />

      <div className="container">
        <h4>게시판 관리 (Moon Story)</h4>
        <hr />

        {/* <div>카테고리 나눠야할 부분 입니당</div> */}

        {/* <hr /> */}

        <Row>
          <Col xs={12} md={6}>
            {/* 조건검색 시작 */}
            <div
              className="d-flex justify-content-baseline"
              style={{ width: "90%", height: "45px" }}
            >
              <select
                id="gubun"
                name="gubun"
                className="form-select"
                aria-label="분류선택"
                style={{ width: "40%", marginRight: "10px" }}
              >
                <option defaultValue>분류선택</option>
                <option value="board_title">글제목</option>
                <option value="member_name">작성자</option>
                <option value="board_title">글내용</option>
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
            {/* 조건 검색 끝 */}
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
                  navigate("/member/board/boardList");
                }}
              >
                <i className="fa-solid fa-arrow-right"></i>
                &nbsp;회원페이지 이동
              </Button>

            </div>
          </Col>

        </Row>

        <table>
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>

          <thead>
            <tr>
              <th>글번호</th>
              <th>카테고리</th>
              <th style={{ cursor: "pointer" }}>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th style={{ cursor: "pointer" }}>조회수</th>
              <th>블라인드</th>
            </tr>
          </thead>

          <tbody>
              {boardList.slice(offset, offset + limit).map((board, i) => (
                // 한 건의 데이터를 불러오기 (BoardRow가 한 건을 보여준다.)
                <AdminBoardRow key={i} board={board} />
              ))}
            </tbody>
        </table>

        <Pagination
          total={boardList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />

        <br />
        <br />
        
        <Footer />
      </div>
    </>
  );
};

export default AdminBoardList;
