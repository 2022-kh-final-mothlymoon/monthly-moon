import React from "react";
import { useNavigate } from "react-router-dom";
import { CONT_SIDE, LI_SIDE } from "../../../styles/NoticeStyle";
import { P_SIDE, UL_SIDE } from "./../../../styles/NoticeStyle";

const SidebarNotice = () => {
  let navigate = useNavigate();

  return (
    <>
      <div className="col-3">
        <CONT_SIDE>
          <P_SIDE>MOON STORY</P_SIDE>
          <UL_SIDE>
            <LI_SIDE
              onClick={() => {
                navigate("/board/boardList");
              }}
            >
              전체보기
            </LI_SIDE>

            <LI_SIDE onClick={() => {}}>자유게시판</LI_SIDE>

            <LI_SIDE onClick={() => {}}>Q&A</LI_SIDE>
          </UL_SIDE>
        </CONT_SIDE>
      </div>
    </>
  );
};

export default SidebarNotice;
