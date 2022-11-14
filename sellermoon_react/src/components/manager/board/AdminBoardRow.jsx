import React from 'react';
import { Link } from 'react-router-dom';

/* 
  <<<<< 관리자 게시판 Row (BoardList에 보여질 리스트 한 건) >>>>>
*/
const AdminBoardRow = (props) => {
  console.log("adminBoardRow 호출 성공");
  
  // 클릭 시 블라인드 게시글 알림
  const blindYN = () => {
    if(props.board.BOARD_BLIND === "Y") {
      console.log("해당 게시글은 관리자에 의해 숨김 처리 되었습니다.");
      alert("해당 게시글은 관리자에 의해 숨김 처리 되었습니다.")
    }
  };

  // ******************** RENDER ********************
  return (
    <>
      <tr>
        <td>{ props.board.BOARD_NO }</td>
        <td>{ props.board.BOARD_CATEGORY }</td>
        <td>
          <Link 
            to={ "/admin/board/boardDetail/" + props.board.BOARD_NO }
            onClick={ blindYN }
          >
            { props.board.BOARD_TITLE }
          </Link>
        </td>
        <td>{ props.board.MEMBER_NAME }</td>
        <td>{ props.board.BOARD_WRITTEN_DATE }</td>
        <td>{ props.board.BOARD_HIT }</td>
        <td>{ props.board.BOARD_BLIND }</td>
      </tr>
    </>
  );
}

export default AdminBoardRow;