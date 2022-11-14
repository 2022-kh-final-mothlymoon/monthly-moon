import React from 'react';
import { Link } from 'react-router-dom';

const AdminReportReplyRow = (props) => {
  console.log("AdminReportReplyRow 호출 성공");

  return (
    <>
      <tr id="list">
        <td>{ props.report.REPORT_NO }</td>
        <td>
          <Link 
            to={ "/admin/board/boardDetail/" + props.report.BOARD_NO }
          >
            { props.report.REPLY_NO }
          </Link>
        </td>
        <td>{ props.report.REPLY_CONTENT }</td>
        <td>{ props.report.MEMBER_NAME }</td>
        <td>{ props.report.REPORT_DATE }</td>
    </tr>
    </>
  );
}

export default AdminReportReplyRow;