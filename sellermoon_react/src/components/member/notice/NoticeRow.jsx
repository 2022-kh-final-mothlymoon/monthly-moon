import React from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const NoticeRow = (props) => {

  let navigate = useNavigate();

  let result = props.notice;

  /* 상세보기 + 조회수 증가 */
  const noticeDetail = (e) => {
    e.preventDefault()
    axios.get(process.env.REACT_APP_SPRING_IP +"notice/noticedetail?notice_no="+result.NOTICE_NO)
    .then((response) => {
      console.log(response.data);
      navigate('/notice/detail/'+result.NOTICE_NO)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <tr>
        <td>{result.NOTICE_NO}</td>
          <td id="list-title" onClick={noticeDetail}>
            [{result.NOTICE_CATEGORY}] &nbsp;
            {result.NOTICE_TITLE}
          </td>
        <td>{result.ADMIN_ID}</td>
        <td>{result.NOTICE_REGDATE}</td>
        <td>{result.NOTICE_HIT}</td>
      </tr>
    </>
  );
};

export default NoticeRow;