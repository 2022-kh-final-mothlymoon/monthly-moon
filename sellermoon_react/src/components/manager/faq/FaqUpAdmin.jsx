import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BROWN_BTN } from "../../../styles/NoticeStyle";
import { faqlist } from "../../../service/dbLogic";
import Header from "../Common/Header";

const FaqUpAdmin = ({ isLogin, isAdmin, adminId }) => {
  let navigate = useNavigate();

  const { faq_no } = useParams();

  const [faqVO, setFaqVO] = useState({
    faq_no: 0,
    admin_id: "",
    faq_category: "",
    faq_title: "",
    faq_content: "",
    faq_write_date: "",
    faq_view_count: 0,
  });

  useEffect(() => {
    // 오라클 경유
    const asyncDB = async () => {
      const res = await faqlist({ faq_no: faq_no });
      //console.log(res);
      console.log(res.data);
      console.log(res.data[0]);
      setFaqVO(res.data[0]); /////////////////////////// 데이터 초기화
    };
    asyncDB();
  }, [faq_no]);

  /* *************************************************  */
  // onchange 이벤트로 input 값 가져오기
  const onChange = (e) => {
    if (e.currentTarget == null) return;
    // console.log("폼 내용 변경 발생 name : "+e.target.name);
    // console.log("폼 내용 변경 발생 value : "+e.target.value);
    e.preventDefault();
    /* faq배열 복제하고 n_no속성만 n_no로 덮어쓰기 */
    setFaqVO({
      ...faqVO,
      faq_no: faq_no,
      [e.target.name]: e.target.value,
    });
  };

  /* ************************************************** */
  ////////////// 글수정 //////////////////
  const faqUpdate = (e) => {
    console.log(e.target.faq_no.value);
    e.preventDefault();
    let list = {
      // json 형태로 spring에 값을 넘김
      faq_no: e.target.faq_no.value,
      faq_title: e.target.faq_title.value,
      faq_category: e.target.faq_category.value,
      faq_content: e.target.faq_content.value,
    };
    console.log("faqUpdate => " + JSON.stringify(list));

    axios
      .post(process.env.REACT_APP_SPRING_IP + "faq/faqupdate", list)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        window.location.replace("/admin/faq");
        alert("수정되었습니다!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /* ************************************************** */

  const backtoPage = () => {
    navigate(-1);
  };

  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <div className="container">
        <h4>FAQ 수정</h4>

        {/* ##########################[[Form 전송 update]]########################### */}
        {/* encType="multipart/form-data" */}
        <form id="f_board" onSubmit={faqUpdate}>
          <input
            id="faq_no"
            name="faq_no"
            type="hidden"
            defaultValue={faqVO.FAQ_NO}
            onChange={onChange}
          />
          <table>
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "30%" }} />
            </colgroup>

            <tbody>
              <tr>
                <th>제목</th>
                <td colSpan={4} id="td-title">
                  <input
                    id="faq_title"
                    name="faq_title"
                    type="text"
                    style={{ width: "500px" }}
                    defaultValue={faqVO.FAQ_TITLE}
                    onChange={onChange}
                  />
                </td>
              </tr>
              <tr>
                <th>작성자</th>
                <td colSpan={4}>{faqVO.ADMIN_ID}</td>
              </tr>
              <tr>
                <th>카테고리</th>
                <td colSpan={4}>
                  <input
                    id="faq_category"
                    name="faq_category"
                    type="text"
                    onChange={onChange}
                    defaultValue={faqVO.FAQ_CATEGORY}
                  />
                </td>
              </tr>
              <tr>
                <th>작성일</th>
                <td>{faqVO.FAQ_WRITE_DATE}</td>
                <th>조회수</th>
                <td colSpan={2}>{faqVO.FAQ_VIEW_COUNT}</td>
              </tr>
              <tr>
                <td colSpan={5} id="td-content">
                  <textarea
                    id="faq_content"
                    name="faq_content"
                    cols="175"
                    rows="15"
                    onChange={onChange}
                    defaultValue={faqVO.FAQ_CONTENT}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div
            className="d-flex justify-content-end"
            style={{ marginBottom: "20px" }}
          >
            <BROWN_BTN type="submit">저장</BROWN_BTN>
            <BROWN_BTN type="button" onClick={backtoPage}>
              전체목록
            </BROWN_BTN>
          </div>
        </form>
        {/* ##########################[[Form 전송 update]]########################### */}
      </div>
    </>
  );
};

export default FaqUpAdmin;
