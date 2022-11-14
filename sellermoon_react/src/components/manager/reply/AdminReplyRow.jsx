import React from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BEIGE_BTN, RED_BTN2, RED_BTN3 } from "../../../styles/NoticeStyle";
import { OTD1 } from "../../../styles/SubStyle";

/*
  <<<<< 관리자 댓글 Row >>>>>
*/
const AdminReplyRow = (props) => {
  console.log("adminReplyRow 호출 성공");

  const navigate = useNavigate();

   // [U] 블라인드 저장 버튼
  const blindSubmitBtn = async() => {
    if(window.confirm("블라인드 상태를 변경하시겠습니까?")) {
      document.querySelector("#reply_no").value = props.reply.REPLY_NO;
      document.querySelector("#f_rBlind").action = "http://localhost:9005/admin/board/replyUpdate";
      document.querySelector("#f_rBlind").submit();
      alert("블라인드 상태가 변경되었습니다.");
      // 이 후 해당 글 번호로 안가요..
    } else {
      alert("취소되었습니다.");
    }
  };

  // [D] 댓글 삭제 버튼
  const replyDelBtn = async() => {
    console.log("관리자 댓글 삭제 버튼 클릭");
    if(window.confirm("삭제하시겠습니까?")) {
      window.location.href 
      = "http://localhost:9005/admin/board/replyDelete?reply_no=" + props.reply.REPLY_NO;
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  }

  // ******************** RENDER ********************
  return (
    <>
      <colgroup>
        <col style={{ width: "61%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "15%" }} />
      </colgroup>

      <thead>
        <tr>
          <th colSpan={3} style={{padding:"20px"}}>
            <span style={{fontSize:"18px", margin:"20px"}}>
              <i className="fa-solid fa-user-pen"></i>
              &nbsp; &nbsp; { props.reply.MEMBER_NAME }
            </span>
          </th>
          <th colSpan={2}>{ props.reply.REPLY_DATE }</th>
        </tr>
      </thead>

      <tbody style={{borderBottom:"2px solid #b29d82"}}>
        <tr>
          <OTD1 colSpan={5}>
            { props.reply.REPLY_CONTENT }
          </OTD1>
        </tr>
        <tr>
          <td style={{display: "flex"}}>
            <Form id="f_rBlind" method="get">
              <div className="form-group">
                <input type="hidden" name="reply_no" id="reply_no" />
                <Form.Select 
                  id="reply_blind" 
                  name="reply_blind" 
                  size="sm"
                  style={{ width: "200px" }}
                >
                  <option value="">블라인드 상태 : { props.reply.REPLY_BLIND }</option>
                  <option value="Y">Y</option>
                  <option value="N">N</option>
                </Form.Select>
              </div>
            </Form>
            <BEIGE_BTN type="submit" onClick={blindSubmitBtn}>
              변경
            </BEIGE_BTN>
            <RED_BTN3  onClick={replyDelBtn}>
              삭제
            </RED_BTN3>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default AdminReplyRow;