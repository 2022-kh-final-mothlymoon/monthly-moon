import React from "react";
import axios from "axios";
import { P_SMALL, P_STRONG } from "../../../styles/SubStyle";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Col, Row, Modal } from "react-bootstrap";
import {
  modifyProfile,
  memberProfile,
  paymentlist,
  paytotal,
} from "./../../../service/dbLogic";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BROWN_BTN } from "../../../styles/NoticeStyle";
import {
  FORM,
  ORDER_CHECKS,
  ORDER_LI,
  ORDER_NUM1,
  ORDER_P1,
  ORDER_SPAN,
  ORDER_UL,
  POINTSUM,
} from "../../../styles/PaymentStyle";
import {
  ORDER_WRAPPER,
  ORDER_CHECK,
  ORDER_BTN,
  ORDER_NUM2,
  ORDER_P2,
} from "./../../../styles/PaymentStyle";
import OrderPageRow from "./OrderPageRow";

const Payment = (effect, deps) => {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  //return ();
};

const OrderPage = ({ no, props, myPoint }) => {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [shipFee, setShipFee] = useState(0); /* ????????? */

  const [orderInfo, setOrderInfo] = useState({
    cart_no: 0,
    cart_quantity: 0,
    order_type: "",
    md_name: "",
    order_amount: 0 /* ??????????????? (????????????*??????)  */,
    order_payment: 0 /* ??????????????? (????????????*?????? - ???????????????) */,
    order_used_point: 0,
  });

  const [memInfo, setMemInfo] = useState({
    member_no: 0,
    member_name: "",
    member_zipcode: "",
    member_address: "",
    member_address_detail: "",
    member_method: "",
    member_level: "",
    member_phone: 0,
    member_birth: "",
    member_email: "",
    member_date: "",
  });

  //????????? ???????????? ????????????
  useEffect(() => {
    console.log("useEffet ??????");
    memberProfile({ member_no: no }).then((res) => {
      if (!res.data) {
        setMemInfo(res.data);
      } else {
        setMemInfo(res.data);
      }
    });
  }, [no]);

  // ???????????? onChange ??????
  const onChange = (e) => {
    if (e.currentTarget === null) return;
    e.preventDefault();
    setMemInfo({
      ...memInfo,
      [e.target.name]: e.target.value,
    });
  };

  // ????????? ???????????? onChange
  const pointChange = (e) => {
    if (e.currentTarget === null) return;
    e.preventDefault();
    setOrderInfo({
      ...orderInfo,
      [e.target.name]: e.target.value,
    });
  };

  ///// ?????? ???????????? ?????? ?????? //////
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(data.zonecode); // ????????????
    console.log(fullAddress); // ??????
    setMemInfo({
      ...memInfo,
      member_zipcode: data.zonecode, // ?????? ????????? ???????????? ??????
      member_address: fullAddress, // ????????? ?????? ??????
      member_address_detail: "", // ???????????? api?????? ???????????? ???????????? ?????? ????????????
    });

    setShow(false);
  };

  /* **************************************************** */

  const [payList, setPayList] = useState([]);

  /* payList ????????? ???????????? */
  useEffect(() => {
    const paymentList = async () => {
      await paymentlist({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          console.log(res.data);
          setPayList(res.data);
        }
      });
    };
    paymentList();
  }, [no]);

  /* ??????????????? ????????? ???????????? */
  useEffect(() => {
    const payTotal = async () => {
      await paytotal({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          console.log(res.data);
          setOrderInfo({ order_amount: res.data.ORDER_AMOUNT });

          /* ???????????? 3?????? ???????????? ????????? 0??? */
          if (res.data.ORDER_AMOUNT < 30000) {
            setShipFee(3000);
          } else setShipFee(0);
        }
      });
    };
    payTotal();
  }, [no]);

  /* *********????????? ????????????************************* */

  const pointUseAll = () => {
    setOrderInfo({
      order_used_point: parseInt(myPoint.POINT_SUM),
      order_amount: parseInt(orderInfo.order_amount),
      order_payment:
        parseInt(orderInfo.order_amount) -
        parseInt(orderInfo.order_used_point) +
        shipFee,
    });
  };

  /* **************************************************** */

  const onClickPayment = (e) => {
    e.preventDefault();
    const { IMP } = window;
    IMP.init("imp26765046"); // ????????? ???????????? // ?????? ????????? ??????

    let data = {
      pg: "html5_inicis", // PG??? (????????????)
      pay_method: "card", // ???????????? (????????????)
      merchant_uid: `O_${new Date().getTime()}`,
      name:
        payList.length > 1
          ? payList[0].MD_NAME + " ??? " + (payList.length - 1) + "???"
          : payList[0].MD_NAME, // ????????? (????????????)
      amount:
        parseInt(orderInfo.order_amount) -
        parseInt(orderInfo.order_used_point) +
        shipFee, // ?????? (????????????)
      //amount: 100,
      buyer_name: memInfo.member_name, // ????????? ??????
      buyer_tel: memInfo.member_phone, // ????????? ???????????? (????????????)
      buyer_email: memInfo.member_email, // ????????? ?????????
      buyer_addr: memInfo.member_address,
      order_type: "O", // ????????????
      //buyer_postalcode: "????????????", // ....
    };
    console.log("requestPay => " + JSON.stringify(data));
    IMP.request_pay(data, callback);
    console.log(payList[0].MD_NAME); /* ??????????????? ??? 1?????? ?????? ?????????.. */
    console.log(data.buyer_name);
    console.log(data.buyer_tel);
    console.log(data.buyer_addr);
  };

  const callback = (res) => {
    const { success } = res;
    if (success) {
      alert("?????? ??????");
      console.log(res);
      console.log(res.merchant_uid);
      navigate("/orderdetail/" + res.merchant_uid);
      let list = {
        // json ????????? spring??? ?????? ??????
        ORDER_NO: res.merchant_uid,
        MEMBER_NO: no,
        //CART_NO: "1", /////////////////// ?????? ????????? ?????? -> insert ????????? ????????????..
        CART_NO: payList[0].CART_NO,
        ORDER_PAYMENT: res.paid_amount,
        ORDER_AMOUNT:
          parseInt(orderInfo.order_amount) -
          parseInt(orderInfo.order_used_point) +
          shipFee,
        ORDER_DATE: `${new Date().getTime().toLocaleString}`,
        ORDER_USED_POINT: parseInt(orderInfo.order_used_point),
        PURCHASE_NO: "p" + res.merchant_uid,
        PURCHASE_METHOD: res.pay_method + res.card_name + res.card_number,
        ORDER_DE_NO: "d" + res.merchant_uid,
        ORDER_DE_QUANTITY: payList.length,
        ORDER_DE_PRICE: res.paid_amount,
        ORDER_DE_CANCEL: "N",
        DELIVERY_STATUS: "???????????????",
        DELIVERY_ADDRESS: res.buyer_addr,
        DELIVERY_PHONE: res.buyer_tel,
        DELIVERY_FEE: shipFee,
      };

      axios
        .post(process.env.REACT_APP_SPRING_IP + "paymentInsert", list)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          pointUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
      const pointUpdate = () => {
        axios
          .post(process.env.REACT_APP_SPRING_IP + "payPointUpdate", list)
          .then((response) => {
            console.log(response);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    }
  };

  /* ***************************************************** */

  return (
    <>
      <Header />
      <div className="container" style={{ padding: "80px 0 200px 0" }}>
        <P_STRONG>???????????? (????????????)</P_STRONG>

        <Row className="mb-5">
          <Col xs={12} md={7}>
            {/* ************?????????????????? ************ */}
            <FORM id="f_modifym">
              <P_SMALL>????????????</P_SMALL>
              <div className="mb-3 mt-3 row">
                <label className="col-sm-2 col-form-label">??????</label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="member_name"
                    id="member_name"
                    value={(memInfo && memInfo.member_name) || ""}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">?????????</label>
                <div className="col-sm-5 d-flex">
                  <input
                    type="text"
                    name="member_zipcode"
                    id="member_zipcode"
                    value={(memInfo && memInfo.member_zipcode) || ""}
                    onChange={onChange}
                    className="form-control"
                  />
                  <BROWN_BTN onClick={handleShow} type="button">
                    ????????????
                  </BROWN_BTN>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-7 d-flex">
                  <input
                    type="text"
                    name="member_address"
                    id="member_address"
                    value={(memInfo && memInfo.member_address) || ""}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-7 d-flex">
                  <input
                    type="text"
                    name="member_address_detail"
                    id="member_address_detail"
                    value={(memInfo && memInfo.member_address_detail) || ""}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-4 row">
                <label className="col-sm-2 col-form-label">???????????? </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="member_phone"
                    id="member_phone"
                    value={(memInfo && memInfo.member_phone) || ""}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
              </div>
              <input
                type="hidden"
                name="member_email"
                id="member_email"
                value={(memInfo && memInfo.member_email) || ""}
                onChange={onChange}
                className="form-control"
              />
            </FORM>

            {/* ************????????????????????? ************ */}
            <FORM>
              <br />
              <P_SMALL>????????? ??????</P_SMALL>
              <div className="mt-2 mb-2 row">
                <label className="col-sm-2 col-form-label">?????????</label>
                <div className="col-sm-5 d-flex">
                  <input
                    type="number"
                    name="order_used_point"
                    id="order_used_point"
                    onChange={pointChange}
                    value={orderInfo.order_used_point || ""}
                    className="form-control"
                  />
                  <BROWN_BTN onClick={pointUseAll} type="button">
                    ????????????
                  </BROWN_BTN>
                </div>
              </div>
              <div className="mb-4 row">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-7 d-flex">
                  <span>&nbsp;?????? ?????????</span>
                  <POINTSUM>
                    {myPoint.POINT_SUM > 0 ? myPoint.POINT_SUM : 0} P
                  </POINTSUM>
                </div>
              </div>
            </FORM>

            {/* ********************************************************** */}
          </Col>

          <Col xs={6} md={5}>
            <ORDER_WRAPPER>
              <P_SMALL>???????????? / ??? {payList.length}???</P_SMALL>
              <ORDER_UL>
                {payList.map((pay, i) => (
                  <OrderPageRow key={i} pay={pay} />
                ))}
              </ORDER_UL>

              <hr />

              <div className="d-flex justify-content-left">
                <ORDER_NUM1>??? ????????????</ORDER_NUM1>
                <ORDER_NUM2>
                  {parseInt(orderInfo.order_amount).toLocaleString()}???
                </ORDER_NUM2>
              </div>

              <div className="d-flex justify-content-left">
                <ORDER_NUM1>????????? ??????</ORDER_NUM1>
                <ORDER_NUM2>
                  -&nbsp;
                  {parseInt(orderInfo.order_used_point) > 0
                    ? parseInt(orderInfo.order_used_point).toLocaleString()
                    : 0}
                  ???
                </ORDER_NUM2>
              </div>

              <div className="d-flex justify-content-left">
                <ORDER_NUM1>?????????&nbsp; &nbsp; &nbsp; &nbsp;</ORDER_NUM1>
                <ORDER_NUM2>+&nbsp;{shipFee}???</ORDER_NUM2>
              </div>

              <div className="d-flex justify-content-left">
                <ORDER_NUM1>
                  <strong>??? ????????????</strong>
                </ORDER_NUM1>
                <ORDER_P2>
                  {parseInt(orderInfo.order_used_point) > 0
                    ? (
                        parseInt(orderInfo.order_amount) -
                        parseInt(orderInfo.order_used_point) +
                        shipFee
                      ).toLocaleString()
                    : parseInt(orderInfo.order_amount).toLocaleString()}{" "}
                  ???
                </ORDER_P2>
              </div>

              <hr />

              <p style={{ margin: "8px 18px" }}>
                ?????? ????????? ???????????????, ?????? ????????? ???????????????.
              </p>
              <div className="d-flex">
                <ORDER_CHECK type="checkbox" defaultChecked />
                <ORDER_CHECKS>(??????) ???????????? ??????/?????? ??????</ORDER_CHECKS>
              </div>
              <div className="d-flex">
                <ORDER_CHECK type="checkbox" defaultChecked />
                <ORDER_CHECKS>(??????) ???????????? ???3??? ?????? ??????</ORDER_CHECKS>
              </div>
              <div className="d-flex">
                <ORDER_CHECK type="checkbox" defaultChecked />
                <ORDER_CHECKS>(??????) ???????????? ????????? ????????????</ORDER_CHECKS>
              </div>

              <div className="d-flex justify-content-center">
                <ORDER_BTN onClick={onClickPayment}>????????????</ORDER_BTN>
              </div>
            </ORDER_WRAPPER>
          </Col>
        </Row>
      </div>{" "}
      {/* end of container */}
      <Footer />
      {/* ???????????? ?????? */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>???????????? ??????</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderPage;
