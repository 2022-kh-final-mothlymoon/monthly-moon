import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jsonStoreList } from "../../../service/dbLogic";
import { BROWN_BTN, CONTENTS } from "../../../styles/NoticeStyle";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Pagination from "./../../member/Common/Pagination";
import StoreRow from "./StoreRow";
import { CONTENTS2, CONTENTS3 } from "../../member/orderdetail/TOrderD";

/*
 * /admin/store
 * 거래처 전체목록 페이지입니다.
 * 가능한 기능 C(모달), R, 페이징, 검색
 */

const Store = ({ isLogin, isAdmin, adminId }) => {
  //페이지네이션
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  //모달관련
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [storeList, setStoreList] = useState([]);

  // html 렌더링 된 후 호출됨 -> storeList 불러오기용(다 건)
  useEffect(() => {
    console.log("useEffect 호출");
    const oracleDB = async () => {
      console.log("oracleDB 호출");
      const result = await jsonStoreList();
      console.log(result);
      console.log(result.data[0]);
      setStoreList(result.data);
    };
    oracleDB();
  }, []);

  // 모달 통한 거래처 등록
  const storeInsert = () => {
    document.querySelector("#f_store").action =
      "http://localhost:9005/admin/store/storeInsert";
    document.querySelector("#f_store").submit();
  };

  // 검색
  const StoreSearch = () => {
    const gubun = document.querySelector("#gubun").value;
    const word = document.querySelector("#word").value;
    console.log(gubun + "," + word);
    const asyncDB = async () => {
      const res = await jsonStoreList({ gubun: gubun, word: word });
      if (res.data) {
        console.log(res.data);
        setStoreList(res.data);
      }
    };
    asyncDB();
  };

  // 전체조회
  const allList = () => {
    window.location.reload();
  };

  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <br />
      {/* ####################[[조건 검색]]############################## */}
      <div className="container">
        <CONTENTS3>
          <h4>
            <strong>거래처 관리</strong>
          </h4>
          <br />
          <div
            className="d-flex mx-auto"
            style={{ width: "100%", height: "45px" }}
          >
            <div className="col-2">
              <select id="gubun" className="form-select" aria-label="분류선택">
                <option defaultValue>분류선택</option>
                <option value="STORE_YN">거래여부</option>
                <option value="FIELD">거래처이름</option>
                <option value="STORE_MANAGER">매니저</option>
              </select>
            </div>
            <div className="col-2">
              <input
                type="text"
                id="word"
                className="form-control"
                placeholder="검색어를 입력하세요"
              />
            </div>
            <div className="col-1">
              <Button
                id="btn_search"
                variant="outline-secondary"
                onClick={StoreSearch}
              >
                검색
              </Button>
            </div>
          </div>
        </CONTENTS3>
      </div>
      {/* ###################[[조건검색 끝]]####################### */}
      <div className="container">
        {/******************StoreList*******************/}
        <CONTENTS2>
          <table>
            <colgroup>
              <col style={{ width: "10%", textAlign: "center" }} />
              <col style={{ width: "10%", textAlign: "center" }} />
              <col style={{ width: "30%", textAlign: "center" }} />
              <col style={{ width: "20%", textAlign: "center" }} />
              <col style={{ width: "30%", textAlign: "center" }} />
            </colgroup>

            <thead>
              <tr>
                <th style={{ width: "10%", textAlign: "center" }}>번호</th>
                <th style={{ width: "10%", textAlign: "center" }}>거래 여부</th>
                <th style={{ width: "30%", textAlign: "center" }}>
                  거래처 이름
                </th>
                <th style={{ width: "20%", textAlign: "center" }}>담당자</th>
                <th style={{ width: "30%", textAlign: "center" }}>전화번호</th>
              </tr>
            </thead>

            <tbody>
              {storeList.slice(offset, offset + limit).map((store, i) => (
                <StoreRow key={i} store={store} />
              ))}
            </tbody>
          </table>
          <br />
          <Pagination
            total={storeList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              variant="outline-secondary"
              id="btn_search"
              onClick={allList}
            >
              전체조회
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="outline-secondary"
              id="btn_search"
              onClick={handleShow}
            >
              거래처등록
            </Button>
          </div>
        </CONTENTS2>
      </div>
      {/* end of container */}

      <br />
      <br />
      {/* ***************** StoreList 끝************************** */}

      {/* ============================== [[ 스토어 등록 모달 시작 ]] ============================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>거래처 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_store" method="get">
            {/* 스토어 입력 폼 */}
            <Form.Group className="mb-3" controlId="formBasicDeptno">
              <Form.Label>거래처 이름</Form.Label>
              <Form.Control type="text" name="FIELD" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDname">
              <Form.Label>담당자</Form.Label>
              <Form.Control type="text" name="STORE_MANAGER" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>전화번호</Form.Label>
              <Form.Control type="text" name="STORE_CONTACT" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>메모</Form.Label>
              <Form.Control type="text" name="STORE_MEMO" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <BROWN_BTN onClick={storeInsert}>저장</BROWN_BTN>
        </Modal.Footer>
      </Modal>
      {/* ============================== [[ 스토어 등록 모달 종료 ]] ============================== */}

      <Footer />
    </>
  );
};

export default Store;
