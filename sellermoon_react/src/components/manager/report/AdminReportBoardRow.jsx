import React from 'react';
import { Link } from 'react-router-dom';

const AdminReportBoardRow = (props) => {
  return (
    <>
      <tr id="list">
        <td>{ props.report.REPORT_NO }</td>
        <td>{ props.report.REPORT_SORT }</td>
        <td>{ props.report.REPORT_REASON }</td>
        <td>
          <Link 
            to={ "/admin/board/boardDetail/" + props.report.BOARD_NO }
          >
            { props.report.BOARD_NO }
          </Link>
        </td>
        <td>{ props.report.MEMBER_NAME }</td>
        <td>{ props.report.REPORT_DATE }</td>
      </tr>
    </>
  );
}

export default AdminReportBoardRow;