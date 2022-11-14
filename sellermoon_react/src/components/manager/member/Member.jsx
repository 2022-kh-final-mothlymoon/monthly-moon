import React from "react";
import { Button } from "react-bootstrap";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import DatePicker from "react-datepicker";

const Member = (props) => {
  const AllChk = () => {
    console.log("전체 선택");
  };
  const SendMail = () => {
    console.log("메일 발송");
  };
  const reset = () => {
    console.log("선택 초기화");
  };
  const search = () => {
    console.log("검색");
  };
  return (
    <>
      <Header />
      <div className="body_container">
        <h4>회원 관리 페이지</h4>
        {/* 검색 시작 */}
        <div className="tb_search">
          <table style={{ width: "100%", marginBottom: 10 }}>
            <tbody>
              <tr>
                <th className="bdb bdr">검색</th>
                <td className="bdb bdr">
                  <input
                    type="text"
                    name="s_keyword"
                    className="AXInput"
                    style={{ width: "95%" }}
                    placeholder="검색어를 입력해주세요"
                  />
                </td>
                <th className="bdb bdr">가입일</th>
                <td className="bdb bdr">
                  <div className="inlineBlock">
                    <input
                      type="text"
                      name="s_srdate"
                      className="AXInput W100 hasDatepicker"
                      autoComplete="off"
                      maxLength="10"
                    />
                    ~
                    <input
                      type="text"
                      name="s_srdate"
                      className="AXInput W100 hasDatepicker"
                      autoComplete="off"
                      maxLength="10"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>정렬</th>
                <td>
                  <select name="s_align" id="s_align" className="AXSelect">
                    <option value="0">가입일</option>
                    <option value="1">회원번호</option>
                    <option value="2">이름</option>
                  </select>
                </td>
                <th className="bdb bdr">회원등급</th>
                <td className="bdb bdr">
                  <select name="s_sort" id="s_sort" className="AXSelect">
                    <option value="0"></option>
                    <option value="1">초승달</option>
                    <option value="2">반달</option>
                    <option value="3">보름달</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <Button
              className="btn btn-light btn-outline-secondary px-3"
              onClick={reset}
            >
              초기화
            </Button>
            &nbsp;
            <Button
              className="btn btn-light btn-outline-secondary px-3"
              onClick={search}
            >
              검색
            </Button>
          </div>
        </div>
        {/* 검색 끝 */}

        <div className="tb_list">
          <h4>회원 목록</h4>
          <table style={{ width: "100%", marginBottom: 10 }}>
            <tbody>
              <tr>
                <th className="bdr">
                  <input type="checkbox" name="all" onClick={AllChk} />
                </th>
                <th className="bdr">회원번호</th>
                <th className="bdr">회원등급</th>
                <th className="bdr">이름</th>
                <th className="bdr">아이디</th>
                <th className="bdr">연락처</th>
                <th className="bdr">가입일</th>
              </tr>
              <tr>
                <td colSpan={10} className="bdr bdt">
                  회원이 존재하지 않습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="btn_side">
          <p className="right">
            <span>
              <Button
                className="btn btn-light btn-outline-secondary px-3"
                onClick={SendMail}
              >
                선택 메일 발송
              </Button>
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Member;
