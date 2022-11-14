import React, { useEffect, useState } from "react";
import PointRow from "./PointRow";
import PointTotal from "./PointTotal";
import Header from "./../Common/Header";
import Footer from "./../Common/Footer";
import SidebarMypage from "./../Common/SidebarMypage";
import Pagination from "./../Common/Pagination";
import NavbarMypage from "./../Common/NavbarMypage";
import { CONTENTS } from "../../../styles/NoticeStyle";
import { POINT_P, POINT_LI } from "../../../styles/MypageStyle";
import { pointlist } from "../../../service/dbLogic";

const Point = ({ myPoint, no, isLogin, logout, mySubs }) => {
  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  /* ************************************************** */

  //포인트 리스트 가져오기 */

  const [pointList, setPointList] = useState([]);

  useEffect(() => {
    const pointList = async () => {
      await pointlist({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          //console.log(res);
          console.log(res.data);
          setPointList(res.data);
        }
      });
    };
    pointList();
  }, [no]);
  /* **************************************************** */

  return (
    <>
      <Header isLogin={isLogin} logout={logout} />
      <div className="container">
        <CONTENTS className="row">
          <SidebarMypage />
          <div className="col-9">
            <div className="list-wrapper">
              <NavbarMypage myPoint={myPoint} mySubs={mySubs} />

              <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>
                적립금 현황
              </p>
              <table style={{ width: "1020px", marginBottom: "90px" }}>
                <colgroup>
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "50%" }} />
                </colgroup>

                <thead>
                  <tr>
                    <th>사용 가능한 적립금</th>
                    <th>소멸된 적립금</th>
                  </tr>
                </thead>

                <tbody>
                  <PointTotal myPoint={myPoint} />
                </tbody>
              </table>

              <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>
                적립 및 사용내역
              </p>
              <table style={{ width: "1020px" }}>
                <colgroup>
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "30%" }} />
                </colgroup>

                <thead>
                  <tr>
                    <th>적용일자</th>
                    <th>적용내용</th>
                    <th>적립/사용 금액</th>
                  </tr>
                </thead>

                <tbody>
                  {pointList.length > 0 ? (
                    pointList
                      .slice(offset, offset + limit)
                      .map((point, i) => <PointRow key={i} point={point} />)
                  ) : (
                    <tr>
                      <td>내역이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <Pagination
                total={pointList.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />

              <POINT_P>적립금 사용기준 및 사용기한</POINT_P>
              <ul style={{ marginTop: "10px", marginBottom: "100px" }}>
                <POINT_LI>
                  적립금은 구매금액 제한 없이 현금처럼 사용하실 수 있습니다.
                </POINT_LI>
                <POINT_LI>
                  적립금은 부여된 해로부터 5년 이내에 사용하셔야 합니다.
                </POINT_LI>
                <POINT_LI>
                  특정 이벤트 당첨 적립금은 이벤트 기한내에서만 사용이 가능하고
                  미사용 적립금은 소멸됩니다.
                </POINT_LI>
                <POINT_LI>
                  적립금은 부여 된 순서로 사용 되며 해당 기간 내에 사용하지
                  않으실 경우, 잔여 적립금은 1년 단위로 매해 12월 31일 자동 소멸
                  됩니다.
                </POINT_LI>
                <POINT_LI>
                  주문적립 적립금은 배송완료일 기준 7일 시점으로 적립 됩니다.
                </POINT_LI>
              </ul>
            </div>{" "}
            {/* end of list-wrapper */}
          </div>{" "}
          {/* end of col */}
        </CONTENTS>
      </div>{" "}
      {/* end of container */}
      <Footer isLogin={isLogin} logout={logout} />
    </>
  );
};

export default Point;
