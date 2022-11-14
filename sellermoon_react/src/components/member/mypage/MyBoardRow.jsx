import React from 'react';
import { OTD1 } from './../../../styles/SubStyle';

const MyBoardRow = ({board, no}) => {

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
              &nbsp; &nbsp;{board.BOARD_TITLE}
            </span>
          </th>
          <th colSpan={2}>{board.BOARD_WRITTEN_DATE}</th>
        </tr>
      </thead>

      <tbody style={{borderBottom:"2px solid #b29d82"}}>
        <tr>
          <OTD1 colSpan={5}>
            글번호 : <strong>{board.BOARD_NO}</strong> &nbsp; &nbsp; &nbsp;  카테고리 : <strong>{board.BOARD_CATEGORY}</strong>
          </OTD1>
        </tr>
        <tr>
          <td style={{lineHeight:"28px", fontSize:"17px"}}>

            <br />
              {board.BOARD_CONTENT}
            <br />
            <br />
          </td>

          <td style={{fontSize:"19px"}}>
              <i className="fa-regular fa-thumbs-up"></i>
              &nbsp;{board.BOARD_LIKE}
          </td>

          <td style={{fontSize:"19px"}}>
              <i className="fa-regular fa-thumbs-down"></i>
              &nbsp;{board.BOARD_DISLIKE}
          </td>

          <td style={{fontSize:"19px"}}>
            <i className="fa-regular fa-eye"></i>
            &nbsp;{board.BOARD_HIT}
          </td>

        </tr>  
      </tbody>
    </>
  );
};

export default MyBoardRow;