import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { insertCartAPI } from "../../../service/dbLogic";

const Product = ({ p, no, logout, isLogin }) => {
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();

  const userNo = window.sessionStorage.getItem("user_no");

  /*  모달관련  */
  // 장바구니 담기 전 확인 메세지 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (userNo) {
      setShow(true);
    } else {
      setShowLogin(true);
    }
  };
  // 장바구니 담은 후 성공 메세지 & 장바구니 페이지로 이동 모달
  const [showSucc, setShowSucc] = useState(false);
  const handleCloseSucc = () => setShowSucc(false);
  // 로그인 유도 모달
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);

  useEffect(() => {
    setProduct(p);
  }, [p]);

  const goLoginPage = (e) => {
    navigate(`/login`);
  };
  const details = (e) => {
    navigate(`/product/detail?no=${e}`);
  };
  const insertCart = async (e) => {
    const data = {
      mdNo: e,
      orderType: "O",
      cartQuantity: 1,
      memberNo: userNo,
    };

    await insertCartAPI(data).then((res) => {
      if (res.data) {
        setShow(false);
        setShowSucc(true);
      }
    });
  };

  const goToCart = async () => {
    navigate("/cart?type=O");
  };
  return (
    <>
      <div className="product_container">
        <div
          className="clickEvent"
          onClick={() => {
            details(product.mdNo);
          }}
        >
          <div className="product_image">
            <img src={product.mdImageUrl} alt="img" style={{ width: 260 }} />
          </div>
          <Card.Title
            className="product_name"
            style={{ fontWeight: "bold", marginLeft: 10, marginTop: 5 }}
          >
            {product.mdName}
          </Card.Title>
          <Card.Text></Card.Text>
          <Card.Text
            className="product_price"
            style={{ marginLeft: 10, textAlign: "end" }}
          >
            {product.mdPrice}원
          </Card.Text>
          <Card.Title
            className="product_discount"
            style={{ marginLeft: 10, textAlign: "end" }}
          >
            {product.mdDiscount}% &nbsp;{" "}
            {product.mdPrice * ((100 - product.mdDiscount) / 100)}원
          </Card.Title>
          <br />
        </div>
        <button
          className="product_btn"
          style={{ marginLeft: 120 }}
          onClick={handleShow}
        >
          장바구니 담기
        </button>
      </div>

      {/* =========================== [[ 장바구니 담기 확인 모달 시작 ]] =========================== */}
      <Modal size="md" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            장바구니 담기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-container">
            <span>해당 상품을 장바구니에 담으시겠습니까?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              insertCart(product.mdNo);
            }}
          >
            담기
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
      {/* =========================== [[ 장바구니 담기 확인 모달 종료 ]] =========================== */}

      {/* =========================== [[ 장바구니 담기 완료 모달 시작 ]] =========================== */}
      <Modal
        size="md"
        show={showSucc}
        onHide={handleCloseSucc}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            장바구니로 이동
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-container">
            <span>장바구니 담기에 성공하였습니다! </span> <br />
            <span>장바구니로 이동하시겠습니까? </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              goToCart();
            }}
          >
            이동
          </Button>
          <Button variant="secondary" onClick={handleCloseSucc}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
      {/* =========================== [[ 장바구니 담기 완료 모달 종료 ]] =========================== */}

      {/* =========================== [[ 비로그인유저 모달창 ]] =========================== */}
      <Modal
        size="md"
        show={showLogin}
        onHide={handleCloseLogin}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            로그인 후 이용가능한 서비스입니다.
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              goLoginPage();
            }}
          >
            로그인하기
          </Button>
          <Button variant="secondary" onClick={handleCloseLogin}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
      {/* =========================== [[ 비로그인유저 모달창 종료 ]] =========================== */}
    </>
  );
};

export default Product;
