import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CONT_SIDE,
  P_SIDE,
  UL_SIDE,
  LI_SIDE,
  LI_NAME,
} from "./../../../styles/NoticeStyle";

const SidebarMypage = () => {
  let navigate = useNavigate();

  const userName = sessionStorage.getItem("user_name");

  return (
    <>
      <div className="col-3">
        <CONT_SIDE>
          <P_SIDE>
            My Page
          </P_SIDE>

          <UL_SIDE>
            <LI_NAME
              onClick={() => {
                navigate("/");
              }}
            >
              {userName}님의 월간;문
            </LI_NAME>

            <LI_SIDE
              onClick={() => {
                navigate("/mypage/board");
              }}
            >
              MyMoonStory
            </LI_SIDE>

            <LI_SIDE
              onClick={() => {
                navigate("/mypage/subscription");
              }}
            >
              정기구독
            </LI_SIDE>

            <LI_SIDE
              onClick={() => {
                navigate("/mypage/orderlist");
              }}
            >
              주문배송조회
            </LI_SIDE>

            <LI_SIDE
              onClick={() => {
                navigate("/mypage/review");
              }}
            >
              사용후기
            </LI_SIDE>

            <LI_SIDE
              onClick={() => {
                navigate("/mypage/profile");
              }}
            >
              계정설정
            </LI_SIDE>

            <LI_SIDE
              onClick={() => {
                navigate("/mypage/point");
              }}
            >
              적립금
            </LI_SIDE>

            <LI_SIDE
              onClick={() => {
                navigate("/mypage/friends");
              }}
            >
              친구초대
            </LI_SIDE>

            <LI_SIDE
              onClick={() => {
                navigate("/chat/login");
              }}
            >
              1:1 문의
            </LI_SIDE>
          </UL_SIDE>
        </CONT_SIDE>
      </div>
    </>
  );
};

export default SidebarMypage;
