import React from "react";
import { useNavigate } from "react-router-dom";
import { CONT_SIDE, LI_SIDE } from "../../../styles/NoticeStyle";
import { P_SIDE, UL_SIDE } from "../../../styles/NoticeStyle";

const SidebarNotice = () => {
  let navigate = useNavigate();

  return (
    <>
      <div className="col-3">
        <CONT_SIDE>
          <P_SIDE>쪽지</P_SIDE>
          <UL_SIDE>
            <LI_SIDE
              onClick={() => {
                navigate("/memo/receiveMemoList");
              }}
            >
              받은쪽지함
            </LI_SIDE>

            <LI_SIDE
              onClick={() => {
                navigate("/memo/sendMemoList");
              }}
            >
              보낸쪽지함
            </LI_SIDE>
          </UL_SIDE>
        </CONT_SIDE>
      </div>
    </>
  );
};

export default SidebarNotice;
