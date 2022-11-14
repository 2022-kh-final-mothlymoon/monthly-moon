import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MemberBoardRow from "./MemberBoardRow";
import { jsonBoardList } from "../../../service/dbLogic";
import Pagination from "../Common/Pagination";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { BROWN_BTN, CONTENTS } from "../../../styles/NoticeStyle";
import SidebarBoard from "./SidebarBoard";

/* 
  <<<<< 회원 게시판 전체 조회 >>>>>
*/
const MemberBoardList = ({ no, isLogin, logout }) => {
  console.log("MemberBoardList 호출 성공");

  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ keyword: "" });

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

  // 폼 내용 변경 확인
  const onChange = (e) => {
    if (e.currentTarget == null) return;
    // console.log("폼 내용 변경 발생 name : "+e.target.name);
    // console.log("폼 내용 변경 발생 value : "+e.target.value);
    e.preventDefault();
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  // [ R ] 데이터 가져오기
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    const boardListDB = async () => {
      console.log("[회원] boardListDB 호출 성공");
      const result = await jsonBoardList();
      console.log(result);
      // console.log(result.data);
      // console.log(result.data[1].MEMBER_NAME);
      setBoardList(result.data); // 여러 건을 받아올 때는 배열 사용 X
    };
    boardListDB();
  }, []);

  // 글쓰기 버튼 (페이지 이동)
  const insertBtn = () => {
    console.log("글쓰기 버튼 클릭");
    navigate("/board/boardForm");
  };

  // ******************** RENDER ********************
  return (
    <>
      <Header isLogin={isLogin} no={no} logout={logout} />
      <div className="container">
        <CONTENTS className="row">
          <SidebarBoard />
          <div className="col-9">
            <div className="list-wrapper">
              <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>
                MOON STORY
              </p>

              <br />
              <br />

              {/* 버튼 */}
              <div className="d-flex justify-content-end">
                <BROWN_BTN onClick={insertBtn}>글쓰기</BROWN_BTN>
              </div>

              <table style={{ width: "1020px" }}>
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>

                <thead>
                  <tr>
                    <th>번호</th>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                  </tr>
                </thead>

                <tbody>
                  {boardList.slice(offset, offset + limit).map((board, i) => (
                    <MemberBoardRow key={i} board={board} />
                  ))}
                </tbody>
              </table>

              {/* 페이지네이션 */}
              <Pagination
                total={boardList.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />

              {/* 조건검색 */}
              <div
                className="d-flex mx-auto mt-4"
                style={{ width: "60%", height: "45px" }}
              >
                <select
                  id="gubun"
                  name="gubun"
                  className="form-select"
                  aria-label="분류"
                  style={{ width: "40%", marginRight: "10px" }}
                >
                  <option defaultValue>분류선택</option>
                  <option value="board_title">제목</option>
                  <option value="member_name">작성자</option>
                  <option value="board_category">카테고리</option>
                </select>
                <input
                  type="text"
                  id="keyword"
                  name="keyword"
                  className="form-control"
                  placeholder="검색어를 입력하세요"
                  onChange={onChange}
                />
                <BROWN_BTN style={{ marginLeft: "10px" }} onClick={dataSearch}>
                  검색
                </BROWN_BTN>
                {/* <BROWN_BTN
                  style={{ marginLeft: "15px", width: "200px" }}
                  onClick={refresh}
                >
                  전체목록
                </BROWN_BTN> */}
              </div>
            </div>
          </div>{" "}
        </CONTENTS>
      </div>{" "}
      <Footer />
    </>
  );
};

export default MemberBoardList;
