import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { faqlist } from "../../../service/dbLogic";
import Header from "./../Common/Header";
import { CONTENTS } from "./../../../styles/NoticeStyle";
import SidebarNotice from "./../notice/SidebarNotice";
import { TABTITLE } from "./../../../styles/MainStyle";
import FaqRow from "./FaqRow";
import Pagination from "./../Common/Pagination";
import Footer from "./../Common/Footer";

const Faq = ({ isLogin, logout, no }) => {
  const [faqList, setFaqList] = useState([]);

  let [tab, setTab] = useState(0); // 0이면 0번째 내용 보이게, 1이면 1번째 내용 ...

  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  /* **************************************************** */
  /* noticelist 데이터 가져오기 */
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

  /* ************************************************** */

  return (
    <>
      <Header isLogin={isLogin} logout={logout} no={no} />
      <br />
      <div className="container">
        <CONTENTS className="row">
          <SidebarNotice />
          <div className="col-9">
            <div className="list-wrapper">
              <p
                style={{
                  marginBottom: "2rem",
                  fontSize: "1.4rem",
                  fontWeight: "600",
                }}
              >
                자주묻는질문(FAQ)
              </p>

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

              <table style={{ width: "1020px" }}>
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "47%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "18%" }} />
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

                {
                  [
                    <tbody>
                      {/* 전체보기 */}
                      {faqList.slice(offset, offset + limit).map((faq, i) => (
                        <FaqRow key={i} faq={faq} />
                      ))}
                    </tbody>,

                    <tbody>
                      {
                        // faqList.slice(offset, offset + limit).map((faq, i) => {
                        //   console.log(faqList[i].FAQ_CATEGORY);
                        //   if(faqList[i].FAQ_CATEGORY === "정기구독")
                        //   return <FaqTableRow key={i} faq={faqList[i]}  />
                        faqList.slice(offset, offset + limit).map((faq, i) => {
                          //console.log(faqList[i].FAQ_CATEGORY);
                          if (faqList[i].FAQ_CATEGORY === "정기구독")
                            return <FaqRow key={i} faq={faq} />;

                          // faqList.slice(offset, offset + limit).map((faq, i) => (
                          //   <FaqTableRow key={i} faq={faq}  />
                        })
                      }
                    </tbody>,

                    <tbody>
                      {faqList.slice(offset, offset + limit).map((faq, i) => {
                        if (faqList[i].FAQ_CATEGORY === "주문/배송")
                          return <FaqRow key={i} faq={faq} />;
                      })}
                    </tbody>,

                    <tbody>
                      {faqList.slice(offset, offset + limit).map((faq, i) => {
                        if (faqList[i].FAQ_CATEGORY === "회원혜택")
                          return <FaqRow key={i} faq={faq} />;
                      })}
                    </tbody>,

                    <tbody>
                      {faqList.slice(offset, offset + limit).map((faq, i) => {
                        if (faqList[i].FAQ_CATEGORY === "상품관련")
                          return <FaqRow key={i} faq={faq} />;
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
            </div>{" "}
            {/* end of list wrapper */}
          </div>{" "}
          {/* end of col */}
        </CONTENTS>
      </div>{" "}
      {/* end of container */}
      <Footer />
    </>
  );
};

export default Faq;
