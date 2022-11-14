import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { jsonReplyList } from "../../../service/dbLogic";
import MemberReplyForm from "./MemberReplyForm";
import MemberReplyRow from "./MemberReplyRow";

/*
  <<<<<  회원 글 번호 댓글 전체 조회 >>>>>
*/
const MemberReplyList = ({ no }) => {
  console.log("MemberReplyList 호출 성공");

  const { board_no } = useParams();

  // [ R ] 데이터 가져오기
  const [replyList, setReplyList] = useState([]);
  useEffect(() => {
    const replyListDB = async () => {
      console.log("[회원] replyListDB 호출 성공");
      const result = await jsonReplyList({ board_no: board_no });
      console.log(result);
      // console.log(result.data);
      // console.log(result.data[1].MEMBER_NAME);
      console.log(result.data.length); // 댓글 개수
      setReplyList(result.data); // 여러 건을 받아올 때는 배열 사용 X
    };
    replyListDB();
  }, [board_no]);

  // ******************** RENDER ********************
  return (
    <>
      <table style={{ width: "1020px" }}>
        {replyList.map((reply, i) => (
          <MemberReplyRow no={no} key={i} reply={reply} />
        ))}
      </table>
    </>
  );
};

export default MemberReplyList;
