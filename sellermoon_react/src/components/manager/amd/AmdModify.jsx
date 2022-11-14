import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { jsonAmdList, jsonStoreList } from "../../../service/dbLogic";
import { CONTENTS2 } from "../../member/orderdetail/TOrderD";

/*
 * /admin/Amd/modify/Amd.MD_NO
 * 상품 수정 페이지입니다.
 * 가능한 기능 R, U, D
 */

const AmdModify = ({ pictureUpload, isLogin, isAdmin, adminId }) => {
  const navigate = useNavigate();

  const { MD_NO } = useParams();
  console.log(MD_NO);

  const [amdVO, setAmdVO] = useState({
    STORE_NO: 0,
    MD_NO: 0,
    MD_NAME: "",
    MD_CONTENT: "",
    MD_PRICE: 0,
    MD_COST: 0,
    MD_CATEGORY: "",
    MD_IMAGE: "",
    MD_IMAGE_URL: "",
    MD_DETAIL_IMAGE: "",
    MD_DETAIL_IMAGE_URL: "",
    MD_DISCOUNT: 0,
    MD_BRAND: "",
    ST_AMOUNT: 0,
  });
  // input 정보 가져오기
  useEffect(() => {
    const asyncDB = async () => {
      const res = await jsonAmdList({ MD_NO: MD_NO });
      console.log(res);
      setAmdVO(res.data[0]);
    };
    asyncDB();
  }, [MD_NO]);

  // store 옵션값 불러오기용
  const [storeList, setStoreList] = useState([]);
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

  // store 옵션값 push용
  const store = [];
  for (let i = 0; i < storeList.length; i++) {
    const element = [];
    element[i] = storeList[i].STORE_NO + storeList[i].FIELD;

    if (element.length > 0) {
      store.push(element);
      console.log(store);
    }
  }

  //이미지 저장용(이미지,상세이미지)
  const [file1, setFile1] = useState({ MD_IMAGE: null, MD_IMAGE_URL: null });
  const [file2, setFile2] = useState({
    MD_DETAIL_IMAGE: null,
    MD_DETAIL_IMAGE_URL: null,
  });
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
      // if (img.width > 150) {
      //   //넣으려는 사진 크기에 맞춰 width값을 제한
      // }
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
      // if (img.width > 150) {
      //   //넣으려는 사진 크기에 맞춰 width값을 제한
      // }
      img2.width = 150;
      holder2.innerHTML = "";
      holder2.appendChild(img2);
    };
    reader.readAsDataURL(file2);
    return false;
  };

  //엠디 수정 스프링단으로 보내기
  const amdUpdate = () => {
    document.querySelector("#MD_IMAGE").value = file1.MD_IMAGE;
    document.querySelector("#MD_DETAIL_IMAGE").value = file2.MD_DETAIL_IMAGE;
    document.querySelector("#MD_IMAGE_URL").value = file1.MD_IMAGE_URL;
    document.querySelector("#MD_DETAIL_IMAGE_URL").value =
      file2.MD_DETAIL_IMAGE_URL;
    /*  document.querySelector("#MD_CATEGORY").value = MD_CATEGORY.text; */
    document.querySelector("#f_amd").action =
      "http://localhost:9005/admin/amd/amdUpdate?MD_NO=" + MD_NO;
    document.querySelector("#f_amd").submit();
  };

  //수정값 저장
  const handleChangeForm = (e) => {
    if (e.currentTarget == null) return;
    e.preventDefault();
    console.log(MD_NO);
    setAmdVO({
      ...amdVO, // 처음에 초기화된 정보에 얕은 복사 처리
      MD_NO: MD_NO,
      [e.target.name]: e.target.value,
    });
    console.log(amdVO);
  };
  console.log(MD_NO);

  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />

      <br />
      <br />
      <br />
      <div className="container">
        <CONTENTS2>
          <Form id="f_amd" method="get">
            <input type="hidden" name="MD_IMAGE" id="MD_IMAGE" />
            <input type="hidden" name="MD_IMAGE_URL" id="MD_IMAGE_URL" />
            <input type="hidden" name="MD_DETAIL_IMAGE" id="MD_DETAIL_IMAGE" />
            <input
              type="hidden"
              name="MD_DETAIL_IMAGE_URL"
              id="MD_DETAIL_IMAGE_URL"
            />

            <Form.Group className="mb-3" controlId="formBasicWriter">
              <Form.Label>
                <strong>상품 이름</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="MD_NAME"
                value={amdVO.MD_NAME}
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicWriter">
              <Form.Label>
                <strong>내용</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="MD_CONTENT"
                value={amdVO.MD_CONTENT}
                onChange={handleChangeForm}
              />
            </Form.Group>
            {/*  <Form.Group className="mb-3" controlId="formBasicWriter">
          <Form.Label>MD_CATEGORY</Form.Label>
          <Form.Control
            type="text"
            name="MD_CATEGORY"
            value={amdVO.MD_CATEGORY}
            onChange={handleChangeForm}
          />
        </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicWriter">
              <Form.Label>
                <strong>상품 카테고리</strong>
              </Form.Label>
              <Form.Select
                type="text"
                name="MD_CATEGORY"
                id="MD_CATEGORY"
                value={amdVO.MD_CATEGORY}
                onChange={handleChangeForm}
              >
                <option defaultValue>
                  {"선택한 카테고리:" + amdVO.MD_CATEGORY}
                </option>
                <option value="생리대-대형">생리대-대형</option>
                <option value="생리대-중형">생리대-중형</option>
                <option value="생리대-소형">생리대-소형</option>
                <option value="탐폰">탐폰</option>
                <option value="그 외">그 외</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <strong>상품 가격</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="MD_PRICE"
                value={amdVO.MD_PRICE}
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <strong>상품 원가</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="MD_COST"
                value={amdVO.MD_COST}
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <strong>할인율</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="MD_DISCOUNT"
                value={amdVO.MD_DISCOUNT}
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <strong>브랜드</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="MD_BRAND"
                value={amdVO.MD_BRAND}
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>
                <strong>거래처</strong>
              </Form.Label>
              <Form.Select
                type="text"
                name="STORE_NO"
                aria-label="Default select example"
              >
                <option value={amdVO.STORE_NO} defaultValue>
                  {"현재 거래체 번호 : " + amdVO.STORE_NO}
                </option>
                {storeList.map((storeList) => (
                  <option value={storeList.STORE_NO}>
                    {storeList.STORE_NO + "/" + storeList.FIELD}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicLoc">
          <Form.Label>STORE_NO</Form.Label>
          <Form.Control
            type="text"
            name="STORE_NO"
            value={amdVO.STORE_NO}
            placeholder="Enter STORE_NO"
          />
        </Form.Group> */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <strong>재고</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="ST_AMOUNT"
                value={amdVO.ST_AMOUNT}
                onChange={handleChangeForm}
              />
            </Form.Group>

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
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="hidden"
                name="MD_NO"
                value={amdVO.MD_NO}
                onChange={handleChangeForm}
              />
            </Form.Group>

            {/* 부서 등록 이미지 미리보기 */}
          </Form>

          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                navigate("/admin/amd/modify/" + MD_NO);
              }}
              variant="outline-secondary"
              id="btn_search"
              style={{ width: "100px" }}
            >
              <i className="fa-regular fa-file-lines"></i>
              &nbsp;수정
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="outline-secondary"
              id="btn_search"
              onClick={() => {
                navigate("/admin/md");
              }}
            >
              &nbsp;&nbsp;전체목록&nbsp;&nbsp;
            </Button>
          </div>
          <br />
          <br />
          <br />
        </CONTENTS2>
      </div>
      <Footer />
    </>
  );
};

export default AmdModify;
