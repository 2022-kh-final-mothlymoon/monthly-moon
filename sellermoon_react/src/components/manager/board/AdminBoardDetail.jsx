import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { jsonBoardList } from '../../../service/dbLogic';
import { BEIGE_BTN, BROWN_BTN, CONTENTS, RED_BTN } from '../../../styles/NoticeStyle';
import Footer from '../Common/Footer';
import Header from '../Common/Header';
import AdminReplyList from '../reply/AdminReplyList';

/* 
  <<<<< 관리자 게시판 상세 조회 >>>>>
    - 수정할 것 : 폼 디자인
*/
const AdminBoardDetail = ({ isLogin, isAdmin, adminId }) => {
  const navigate = useNavigate(); 
  
  const { board_no } = useParams();
  const [ boardVO, setBoardVO] = useState({
    BOARD_NO: 0,
    BOARD_CATEGORY: "",
    BOARD_TITLE: "",
    BOARD_CONTENT: "",
    MEMBER_NAME: "",
    BOARD_WRITTEN_DATE: "",
    BOARD_HIT: 0,
    BOARD_LIKE: 0,
    BOARD_DISLIKE: 0,
    BOARD_BLIND: "",
    BOARD_REPORT_COUNT: 0,
    FILENAME: "",
    FILEURL: "",
  });

  // [R] 데이터 가져오기
  useEffect(() => {
    const boardDetailDB = async() => {
      console.log("[관리자] : boardDetailDB 호출 성공")
      const result = await jsonBoardList({ board_no: board_no });
      // console.log(result);
      // console.log(result.data);
      setBoardVO(result.data[0]);
    };
    boardDetailDB();
  }, [board_no]);
  
  
  // [U] 블라인드 저장 버튼
  const blindSubmitBtn = async(props) => {
    if(window.confirm("블라인드 상태를 변경하시겠습니까?")) {
      document.querySelector("#board_no").value = boardVO.BOARD_NO;
      document.querySelector("#f_blind").action = "http://localhost:9005/admin/board/boardUpdate";
      document.querySelector("#f_blind").submit();
      alert("블라인드 상태가 변경되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };
  
  // [D] 삭제 버튼
  const delBtn = async(props) => {
    console.log("삭제할 글 번호 ===> " + boardVO.BOARD_NO);
    if(window.confirm("삭제하시겠습니까?")) {
      window.location.href 
      = "http://localhost:9005/admin/board/boardDelete?board_no=" + boardVO.BOARD_NO;
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };
  
  // 목록으로 버튼
  const listBtn = () => {
    console.log("목록으로 버튼 클릭")
    navigate("/admin/board/boardList");
  };
  
  // 블라인드 상태 변경 확인하기
  const blindYn = (event) => {
    console.log("변경된 블라인드 상태는? ===> " + event.target.value);
  }
  
  
  // ******************** RENDER ********************
  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
        
        <div className='container'>
          <CONTENTS className="row">
            
          <div className='col-9'>
            <div className='list-wrapper'>

              <h4>게시판 관리 (Moon Story)</h4>
              <hr />

              {/* 버튼 */}
              <div className="d-flex justify-content-end">
                <RED_BTN onClick={delBtn}>
                  삭제
                </RED_BTN>
                <BROWN_BTN onClick={() => navigate(-1)}>
                  목록
                </BROWN_BTN>
              </div>

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
                      [{ boardVO.BOARD_CATEGORY }]&nbsp;{ boardVO.BOARD_TITLE }
                    </td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td colSpan={4}>{ boardVO.MEMBER_NAME }</td>
                  </tr>
                  <tr>
                    <th>작성일</th>
                    <td>{ boardVO.BOARD_WRITTEN_DATE }</td>
                    <th>조회수</th>
                    <td colSpan={2}>{ boardVO.BOARD_HIT }</td>
                  </tr>
                  <tr>
                    <th>블라인드</th>
                    <td style={{display: "flex"}}>
                      <Form id="f_blind" method="get">
                        <div className="form-group">
                          <input type="hidden" name="board_no" id="board_no" />
                          <Form.Select id="board_blind" name="board_blind" onChange={blindYn} size="sm">
                            <option value="">블라인드 상태 : { boardVO.BOARD_BLIND }</option>
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                          </Form.Select>
                        </div>
                      </Form>
                      <BEIGE_BTN type="submit" onClick={blindSubmitBtn}>
                        변경
                      </BEIGE_BTN>
                    </td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} id="td-content">
                      { boardVO.BOARD_CONTENT }
                    </td>
                  </tr>
                </tbody>      
              </table>

            </div>
          </div>
      
          <hr />
          
          {/* 댓글 리스트 */}
          <div className='container'>
            <AdminReplyList />
          </div>

        </CONTENTS>

        </div>

      <br />
      <br />

      <Footer />
    </>
  );
}

export default AdminBoardDetail;