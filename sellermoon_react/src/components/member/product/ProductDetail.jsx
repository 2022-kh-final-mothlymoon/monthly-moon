import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Modal } from "react-bootstrap";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { getProductDetailAPI, insertCartAPI } from "../../../service/dbLogic";
import MemberReview from "../product_review/MemberReview";

const ProductDetail = ({ no, logout, isLogin }) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [dcPrice, setDcPrice] = useState(0);
  const [sum, setSum] = useState(1);
  const [type, setType] = useState("");

  // 로그인 유도 모달
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);

  const location = useLocation();
  const navigate = useNavigate();
  const query = queryString.parse(location.search);
  const md_no = query.no;
  const userNo = window.sessionStorage.getItem("user_no");

  const handleIncre = () => {
    handleOption(quantity + 1);
  };

  const handleDecre = () => {
    if (quantity != 1) {
      handleOption(quantity - 1);
    }
  };

  // 옵션값 변경 시 호출되는 함수
  const handleOption = (q) => {
    setQuantity(q);
    setSum(q * dcPrice);
  };

  const goLoginPage = (e) => {
    navigate(`/login`);
  };

  const insertCart = async () => {
    const data = {
      mdNo: product.mdNo,
      orderType: type,
      cartQuantity: quantity,
      memberNo: userNo,
    };
    console.log(data);
    await insertCartAPI(data).then((res) => {
      if (res.data) {
        alert("장바구니에 상품이 담겼습니다.");
        setQuantity(1);
      }
    });
  };

  const cartBtnHandler = (type) => {
    const confirm = window.confirm("해당 상품을 장바구니에 담으시겠습니까?");
    if (confirm) {
      setType(type);
    }
  };

  useEffect(() => {
    if (type !== "") {
      insertCart();
    }
  }, [type]);

  useEffect(() => {
    console.log("useEffet 호출");
    const getProductDetail = async () => {
      await getProductDetailAPI(md_no).then((res) => {
        if (res.data === null) {
          return () => {};
        } else {
          setProduct(res.data);
          const price = res.data.mdPrice * ((100 - res.data.mdDiscount) / 100);
          setDcPrice(price);
          setSum(price);
        }
      });
    };
    getProductDetail();
  }, []);

  return (
    <>
      <Header logout={logout} isLogin={isLogin} />
      <br />
      <div className="container">
        <div className="product_detail_title">
          {product.mdBrand}&nbsp;/&nbsp;{product.mdCategory}
        </div>{" "}
        <hr /> <br />
        <div className="product_detail">
          <img
            className="product_detail_image"
            src={product.mdImageUrl}
            alt="img"
          />
          <Card style={{ marginLeft: 300, width: 700, padding: 50 }}>
            <Card.Title style={{ fontSize: 30 }}>{product.mdName}</Card.Title>
            <hr />
            <div className="product_detail_price">
              &nbsp;{product.mdPrice}원
            </div>
            <div className="product_detail_discount">
              {dcPrice}원<br />
            </div>
            <br />
            <div>
              브랜드: {product.mdBrand} <br />
              종류: {product.mdCategory}
            </div>
            <br />

            <Card>
              <div style={{ fontWeight: "bold", marginLeft: 4 }}>할인안내</div>
              &nbsp;월간;문 특별 할인 혜택 {product.mdDiscount}%{" "}
            </Card>
            <br />
            <Card>
              <div style={{ fontWeight: "bold", marginLeft: 4 }}>배송안내</div>
              &nbsp;3000원 (30,000원 이상 주문시 무료배송)
              <br />
              &nbsp;정기구독 시 무료배송
            </Card>
            <br />
            <div className="product_detail_qtt" style={{ fontSize: 30 }}>
              <button onClick={handleDecre} className="cart_detail_btn">
                -
              </button>
              &nbsp;
              {quantity}&nbsp;
              <button onClick={handleIncre} className="cart_detail_btn">
                +
              </button>
            </div>
            <br />
            <br />
            <div className="product_detail_sum">총 구매금액: {sum}원</div>
            <br />
            <button className="cartBtn" onClick={() => cartBtnHandler("O")}>
              개별구매 장바구니
            </button>
            <br />
            <button className="cartBtn" onClick={() => cartBtnHandler("T")}>
              정기구독 장바구니
            </button>
          </Card>
        </div>
        <br />
        <hr />
        <h4 style={{ padding: 30 }}>제품 상세 페이지</h4>
        <div className="productDetail" style={{ margin: 40 }}>
          <div className="product_detail_content">{product.mdContent}</div>
          <div
            className="product_detail_d_image"
            style={{ alignItems: "center" }}
          >
            <img src={product.mdDetailImageUrl} alt="d-img" />
          </div>
        </div>
        <MemberReview md_no={md_no} no={no} isLogin={isLogin} />
      </div>
      <Footer />

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
            로그인
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

export default ProductDetail;
