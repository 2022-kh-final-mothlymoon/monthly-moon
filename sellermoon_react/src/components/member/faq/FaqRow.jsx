import React from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const FaqRow = (props) => {

  let navigate = useNavigate();

  let result = props.faq;

  /* 상세보기 + 조회수 증가 */
  const faqDetail = (e) => {
    console.log(result.FAQ_NO);
    e.preventDefault()
    axios.get(process.env.REACT_APP_SPRING_IP +"faq/faqdetail?faq_no="+result.FAQ_NO)
    .then((response) => {
      console.log(response.data);
      navigate('/faq/detail/'+result.FAQ_NO)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <tr>
        <td>{result.FAQ_NO}</td>
          <td id="list-title" onClick={faqDetail}>
            [{result.FAQ_CATEGORY}] &nbsp;
            {result.FAQ_TITLE}
          </td>
        <td>{result.ADMIN_ID}</td>
        <td>{result.FAQ_WRITE_DATE}</td>
        <td>{result.FAQ_VIEW_COUNT}</td>
      </tr>
    </>
  );
};

export default FaqRow;