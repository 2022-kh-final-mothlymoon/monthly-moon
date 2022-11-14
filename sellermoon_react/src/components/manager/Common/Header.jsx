import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Button,
  Nav,
  Form,
  NavDropdown,
} from "react-bootstrap";
import TabCards from "../main/TabCards";
import { Link, useNavigate } from "react-router-dom";
import data from "../../../data.js";

const Header = ({ isLogin, isAdmin, adminId }) => {
  let [tab, setTab] = useState(0); // 0이면 0번째 내용 보이게, 1이면 1번째 내용 ...
  let [fade, setFade] = useState("");
  let [padset, setPadset] = useState(data);
  useEffect(() => {
    // fade 변수 자리에 claaName 'end'를 탈부착 (css)
    // 부착만 하면 안되고, 뗐다가 부착해야 애니메이션이 보임
    // 따라서 cleanUp Function + setTimeout 사용하기!
    setTimeout(() => {
      setFade("end");
      console.log("setTimeout");
    }, 100); // 0.1 초뒤에 실행

    // useEffect 실행 전에 실행됨
    return () => {
      setFade("");
      console.log("return");
    };
  }, [tab]);
  const [show, setShow] = useState(false); // 로그아웃 버튼 로그인 시 보이게 하기
  // 로그아웃 버튼 상태관리를 위한 useEffect
  useEffect(() => {
    if (isAdmin === true) {
      setShow(true);
    } else setShow(false);
  }, [isAdmin]);
  // 아이디 담기

  /* 
    useNavigate 라는 훅 -> 페이지 이동을 도와주는 함수를 담고 잇음.
    보통 변수에 담아서 사용함 
  */
  let navigate = useNavigate();
  const sellerMoon = () => {
    navigate("/");
  };
  const logout = () => {
    sessionStorage.clear();
    alert("로그아웃되었습니다.");
    navigate("/admin/login");
    window.location.reload();
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/admin/login">월간;문</Navbar.Brand>
          &nbsp;&nbsp;&nbsp;
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Link to="/admin/statics" className="nav-link">
                통계
              </Link> */}
              <Link to="/admin/member" className="nav-link">
                회원관리
              </Link>
              <Link to="/admin/order" className="nav-link">
                주문관리
              </Link>
              <Link to="/admin/point" className="nav-link">
                포인트관리
              </Link>
              <Link to="/admin/store" className="nav-link">
                거래처
              </Link>
              <NavDropdown
                title="상품 관리"
                id="basic-nav-dropdown"
                className="nav-menu2"
              >
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/admin/md");
                  }}
                >
                  상품
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/admin/review");
                  }}
                >
                  리뷰
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="게시판 관리"
                id="basic-nav-dropdown"
                className="nav-menu2"
              >
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/admin/board/boardList");
                  }}
                >
                  게시판
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/admin/report/reportList");
                  }}
                >
                  신고
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="고객센터 관리"
                id="basic-nav-dropdown"
                className="nav-menu"
              >
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/admin/notice");
                  }}
                >
                  공지사항
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/admin/faq");
                  }}
                >
                  FAQ
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button
              className="btn btn-light btn-outline-secondary px-3"
              onClick={sellerMoon}
            >
              회원용 사이트로 이동하기
            </Button>
            &nbsp;
            {!isAdmin ? (
              <Button
                className="btn btn-light btn-outline-secondary px-3"
                onClick={() => navigate("/admin/login")}
              >
                로그인
              </Button>
            ) : null}
            {show && (
              <Button
                className="btn btn-light btn-outline-secondary px-3"
                onClick={logout}
              >
                로그아웃
              </Button>
            )}
            {/* {onLogout && (<Button variant="primary" onClick={()=>{logout2(auth); window.location.reload();}}>Logout</Button>)} */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
