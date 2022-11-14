import React, { useEffect, useState } from 'react';
import { MYUL, MYLI1, MYLI2, MYSPAN, MYP } from './../../../styles/MypageStyle';

const NavbarMypage = ({myPoint, mySubs}) => {

  const userLevel = sessionStorage.getItem("user_level");

  return (
    <>
      <MYUL>
        <MYLI1>
          <MYSPAN>
            정기구독 
            <i className="fa-solid fa-angle-right"></i>
          </MYSPAN>
          <MYP>
            {
              mySubs.MD_NAME !== undefined ? mySubs.MD_NAME : "구독내역 없음"
            }
          </MYP>
        </MYLI1>

        <MYLI2>
          <MYSPAN>
            회원등급 
            <i className="fa-solid fa-angle-right"></i>
          </MYSPAN>
          <MYP>
            {
              userLevel === "0" ? "초승달"
                : userLevel === "1" ? "반달" : "보름달"
            }
          </MYP>
        </MYLI2>

        <MYLI2>
          <MYSPAN>
            적립금 
            <i className="fa-solid fa-angle-right"></i>
          </MYSPAN>
          <MYP>
            {
              myPoint.POINT_SUM > 0 ? parseInt(myPoint.POINT_SUM).toLocaleString() : 0
            }
            &nbsp;P
          </MYP>
        </MYLI2>
      </MYUL>
    </>
  );
};

export default NavbarMypage;