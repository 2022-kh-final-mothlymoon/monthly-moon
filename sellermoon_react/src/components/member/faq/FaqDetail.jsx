import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { faqlist } from "../../../service/dbLogic";
import Header from "./../Common/Header";
import { CONTENTS, BROWN_BTN } from "./../../../styles/NoticeStyle";
import SidebarNotice from "./../notice/SidebarNotice";
import Footer from "./../Common/Footer";

const FaqDetail = ({ isLogin, logout, no }) => {
  let navigate = useNavigate();

  const { faq_no } = useParams();

  const [faqVO, setFaqVO] = useState({
    faq_no: 0,
    faq_category: "",
    faq_title: "",
    faq_content: "",
    faq_write_date: "",
    faq_view_count: 0,
  });

  useEffect(() => {
    // 오라클 경유
    const asyncDB = async () => {
      const res = await faqlist({ faq_no: faq_no }); /* faq_no = useParam */
      //console.log(res);
      //console.log(res.data);
      console.log(res.data[0]);
      setFaqVO(res.data[0]); /////////////////////////// 데이터 초기화
    };
    asyncDB();
  }, [faq_no]);

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
                      [{faqVO.FAQ_CATEGORY}]&nbsp;{faqVO.FAQ_TITLE}
                    </td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td colSpan={4}>{faqVO.ADMIN_ID}</td>
                  </tr>
                  <tr>
                    <th>작성일</th>
                    <td>{faqVO.FAQ_WRITE_DATE}</td>
                    <th>조회수</th>
                    <td colSpan={2}>{faqVO.FAQ_VIEW_COUNT}</td>
                  </tr>
                  <tr>
                    <td colSpan={5} id="td-content">
                      {faqVO.FAQ_CONTENT}
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

export default FaqDetail;
