import React from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PointTotal = (props) => {

  let result = props.myPoint;

  return (
    <>
      <tr style={{ height:"80px" }}>
        <td style={{ fontSize:"1.7rem", fontWeight:"600"}}>
          {
            result.POINT_SUM > 0 ? result.POINT_SUM : 0
          }
          &nbsp;Point
        </td>
        <td style={{ fontSize:"1.7rem", fontWeight:"600"}}>0 Point</td>
      </tr>
    </>
  );
};

export default PointTotal;