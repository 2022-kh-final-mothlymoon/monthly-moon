import React from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const PointRow = (props) => {

  let result = props.point;

  return (
    <>
      <tr>
        <td>{result.POINT_DATE}</td>
        <td id="list-title">
          {result.POINT_TYPE}
        </td>
        <td>{result.POINT_USED_SAVED.toLocaleString()}</td>
      </tr>
    </>
  );
};

export default PointRow;