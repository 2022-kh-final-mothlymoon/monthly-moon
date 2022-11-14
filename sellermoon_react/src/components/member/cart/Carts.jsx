import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Modal, Nav } from "react-bootstrap";
import queryString from "query-string";
import {
  getAllMyCartAPI,
  deleteCartAPI,
  orderCartAPI,
} from "../../../service/dbLogic";
import Cart from "./Cart";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { TABTITLE } from "../../../styles/MainStyle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const Carts = ({ isLogin, logout, no }) => {
  const [carts, setCarts] = useState([]);

  const location = useLocation();
  const query = queryString.parse(location.search);
  const navigate = useNavigate();

  // 장바구니 타입
  const type = query.type;

  // 장바구니 금액정보
  const [sum, setSum] = useState(0);
  const [shipFee, setShipFee] = useState(0);
  const [priceItems, setPriceItems] = useState([]);

  // 장바구니 타입
  const [orderType, setOrderType] = useState("O");
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [activeKey, setActiveKey] = useState("link1");

  // 체크박스
  const [checkItems, setCheckItems] = useState([]);
  const [allCheck, setAllCheck] = useState(true);

  // 장바구니 삭제 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //////////// 구독정보 저장하기 /////////
  // 월경주기 - 기본값 28일
  const [cycle, setCycle] = useState(28);
  // 배송주기 - 기본 주기 1주기
  const [period, setPeriod] = useState(1);
  // datepicker
  const [startDate, setStartDate] = useState(new Date());

  const userno = window.sessionStorage.getItem("user_no");

  // 장바구니 불러오기
  const getCartsData = async () => {
    if (userno) {
      await getAllMyCartAPI(orderType, userno).then((res) => {
        if (res.data === null) {
          return () => {};
        } else {
          setCarts(res.data);
        }
      });
    }
  };

  // 장바구니 삭제
  const deleteCart = async (e) => {
    console.log(e);
    await deleteCartAPI(e).then(() => {
      setShow(false);
      pReload();
    });
  };

  // 장바구니 주문
  const orderCart = async () => {
    const confirm = window.confirm(
      orderType == "T"
        ? "해당 구독 정보로 선택한 상품을 주문하시겠습니까?"
        : "선택한 상품을 주문하시겠습니까?"
    );
    const data = {
      orderType: orderType,
      period: period * cycle,
      date: startDate,
      memberNo: userno,
      cartNo: checkItems,
    };

    if (confirm && orderType == "O") {
      await orderCartAPI(data).then(() => {
        setCycle(28);
        setPeriod(1 * 28);
        pReload();
        navigate("/payment");
      });
    } else if (confirm && orderType == "T") {
      await orderCartAPI(data).then(() => {
        setCycle(28);
        setPeriod(1 * 28);
        pReload();
        navigate("/spayment");
      });
    }
  };

  const cartO = () => {
    // window.location.href="?type=O" -- 무한로딩 에러 발생 코드
    setPriceItems([]);
    navigate("/cart?type=O");
    setOrderType("O");
    setIsSubscribe(false);
    setActiveKey("link0");
    pReload();
  };

  const cartT = () => {
    setPriceItems([]);
    navigate("/cart?type=T");
    setOrderType("T");
    setIsSubscribe(true);
    setActiveKey("link1");
    pReload();
  };

  // 카트 리스트 데이터 다시 불러오기
  const pReload = () => {
    getCartsData();
    setSum(0);
    setPriceItems([]);
  };
  // 이건 저도 이해 못했음요 ㅎ 수고티비
  const pSum = (e) => {
    const arr = [...priceItems];
    const i = arr.findIndex((j) => j.no === e.no);
    const k = i > -1;
    if (k) {
      console.log("update", e);
      // setPriceItems(arr)
      if (arr[i].sum != e.sum) {
        arr[i] = { ...arr[i], sum: e.sum };
        setPriceItems(arr);
      }
    } else if (e.sum > 0) {
      arr.push(e);
      console.log("push", e);
      setPriceItems((prevArr) => [...prevArr, e]);
    }
  };

  // 체크박스 단일 개체 선택
  const handleSingleCheck = (checked, id) => {
    setAllCheck(false);
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      // 체크 해제
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = () => {
    // 체크박스 클릭시 현재 값과 반대 값이 check변수에 저장
    //(현재 전체 선택 되어있다면 check변수의 값은 false)
    // state에 allCheck 다시 저장
    const check = !allCheck;
    setAllCheck(check);
    console.log("change " + check);
    // 전체 체크 박스가 체크되면 모든 Cart의 cartNo를 배열에 넣어줌
    if (check) {
      const idArray = [];
      carts.forEach((el) => idArray.push(el.cartNo));
      setCheckItems(idArray);
    }
    // 반대의 경우 배열 값 삭제
    else {
      setCheckItems([]);
    }
  };

  const handleSelectDelete = () => {
    checkItems.forEach((e) => deleteCart({ cartNo: e, memberNo: userno }));
  };

  useEffect(() => {
    getCartsData();
  }, [orderType]);

  useEffect(() => {
    setOrderType(type);
    const isT = type === "T";
    console.log(isT);
    setIsSubscribe(isT);
    setActiveKey(isT ? "link1" : "link0");
  }, [type]);

  useEffect(() => {
    console.log("priceItems", priceItems);
    if (priceItems.length > 0) {
      const sumWithInitial = priceItems.reduce((acc, obj) => {
        return acc + obj.sum;
      }, 0);
      setSum(sumWithInitial);
    }
  }, [priceItems]);

  useEffect(() => {
    if (carts.length > 0) {
      const idArray = [];
      carts.forEach((el) => idArray.push(el.cartNo));
      setCheckItems(idArray);
    }
  }, [carts]);

  useEffect(() => {
    // 개별구매 총액이 30000원 이상이거나 정기배송일 경우 배송비 0원
    setShipFee(sum < 30000 && type != "T" ? 3000 : 0);
  }, [sum]);

  return (
    <>
      <Header isLogin={isLogin} logout={logout} no={no} />
      <div className="container" style={{ padding: 10 }}>
        <br />
        <br />
        <Nav fill variant="tabs" activeKey={activeKey}>
          <Nav.Item>
            <Nav.Link onClick={cartO} eventKey="link0">
              <TABTITLE>개별구매</TABTITLE>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={cartT} eventKey="link1">
              <TABTITLE>정기구독</TABTITLE>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div>
          <table>
            <thead>
              <tr className="text-center">
                <th>&nbsp;&nbsp;</th>
                <th>상품정보</th>
                <th>판매가</th>
                <th>수량</th>
                <th>구매가</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="cart_table_body">
              {carts && carts.length > 0
                ? carts.map((c) => (
                    <tr className="cart_list_wrapper" key={c.cartNo}>
                      <input
                        className="tbody_check"
                        type="checkbox"
                        value={c.cartNo}
                        checked={checkItems.includes(c.cartNo)}
                        onChange={(e) =>
                          handleSingleCheck(e.target.checked, c.cartNo)
                        }
                      />
                      <Cart
                        c={c}
                        pReload={pReload}
                        pSum={pSum}
                        isCk={checkItems}
                      />
                      <hr />
                    </tr>
                  ))
                : "장바구니가 비어있습니다."}
            </tbody>
          </table>
        </div>
        <div className="cart_list_footer">
          <div className="cart_list_btn_container">
            <button className="cart_selectBtn" onClick={handleAllCheck}>
              전체 선택
            </button>
            &nbsp;
            <button className="cart_selectBtn" onClick={handleShow}>
              선택 삭제
            </button>
          </div>
          <br />
          {/* 월경 주기일 입력 시작 */}
          {isSubscribe && (
            <Card className="cart_subscribe">
              <div className="group_form_row">
                <div className="group_form_label">
                  월경주기&nbsp;&nbsp;&nbsp;
                </div>
                <div className="group_form_input">
                  <input
                    type="text"
                    id="js-cycle"
                    name="cycle"
                    inputMode="numeric"
                    onChange={(e) => {
                      setCycle(e.target.value);
                    }}
                    placeholder="숫자"
                    max={365}
                    maxLength="3"
                    value={cycle}
                  />
                  일
                </div>
                <br />
              </div>
              <div className="group_form_row group_select">
                <div className="group_form_label">배송주기</div>
                <select
                  name="multiple"
                  id="js-multiple"
                  onChange={(e) => {
                    setPeriod(e.target.value);
                  }}
                >
                  <option selected disabled>
                    선택해주세요
                  </option>
                  <option value="1">1주기마다 ({cycle}일마다)</option>
                  <option value="2">2주기마다 ({cycle * 2}일마다)</option>
                  <option value="3">3주기마다 ({cycle * 3}일마다)</option>
                </select>
              </div>
              <br />
              <div className="group_form_ros">
                <div className="group_form_label">첫 발송일</div>
                <div className="group_form_datePicker">
                  <DatePicker
                    selected={startDate}
                    locale={ko} // 한글로 변경
                    dateFormat="yyyy.MM.dd"
                    minDate={new Date()}
                    onChange={(date) => setStartDate(date)}
                  />
                  <div
                    className="js-datePickerContainer date_picker_container"
                    style={{ display: "block" }}
                  >
                    <div className="hasDatepicker"></div>
                  </div>
                </div>
              </div>
            </Card>
          )}
          {/* 월경 주기일 입력 끝 */}

          <Card
            className="cart_list_sum_price_container"
            style={{ backgroundColor: "#f9f9f6" }}
          >
            <div className="cart_list_price">총 상품 금액 : {sum}원</div>
            <div className="cart_list_ship_fee">배송비 : {shipFee}원</div>
            <hr />
            <div className="cart_list_sum">
              총 주문 금액 : {sum + shipFee}원
            </div>
            <br />
            <Button
              onClick={orderCart}
              style={{
                height: 50,
                color: "black",
                backgroundColor: "white",
                borderColor: "lightgray",
              }}
            >
              선택 상품 주문하기
            </Button>
          </Card>
        </div>
      </div>
      <br />
      <br />
      <Footer />

      {/* =========================== [[ 장바구니 삭제 완료 모달 시작 ]] =========================== */}
      <Modal size="md" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            장바구니 삭제
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-container">
            <span>해당 장바구니를 삭제하시겠습니까?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleSelectDelete();
            }}
          >
            네
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            아니요
          </Button>
        </Modal.Footer>
      </Modal>
      {/* =========================== [[ 장바구니 삭제 완료 모달 종료 ]] =========================== */}
    </>
  );
};

export default Carts;
