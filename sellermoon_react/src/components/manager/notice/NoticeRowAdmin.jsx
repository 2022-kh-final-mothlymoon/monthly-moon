import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"
import Swal from 'sweetalert2'

const NoticeRowAdmin = (props) => {

  let navigate = useNavigate();

  const noticeDelete = (e) => {
    e.preventDefault()
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) { /* ********알림창에서 삭제 클릭 시 axios 실행********** */
        axios.get(process.env.REACT_APP_SPRING_IP +"notice/noticedelete?notice_no="+props.notice.NOTICE_NO)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          window.location.reload();
          
          Swal.fire(
            '삭제되었습니다!',
          )

        })
        .catch((error) => {
          console.log(error);
        })
      }
    })
  }

  return (
    <>
      <tr>
        <td>{props.notice.NOTICE_NO}</td>
        <td>{props.notice.NOTICE_CATEGORY}</td>
        <td>{props.notice.NOTICE_TITLE}</td>
        <td>{props.notice.ADMIN_ID}</td>
        <td>{props.notice.NOTICE_REGDATE}</td>
        <td>{props.notice.NOTICE_HIT}</td>
        <td>
          <div className="d-flex" style={{margin: "auto"}}>
            <Button onClick={()=>{ navigate('/admin/notice/update/'+props.notice.NOTICE_NO)}}
                    variant="outline-secondary" id="btn_search" style={{ width:"100px"}}>
              <i className="fa-regular fa-file-lines"></i>
                &nbsp;수정
            </Button>
            {/* ************************[[ 삭제 버튼 클릭 시 해당 Row삭제**************************** */}
            <Button variant="outline-secondary" id="btn_search" style={{ marginLeft: "20px", width:"100px"}}
                    onClick={noticeDelete}> <i className="fa-regular fa-trash-can"></i>
                &nbsp;삭제
            </Button>
            {/* *********************************************************************************** */}
          </div>
        </td>
      </tr>
    </>
  );
};

export default NoticeRowAdmin;