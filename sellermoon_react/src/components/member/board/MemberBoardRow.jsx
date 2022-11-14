import React from "react";
import { Link } from "react-router-dom";

/* 
  <<<<< 회원 게시판 Row >>>>>
*/
const BoardRow = (props) => {
  // 블라인드 게시글일 경우 블라인드 알림 버튼
  const blindYN = (event) => {
    if (props.board.BOARD_BLIND === "Y") {
      console.log("해당 게시글은 관리자에 의해 숨김 처리 되었습니다.");
      alert("해당 게시글은 관리자에 의해 숨김 처리 되었습니다.");
      event.preventDefault();
      // 페이지는 넘어가지 않지만 url에 글번호를 입력하면 넘어가게 된다. --> 권한주기로 수정해야할 듯
    }
  };

  // ******************** RENDER ********************
  return (
    <tr>
      <td>{props.board.BOARD_NO}</td>
      <td>{props.board.BOARD_CATEGORY}</td>
      <td>
        <Link
          to={"/board/boardDetail/" + props.board.BOARD_NO}
          onClick={blindYN}
        >
          {props.board.BOARD_TITLE}
        </Link>
      </td>
      <td>{props.board.MEMBER_NAME}</td>
      <td>{props.board.BOARD_WRITTEN_DATE}</td>
      <td>{props.board.BOARD_HIT}</td>
    </tr>
  );
};

export default BoardRow;
