import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AmdRow = (props) => {
  let navigate = useNavigate();

  return (
    <>
      <tr>
        <td style={{ textAlign: "center" }}>{props.amd.MD_NO}</td>
        <td style={{ textAlign: "center" }}>[{props.amd.MD_BRAND}] </td>
        <td
          style={{ textAlign: "center" }}
          onClick={() => {
            navigate("/admin/md/detail/" + props.amd.MD_NO);
          }}
          id="td-title"
        >
          {props.amd.MD_NAME}
        </td>
        <td style={{ textAlign: "center" }}>{props.amd.STORE_NO}</td>
        <td style={{ textAlign: "center" }}>{props.amd.ST_AMOUNT}</td>
      </tr>
    </>
  );
};

export default AmdRow;
