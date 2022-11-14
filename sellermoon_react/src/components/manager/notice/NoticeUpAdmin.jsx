import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios"
import Swal from 'sweetalert2'
import { noticelist } from './../../../service/dbLogic';
import { FILEDOWN, BROWN_BTN } from './../../../styles/NoticeStyle';

const NoticeUpAdmin = () => {

  let navigate = useNavigate();

  const {notice_no} = useParams();

  const fileDown = () => {
    window.location.href = process.env.REACT_APP_SPRING_IP+"board/downLoad.jsp?notice_file="+noticeVO.NOTICE_FILE
  }

  const [ noticeVO, setNoticeVO ] = useState({
    notice_no: 0,
    notice_title: "", 
    notice_content: "", 
    notice_hit: 0,
    notice_category: "", 
    notice_regdate: "",
    filename: "", 
    fileurl: "",
		notice_writer: "",
  })

  useEffect(() => {
    // 오라클 경유
    const asyncDB = async() => {
      const res = await noticelist({notice_no:notice_no})
      //console.log(res);
      console.log(res.data);
      console.log(res.data[0]);
      setNoticeVO(res.data[0])/////////////////////////// 데이터 초기화
    }
    asyncDB();
  }, [notice_no]) 



/* *************************************************  */
  // onchange 이벤트로 input 값 가져오기
  const onChange = (e) => {
    if(e.currentTarget == null) return;
    // console.log("폼 내용 변경 발생 name : "+e.target.name);
    // console.log("폼 내용 변경 발생 value : "+e.target.value);
    e.preventDefault();
    /* notice 배열 복제하고 n_no속성만 n_no로 덮어쓰기 */
    setNoticeVO({
      ...noticeVO,
      notice_no: notice_no,
      [e.target.name]: e.target.value,
    })
  }

  /* ************************************************** */
  ////////////// 글수정 //////////////////
  const noticeUpdate = (e) => {
    console.log(e.target.notice_no.value);
    e.preventDefault()
    let list = {
        // json 형태로 spring에 값을 넘김
        notice_no: e.target.notice_no.value,
        notice_title: e.target.notice_title.value,
        notice_category: e.target.notice_category.value,
        notice_content: e.target.notice_content.value,
    }
    console.log("noticeUpdate => "+ JSON.stringify(list));

    axios
    .post(process.env.REACT_APP_SPRING_IP +"notice/noticeupdate", list)
    .then((response) => {
      console.log(response);
      console.log(response.data);
      window.location.replace("/admin/notice")
      alert("수정되었습니다!")
    })
    .catch((error) => {
        console.log(error);
    })
  }
  /* ************************************************** */

  const backtoPage = () => {
    navigate(-1)
  }


  return (
    <>
      
      <div className="container">
        <h4>공지사항 수정</h4>
        
      {/* ##########################[[Form 전송 update]]########################### */}
      {/* encType="multipart/form-data" */}
        <form id="f_board" onSubmit={noticeUpdate} >
            <input  id="notice_no" name="notice_no" type="hidden" 
                    defaultValue={noticeVO.NOTICE_NO} onChange={onChange} />
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
                    <input  id="notice_title" name="notice_title" 
                            type="text" style={{ width: "500px" }}
                            defaultValue={noticeVO.NOTICE_TITLE} onChange={onChange} />
                    </td>
                </tr>
                <tr>
                  <th>작성자</th>
                  <td colSpan={4}>{noticeVO.ADMIN_ID}</td>
                </tr>
                <tr>
                  <th>카테고리</th>
                  <td>
                    <input  id="notice_category" name="notice_category"
                            type="text" onChange={onChange}
                            defaultValue={noticeVO.NOTICE_CATEGORY} /> 
                  </td>
                  <th>첨부파일</th>
                  <td>
                    <FILEDOWN onClick={fileDown}>
                      {noticeVO.NOTICE_FILE}
                    </FILEDOWN>
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
                    <textarea id="notice_content" name="notice_content"
                              cols="175" rows="15" onChange={onChange}
                              defaultValue={noticeVO.NOTICE_CONTENT} /> 
                  </td>
                </tr>
                
              </tbody>
            </table>

            <div className="d-flex justify-content-end" style={{ marginBottom:"20px" }}>
              <BROWN_BTN type="submit">
                저장
              </BROWN_BTN>
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

export default NoticeUpAdmin;