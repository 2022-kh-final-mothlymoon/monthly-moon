import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = ({ isLogin, logout, no, isAdmin }) => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false); // 로그아웃 버튼 로그인 시 보이게 하기
  // 로그아웃 버튼 상태관리를 위한 useEffect
  useEffect(() => {
    if (isLogin === true) {
      setShow(true);
    } else setShow(false);
  }, [isLogin]);
  return (
    <>
      <Navbar expand="lg" className="first-nav">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <Button id="logo-icon">
                <i className="fa-solid fa-cloud-moon"></i>
              </Button>
              <img
                src="https://res.cloudinary.com/drxxdsv01/image/upload/v1666798853/logo8_t4lbha.png"
                alt="logo"
                style={{ marginTop: "1.9rem" }}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Form className="d-flex" id="search-container">
              <input
                className="search-input"
                id="keyword"
                type="text"
                placeholder="통합검색"
              />
              <Button id="nav-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </Form>
            <div className="nav-btn-container">
              <button
                className="btn position-relative"
                id="nav-btn"
                onClick={() => {
                  navigate("/cart?type=O");
                }}
              >
                {" "}
                {/* 장바구니 이동 */}
                <i className="fa-solid fa-cart-shopping" id="nav-icon"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  2<span className="visually-hidden">unread messages</span>
                </span>
              </button>
              <button
                className="btn position-relative"
                id="nav-btn"
                onClick={() => {
                  navigate("/memo/receiveMemoList");
                }}
              >
                {" "}
                {/* 쪽지 이동 */}
                <i className="fa-solid fa-envelope" id="nav-icon"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  1<span className="visually-hidden">unread messages</span>
                </span>
              </button>
              <button
                className="btn position-relative"
                onClick={() => {
                  isLogin === true
                    ? navigate("/mypage/subscription")
                    : navigate("/login");
                }}
              >
                {" "}
                {/* Mypage,로그인,회원가입 이동 */}
                <i className="fa-solid fa-user" id="nav-icon"></i>
              </button>
              {/* 로그아웃 버튼 -- 로그인시에만 보임 */}
              {show && (
                <button className="btn position-relative" onClick={logout}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ################################[[ 아래부터 메뉴바 ]]################################## */}

      <Navbar className="second-nav">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav>
              {/* <Nav.Link className="nav-menu" onClick={()=>{ navigate('/store') }}>정기구독</Nav.Link> */}

              <NavDropdown
                title="Monthly-Moon"
                id="basic-nav-dropdown"
                className="nav-menu"
              >
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  정기구독
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  체험팩
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  기업구매
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link
                id="basic-nav-dropdown"
                className="nav-menu"
                onClick={() => {
                  navigate("/products");
                }}
              >
                Store
              </Nav.Link>

              <NavDropdown
                title="Moon Story"
                id="basic-nav-dropdown"
                className="nav-menu"
              >
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/board/boardList");
                  }}
                >
                  커뮤니티
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/memo/receiveMemoList");
                  }}
                >
                  쪽지
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="Customer"
                id="basic-nav-dropdown"
                className="nav-menu"
              >
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/notice");
                  }}
                >
                  공지사항
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/faq");
                  }}
                >
                  FAQ
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
