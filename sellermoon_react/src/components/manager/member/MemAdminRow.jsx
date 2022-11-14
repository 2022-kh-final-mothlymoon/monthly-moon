import React from "react";
import { useNavigate } from "react-router-dom";
import { memberList } from "../../../service/dbLogic";
import styled from "styled-components";

const MTR = styled.tr`
  &:hover {
    background-color: #ead3b1;
  }
`;

const MemAdminRow = ({ isLogin, isAdmin, member }) => {
  let navigate = useNavigate();
  const memberDetail = () => {
    memberList({ member_no: member.MEMBER_NO }).then((res) => {
      console.log(res.data);
      navigate("/admin/member/" + member.MEMBER_NO);
    });
  };
  return (
    <>
      <MTR id="list" onClick={memberDetail}>
        <td>{member.MEMBER_NO}</td>
        <td>{member.MEMBER_NAME}</td>
        <td>{member.MEMBER_EMAIL}</td>
        <td>{member.MEMBER_DATE}</td>
        <td>{member.MEMBER_LEVEL}</td>
        <td>{member.SUB}</td>
      </MTR>
    </>
  );
};

export default MemAdminRow;
