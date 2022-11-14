import React from 'react';
import { useState, useEffect } from 'react';
import { myboard } from './../../../service/dbLogic';
import { CONTENTS } from './../../../styles/NoticeStyle';
import SidebarMypage from './../Common/SidebarMypage';
import NavbarMypage from './../Common/NavbarMypage';
import Header from './../Common/Header';
import Footer from './../Common/Footer';
import Pagination from './../Common/Pagination';
import MyBoardRow from './MyBoardRow';
import { OTD1 } from './../../../styles/SubStyle';

const MyBoard = ({ myPoint, no, isLogin, logout, mySubs }) => {

  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

 /* ************************************************** */

  // 커뮤니티 리스트 가져오기 */

  const [myBoard, setMyBoard] = useState([]);

  useEffect(() => {
    const myBoard = async () => {
      await myboard({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          //console.log(res);
          console.log(res.data);
          setMyBoard(res.data);
        }
      });
    };
    myBoard();
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
            나의 커뮤니티 작성글
          </p>

        <table style={{ width: "1020px" }}>
          {
            myBoard.length > 0 
            ? 
            myBoard.slice(offset, offset + limit).map((board, i) => (
              <MyBoardRow key={i} board={board} no={no} />
            ))
            : 
            <tr style={{textAlign:"center"}}>
              <OTD1 colSpan={3}>
                <br/>
                <br/>
                <h5 style={{fontWeight:"600"}}>아직 작성된 게시물이 없습니다.</h5>
                <br/>
                <br/>
              </OTD1>
            </tr>
          }
      </table>

              <Pagination
                total={myBoard.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />

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

export default MyBoard;