import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Nav } from "react-bootstrap";
import { deleteCartAPI, updateCartAPI } from "../../../service/dbLogic";

const Cart = ({ c, pReload, pSum, isCk }) => {
  const [cart, setCart] = useState({});
  const [md, setMd] = useState({});
  // 갯수
  const [quantity, setQuantity] = useState(0);
  // 총 가격
  const [sum, setSum] = useState(0);

  /*  모달관련  */
  // 장바구니 삭제 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userno = window.sessionStorage.getItem("user_no");

  useEffect(() => {
    // 카트 객체
    setCart(c);
    // 카트 객체 안의 상품 정보 객체
    setMd(c.mdVO);
    // 갯수
    setQuantity(c.cartQuantity);
    // 총액
    const s = c.mdVO.mdDcPrice * c.cartQuantity;
    setSum(s);
  }, [c]);

  useEffect(() => {
    if (!isCk.includes(c.cartNo)) {
      pSum({ no: c.cartNo, sum: 0 });
    } else {
      pSum({ no: c.cartNo, sum: sum });
    }
  }, [isCk]);

  // API 호출 함수
  const deleteCart = async (e) => {
    const data = {
      cartNo: e,
      memberNo: userno,
    };

    await deleteCartAPI(data).then((res) => {
      if (res.data) {
        setShow(false);
        pReload();
      }
    });
  };

  const updateCart = async (e) => {
    const data = {
      cartNo: cart.cartNo,
      quantity: e,
      memberNo: userno,
    };

    await updateCartAPI(data).then((res) => {
      if (res.data) {
        setShow(false);
        pReload();
      }
    });
  };

  // 옵션값 변경 시 호출
  const handleOption = (q) => {
    updateCart(q);
    setQuantity(q);
    const s = md.mdDcPrice * q;
    setSum(s);
    pSum(s);
  };

  const handleIncre = () => {
    handleOption(quantity + 1);
  };

  const handleDecre = () => {
    if (quantity != 1) {
      handleOption(quantity - 1);
    }
  };

  return (
    <>
      <td style={{ fontWeight: "bold" }}>
        <img src={md.mdImageUrl} alt="img" style={{ width: 250 }} />
        &nbsp;&nbsp;{md.mdName}
      </td>
      <td className="td_center">
        <div className="cart_md_price">{md.mdPrice}원</div>
        <div className="cart_md_dcprice">{md.mdDcPrice}원</div>
      </td>
      <td className="td_center">
        <button onClick={handleDecre} className="td_btn">
          -
        </button>
        &nbsp;{quantity}&nbsp;
        <button onClick={handleIncre} className="td_btn">
          +
        </button>
      </td>
      <td className="td_center" style={{ fontSize: 20, fontWeight: "bold" }}>
        {sum}원
      </td>
      <td className="td_center">
        <button
          onClick={handleShow}
          className="td_btn"
          style={{ fontSize: 16 }}
        >
          삭제
        </button>
      </td>

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
              deleteCart(cart.cartNo);
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
export default Cart;
