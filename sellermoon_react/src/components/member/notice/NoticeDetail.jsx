import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { noticelist } from "./../../../service/dbLogic";
import Header from "./../Common/Header";
import SidebarNotice from "./SidebarNotice";
import Footer from "./../Common/Footer";
import { CONTENTS, FILEDOWN, BROWN_BTN } from "./../../../styles/NoticeStyle";

const NoticeDetail = ({ isLogin, logout, no }) => {
  let navigate = useNavigate();

  const { notice_no } = useParams();

  const fileDown = () => {
    window.location.href =
      process.env.REACT_APP_SPRING_IP +
      "board/downLoad.jsp?notice_file=" +
      noticeVO.NOTICE_FILE;
  };

  const [noticeVO, setNoticeVO] = useState({
    notice_no: 0,
    notice_title: "",
    notice_content: "",
    notice_hit: 0,
    notice_category: "",
    notice_regdate: "",
    notcie_file: "",
  });

  useEffect(() => {
    // 오라클 경유
    const asyncDB = async () => {
      const res = await noticelist({
        notice_no: notice_no,
      }); /* notice_no = useParam */
      //console.log(res);
      console.log(res.data);
      console.log(res.data[0]);
      setNoticeVO(res.data[0]); /////////////////////////// 데이터 초기화
    };
    asyncDB();
  }, [notice_no]);

  return (
    <>
      <Header isLogin={isLogin} logout={logout} no={no} />

      <div className="container">
        <CONTENTS className="row">
          <SidebarNotice />

          <div className="col-9">
            <div className="list-wrapper">
              <h4>공지사항</h4>
              <table style={{ width: "1020px" }}>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>

                <tbody>
                  <tr>
                    <th>제목</th>
                    <td colSpan={4} id="td-title">
                      [{noticeVO.NOTICE_CATEGORY}]&nbsp;{noticeVO.NOTICE_TITLE}
                    </td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td colSpan={4}>{noticeVO.ADMIN_ID}</td>
                  </tr>
                  <tr>
                    <th>첨부파일</th>
                    <td colSpan={4} onClick={fileDown}>
                      <FILEDOWN>{noticeVO.NOTICE_FILE}</FILEDOWN>
                    </td>
                  </tr>
                  <tr>
                    <th>작성일</th>
                    <td>{noticeVO.NOTICE_REGDATE}</td>
                    <th>조회수</th>
                    <td colSpan={2}>{noticeVO.NOTICE_HIT}</td>
                  </tr>
                  <tr>
                    <td colSpan={5} id="td-content">
                      {noticeVO.NOTICE_CONTENT}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="d-flex justify-content-end">
                <BROWN_BTN onClick={() => navigate(-1)}>목록</BROWN_BTN>
              </div>
            </div>
          </div>
        </CONTENTS>
      </div>

      <Footer />
    </>
  );
};

export default NoticeDetail;
