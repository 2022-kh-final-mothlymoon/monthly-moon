import React, { useEffect, useState } from "react";
import { noticelist } from "./../../../service/dbLogic";
import Header from "./../Common/Header";
import { CONTENTS, BROWN_BTN } from "./../../../styles/NoticeStyle";
import SidebarNotice from "./SidebarNotice";
import NoticeRow from "./NoticeRow";
import Pagination from "./../Common/Pagination";
import Footer from "./../Common/Footer";

const Notice = ({ isLogin, logout, no }) => {
  const [noticeList, setNoticeList] = useState([]);
  const [inputData, setInputData] = useState({ keyword: "" });

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
      //console.log(result)
      //console.log(result.data)
      //console.log(result.data[3])
      setNoticeList(result.data);
    };
    oracleDB();
  }, []);

  /* ************************************************** */
  /////////// 조건검색
  const dataSearch = (e) => {
    e.preventDefault();
    console.log(inputData.keyword);
    const gubun = document.querySelector("#gubun").value;
    const keyword = inputData.keyword;
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

  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Header isLogin={isLogin} logout={logout} no={no} />
      <div className="container">
        <CONTENTS className="row">
          <SidebarNotice />
          <div className="col-9">
            <div className="list-wrapper">
              <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>공지사항</p>
              <table style={{ width: "1020px" }}>
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>

                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                  </tr>
                </thead>

                <tbody>
                  {noticeList.slice(offset, offset + limit).map((notice, i) => (
                    <NoticeRow key={i} notice={notice} />
                  ))}
                </tbody>
              </table>

              <Pagination
                total={noticeList.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />

              {/* ####################[[조건 검색]]############################## */}

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
                  onChange={onChange}
                />
                <BROWN_BTN style={{ marginLeft: "10px" }} onClick={dataSearch}>
                  검색
                </BROWN_BTN>
                <BROWN_BTN
                  style={{ marginLeft: "15px", width: "200px" }}
                  onClick={refresh}
                >
                  전체목록
                </BROWN_BTN>
              </div>

              {/* ###################[[조건검색 끝]]####################### */}
            </div>
          </div>{" "}
          {/* end of col */}
        </CONTENTS>
      </div>{" "}
      {/* end of container */}
      <Footer />
    </>
  );
};

export default Notice;
