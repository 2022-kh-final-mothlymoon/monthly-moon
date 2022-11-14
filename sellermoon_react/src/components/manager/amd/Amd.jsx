import React, { useEffect, useState } from "react";

import { Button, Form, Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { CONTENTS } from "../../../styles/NoticeStyle";
import AmdRow from "./AmdRow";
import Pagination from "./../../member/Common/Pagination";
import { jsonAmdList, jsonStoreList } from "../../../service/dbLogic";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { CONTENTS2, CONTENTS3 } from "../../member/orderdetail/TOrderD";

const Amd = ({ pictureUpload, isLogin, isAdmin, adminId }) => {
  //페이지네이션
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  //모달관련
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  //데이터관련
  const [amdList, setAmdList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [file1, setFile1] = useState({ MD_IMAGE: null, MD_IMAGE_URL: null });
  const [file2, setFile2] = useState({
    MD_DETAIL_IMAGE: null,
    MD_DETAIL_IMAGE_URL: null,
  });

  // html 렌더링 된 후 호출됨 -> amdList 불러오기용(다건용)
  useEffect(() => {
    console.log("useEffect 호출");
    const oracleDB = async () => {
      console.log("oracleDB 호출");
      //const result = await jsonDeptList({ DEPTNO: 30 }) -> 스프링콘솔에 com.example.demo.dao.DeptDao  : pMap : {DEPTNO=30}
      const result = await jsonAmdList(); // pMap : {}
      console.log(result);
      console.log(result.data[0]);
      setAmdList(result.data);
    };
    oracleDB();
  }, []);

  // store 옵션값 불러오기용
  useEffect(() => {
    console.log("useEffect 호출");
    const storeDB = async () => {
      console.log("storeDB 호출");
      const result = await jsonStoreList(); // pMap : {}
      console.log(result);
      console.log(result.data[0]);
      setStoreList(result.data);
    };
    storeDB();
  }, []);

  const store = [];

  // store 옵션값 push용
  for (let i = 0; i < storeList.length; i++) {
    const element = [];
    element[i] = storeList[i].STORE_NO + storeList[i].FIELD;
    if (element.length > 0) {
      store.push(element);
      console.log(store);
    }
  }

  //이미지 저장용(이미지,상세이미지)
  const imgChange1 = async (event) => {
    console.log("imgChange1 호출");
    console.log(event.target.files[0]);
    const upload1 = await pictureUpload.upload(event.target.files[0]);
    console.log(upload1.url);
    setFile1({
      MD_IMAGE: upload1.public_id + "." + upload1.format,
      MD_IMAGE_URL: upload1.url,
    });
    const uploadIMG1 = document.getElementById("img1"); //input의 이미지 객체 얻어오기
    const holder1 = document.getElementById("uploadImg1"); //이미지를 집어넣을 곳의 부모태그
    const file1 = uploadIMG1.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const img1 = new Image();
      img1.src = event.target.result;
      img1.width = 150;
      holder1.innerHTML = "";
      holder1.appendChild(img1);
    };
    reader.readAsDataURL(file1);
    return false;
  };
  const imgChange2 = async (event) => {
    console.log("imgChange2 호출");
    console.log(event.target.files[0]);
    const upload2 = await pictureUpload.upload(event.target.files[0]);
    console.log(upload2.url);
    setFile2({
      MD_DETAIL_IMAGE: upload2.public_id + "." + upload2.format,
      MD_DETAIL_IMAGE_URL: upload2.url,
    });
    const uploadIMG2 = document.getElementById("img2"); //input의 이미지 객체 얻어오기
    const holder2 = document.getElementById("uploadImg2"); //이미지를 집어넣을 곳의 부모태그
    const file2 = uploadIMG2.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const img2 = new Image();
      img2.src = event.target.result;
      img2.width = 150;
      holder2.innerHTML = "";
      holder2.appendChild(img2);
    };
    reader.readAsDataURL(file2);
    return false;
  };

  //모달 통한 엠디 등록
  const amdInsert = () => {
    document.querySelector("#MD_IMAGE").value = file1.MD_IMAGE;
    document.querySelector("#MD_DETAIL_IMAGE").value = file2.MD_DETAIL_IMAGE;
    document.querySelector("#MD_IMAGE_URL").value = file1.MD_IMAGE_URL;
    document.querySelector("#MD_DETAIL_IMAGE_URL").value =
      file2.MD_DETAIL_IMAGE_URL;
    document.querySelector("#f_amd").action =
      "http://localhost:9005/admin/amd/amdInsert";
    document.querySelector("#f_amd").submit();
  };

  // 검색
  const AmdSearch = () => {
    const gubun = document.querySelector("#gubun").value;
    const word = document.querySelector("#word").value;
    console.log(gubun + "," + word);
    const asyncDB = async () => {
      const res = await jsonAmdList({ gubun: gubun, word: word });
      if (res.data) {
        console.log(res.data);
        setAmdList(res.data);
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

      {/* ####################[[조건 검색]]############################## */}
      <div className="container">
        <CONTENTS3>
          <h4>
            <strong>상품 관리</strong>
          </h4>
          <br />
          <div
            className="d-flex mx-auto"
            style={{ width: "140%", height: "45px" }}
          >
            <div className="col-1">
              <select id="gubun" className="form-select" aria-label="분류선택">
                <option defaultValue>분류선택</option>
                <option value="MD_NAME">상품명</option>
                <option value="MD_BRAND">브랜드</option>
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
                onClick={AmdSearch}
              >
                검색
              </Button>
            </div>
          </div>
        </CONTENTS3>
      </div>
      {/* ###################[[조건검색 끝]]####################### */}
      <div className="container">
        {/******************AmdList*******************/}
        <CONTENTS2>
          <table>
            <colgroup>
              <col style={{ width: "10%", textAlign: "center" }} />
              <col style={{ width: "20%", textAlign: "center" }} />
              <col style={{ width: "30%", textAlign: "center" }} />
              <col style={{ width: "20%", textAlign: "center" }} />
              <col style={{ width: "20%", textAlign: "center" }} />
            </colgroup>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>번호</th>
                <th style={{ textAlign: "center" }}>브랜드</th>
                <th style={{ textAlign: "center" }}>상품명</th>
                <th style={{ textAlign: "center" }}>거래처번호</th>
                <th style={{ textAlign: "center" }}>재고</th>
              </tr>
            </thead>
            <tbody>
              {amdList.slice(offset, offset + limit).map((amd, i) => (
                <AmdRow key={i} amd={amd} />
              ))}
            </tbody>
          </table>
          <br />
          <Pagination
            total={amdList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              variant="outline-secondary"
              id="btn_search"
              onClick={handleShow}
            >
              상품 등록
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="outline-secondary"
              id="btn_search"
              onClick={allList}
            >
              전체조회
            </Button>
            &nbsp;
          </div>
        </CONTENTS2>
      </div>
      {/* end of container */}
      <br />
      <br />
      {/* ***************** AmdList 끝************************** */}

      {/* ============================== [[ 상품 등록 모달 시작 ]] ============================== */}
      <Modal size="lg" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">상품 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_amd" method="get">
            <input type="hidden" name="MD_NO" id="MD_NO" />
            <input type="hidden" name="MD_IMAGE" id="MD_IMAGE" />
            <input type="hidden" name="MD_IMAGE_URL" id="MD_IMAGE_URL" />
            <input type="hidden" name="MD_DETAIL_IMAGE" id="MD_DETAIL_IMAGE" />
            <input
              type="hidden"
              name="MD_DETAIL_IMAGE_URL"
              id="MD_DETAIL_IMAGE_URL"
            />

            {/* 상품 입력 폼 */}
            <Form.Group className="mb-3" controlId="formBasicDeptno">
              <Form.Label>상품이름</Form.Label>
              <Form.Control type="text" name="MD_NAME" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDname">
              <Form.Label>상세 내용</Form.Label>
              <Form.Control type="text" name="MD_CONTENT" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>상품가격</Form.Label>
              <Form.Control type="text" name="MD_PRICE" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>상품원가</Form.Label>
              <Form.Control type="text" name="MD_COST" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>카테고리</Form.Label>
              <Form.Select
                type="text"
                name="MD_CATEGORY"
                aria-label="Default select example"
              >
                <option>카테고리</option>
                <option value="생리대">생리대</option>
                <option value="탐폰">탐폰</option>
                <option value="그 외">그 외</option>
              </Form.Select>
              {/*  <Form.Control
                type="text"
                name="MD_CATEGORY"
                placeholder="Enter MD_CATEGORY"
              /> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>거래처 번호</Form.Label>
              <Form.Select
                type="text"
                name="STORE_NO"
                aria-label="Default select example"
              >
                <option>거래처 번호</option>
                {storeList.map((storeList) => (
                  <option value={storeList.STORE_NO}>
                    {storeList.STORE_NO + "/" + storeList.FIELD}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>할인율</Form.Label>
              <Form.Control type="text" name="MD_DISCOUNT" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>브랜드</Form.Label>
              <Form.Control type="text" name="MD_BRAND" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>상품재고</Form.Label>
              <Form.Control type="text" name="ST_AMOUNT" />
            </Form.Group>

            {/* 부서 이미지 등록 첨부파일 */}
            <div style={{ width: "100%", textAlign: "center" }}>
              <tr>
                <td>
                  <strong>메인 이미지</strong>
                </td>
                <td>
                  <strong>상세 이미지</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Group className="mb-3" width="150px">
                    <input
                      className="form-control"
                      type="file"
                      id="img1"
                      name="img1"
                      onChange={imgChange1}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group className="mb-3">
                    <input
                      className="form-control"
                      type="file"
                      id="img2"
                      name="img2"
                      onChange={imgChange2}
                    />
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td>
                  <div id="uploadImg1">
                    <img
                      className="thumbNail"
                      src="https://via.placeholder.com/200"
                      alt="미리보기"
                    />
                  </div>
                </td>
                <td>
                  <div id="uploadImg2">
                    <img
                      className="thumbNail"
                      src="https://via.placeholder.com/200"
                      alt="미리보기"
                    />
                  </div>
                </td>
              </tr>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            id="btn_search"
            onClick={handleClose}
          >
            닫기
          </Button>
          <Button
            variant="outline-secondary"
            id="btn_search"
            onClick={amdInsert}
          >
            등록
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ============================== [[ 상품 등록 모달 종료 ]] ============================== */}
      <Footer />
    </>
  );
};

export default Amd;
