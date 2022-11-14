import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const FaqRowAdmin = (props) => {
  let navigate = useNavigate();

  let result = props.faq;

  const faqDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "삭제 후에는 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        /* ********알림창에서 삭제 클릭 시 axios 실행********** */
        axios
          .get(
            process.env.REACT_APP_SPRING_IP +
              "faq/faqdelete?faq_no=" +
              props.faq.FAQ_NO
          )
          .then((response) => {
            console.log(response);
            console.log(response.data);
            window.location.reload();

            Swal.fire("삭제되었습니다!", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <tr>
        <td>{result.FAQ_NO}</td>
        <td>{result.FAQ_CATEGORY}</td>
        <td>{result.FAQ_TITLE}</td>
        <td>{result.ADMIN_ID}</td>
        <td>{result.FAQ_WRITE_DATE}</td>
        <td>{result.FAQ_VIEW_COUNT}</td>
        <td>
          <div className="d-flex" style={{ margin: "auto" }}>
            <Button
              onClick={() => {
                navigate("/admin/faq/update/" + result.FAQ_NO);
              }}
              variant="outline-secondary"
              id="btn_search"
              style={{ width: "100px" }}
            >
              <i className="fa-regular fa-file-lines"></i>
              &nbsp;수정
            </Button>
            {/* ************************[[ 삭제 버튼 클릭 시 해당 Row삭제**************************** */}
            <Button
              variant="outline-secondary"
              id="btn_search"
              style={{ marginLeft: "20px", width: "100px" }}
              onClick={faqDelete}
            >
              {" "}
              <i className="fa-regular fa-trash-can"></i>
              &nbsp;삭제
            </Button>
            {/* *********************************************************************************** */}
          </div>
        </td>
      </tr>
    </>
  );
};

export default FaqRowAdmin;
