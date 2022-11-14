import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/member/main/Main";
import LoginPage from "./components/member/login/LoginPage";
import RegisterPage from "./components/member/register/RegisterPage";
import FindIdPass from "./components/member/login/FindIdPass";
import MyAccount from "./components/member/mypage/MyAccount";
import MyAccountM from "./components/member/mypage/MyAccountM";
import MyDelAccount from "./components/member/mypage/MyDelAccount";
import Notice from "./components/member/notice/Notice";
import NoticeDetail from "./components/member/notice/NoticeDetail";
import NoticeAdmin from "./components/manager/notice/NoticeAdmin";
import NoticeUpAdmin from "./components/manager/notice/NoticeUpAdmin";
import Faq from "./components/member/faq/Faq";
import FaqDetail from "./components/member/faq/FaqDetail";
import FaqAdmin from "./components/manager/faq/FaqAdmin";
import FaqUpAdmin from "./components/manager/faq/FaqUpAdmin";
import AdminLogin from "./components/manager/login/AdminLogin";
import Statics from "./components/manager/statics/Statics";
import Amd from "./components/manager/amd/Amd";
import Store from "./components/manager/store/Store";
import Carts from "./components/member/cart/Carts";
import Products from "./components/member/product/Products";
import ProductDetail from "./components/member/product/ProductDetail";
import { useState } from "react";
import { useEffect } from "react";
import MemAdmin from "./components/manager/member/MemAdmin";
import MemAdminDetail from "./components/manager/member/MemAdminDetail";
import KakaoLogin from "./components/member/login/KakaoLogin";
import NaverLogin from "./components/member/login/NaverLogin";
import Point from "./components/member/point/Point";
import Friends from "./components/member/point/Friends";
import ChatLogin from "./components/member/chat/ChatLogin";
import ChatMessage from "./components/member/chat/ChatMessage";
import PointAdmin from "./components/manager/point/PointAdmin";
import Subscription from "./components/member/subscription/Subscription";
import { mypoint, mysubs } from "./service/dbLogic";
import AdminBoardDetail from "./components/manager/board/AdminBoardDetail";
import AdminBoardList from "./components/manager/board/AdminBoardList";
import MemberBoardList from "./components/member/board/MemberBoardList";
import MemberBoardDetail from "./components/member/board/MemberBoardDetail";
import MemberBoardForm from "./components/member/board/MemberBoardForm";
import MemberBoardEditForm from "./components/member/board/MemberBoardEditForm";
import StoreModify from "./components/manager/store/StoreModify";
import StoreDetail from "./components/manager/store/StoreDetail";
import AmdDetail from "./components/manager/amd/AmdDetail";
import AmdModify from "./components/manager/amd/AmdModify";
import Payment from "./components/member/Payment/Payment";
import PaymentResult from "./components/member/PaymentResult/PaymentResult";
import MemberReview from "./components/member/product_review/MemberReview";
import MyReview from "./components/member/mypage/MyReview";
import OrderD from "./components/member/orderdetail/OrderD";
import OrderPage from "./components/member/Payment/OrderPage";
import SorderPage from "./components/member/Payment/SorderPage";
import MyAccountConfirm from "./components/member/mypage/MyAccountConfirm";
import AdminReview from "./components/manager/admin_review/AdminReview";
import MemberReceiveMemoList from "./components/member/memo/MemberReceiveMemoList";
import MemberSendMemoList from "./components/member/memo/MemberSendMemoList";
import AdminReportList from "./components/manager/report/AdminReportList";
import MyOrder from "./components/member/mypage/MyOrder";
import MyBoard from "./components/member/mypage/MyBoard";
import TOrderD from "./components/member/orderdetail/TOrderD";
import AdminOrder from "./components/manager/order/AdminOrder";
import AdminOrderDetail from "./components/manager/order/AdminOrderDetail";

function App({ authLogic, pictureUpload }) {
  let navigate = useNavigate();
  let [no, setNo] = useState(0); // 회원 번호 담기 props로 넘겨주기 위함
  let [adminId, setAdminId] = useState(""); // 관리자 id담기 props로 넘겨주기 위함
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태 관리
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 권한 관리
  useEffect(() => {
    // session에 담긴 값이 null이 아닐때
    if (sessionStorage.getItem("user_no") !== null) {
      setNo(sessionStorage.getItem("user_no")); // user_no(회원번호) 가져옴
      // 자동로그인 상태일 때
    } else if (localStorage.getItem("user_no") !== null) {
      setNo(localStorage.getItem("user_no")); // user_no(회원번호) 가져옴
    } else if (sessionStorage.getItem("admin") !== null) {
      // 관리자 로그인시
      setAdminId(sessionStorage.getItem("admin")); // 관리자 id가져옴
    }
  }, [no]);

  useEffect(() => {
    if (sessionStorage.getItem("user_no") !== null) {
      console.log("isLogin ===> ", isLogin);
      setIsLogin(true);
    } else if (localStorage.getItem("user_no") !== null) {
      console.log("isLogin ===> ", isLogin);
      setIsLogin(true);
    } else if (sessionStorage.getItem("admin") !== null) {
      setIsAdmin(true);
      setIsLogin(true);
      console.log("isLogin ===> ", isLogin);
      console.log("isAdmin ===> ", isAdmin);
    } else {
      console.log("isLogin ===> ", isLogin);
      console.log("isAdmin ===> ", isAdmin);
    }
    console.log("useEffect 호출");
  }, [isLogin, isAdmin]);

  // 로그아웃
  const logout = () => {
    sessionStorage.clear();
    window.localStorage.removeItem("user_no");
    window.localStorage.removeItem("com.naver.nid.access_token");
    alert("로그아웃되었습니다.");
    navigate("/");
    window.location.reload();
  };

  /* **************************************************** */
  //토탈포인트 가져오기 */

  const [myPoint, setMyPoint] = useState({ point_sum: "" });

  useEffect(() => {
    const myPoint = async () => {
      await mypoint({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          //console.log(res);
          //console.log(res.data);
          setMyPoint(res.data);
        }
      });
    };
    myPoint();
  }, [no]);
  /* **************************************************** */
  const [mySubs, setMySubs] = useState({ md_name: "" });

  useEffect(() => {
    const mySubs = async () => {
      await mysubs({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          //console.log(res.data);
          setMySubs(res.data);
        }
      });
    };
    mySubs();
  }, [no]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          exact={true}
          element={
            <Main isAdmin={isAdmin} isLogin={isLogin} logout={logout} no={no} />
          }
        />
        <Route
          path="/kakaologin"
          exact={true}
          element={!isLogin ? <KakaoLogin /> : <Navigate to="/" />}
        />
        <Route
          path="/naverlogin"
          exact={true}
          element={!isLogin ? <NaverLogin /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          exact={true}
          element={
            !isLogin ? (
              <LoginPage isLogin={isLogin} no={no} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/findidpass"
          exact={true}
          element={
            !isLogin ? (
              <FindIdPass no={no} isLogin={isLogin} logout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/mypage/profile"
          exact={true}
          element={
            isLogin &&
            (isLogin ? (
              <MyAccount
                isLogin={isLogin}
                no={no}
                mySubs={mySubs}
                logout={logout}
                myPoint={myPoint}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          path="/mypage/chkpass"
          exact={true}
          element={
            isLogin &&
            (isLogin ? (
              <MyAccountConfirm
                isLogin={isLogin}
                no={no}
                mySubs={mySubs}
                logout={logout}
                myPoint={myPoint}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          path="/mypage/modifyprofile"
          exact={true}
          element={
            isLogin &&
            (isLogin ? (
              <MyAccountM
                isLogin={isLogin}
                no={no}
                mySubs={mySubs}
                logout={logout}
                myPoint={myPoint}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          path="/mypage/delmember"
          exact={true}
          element={
            isLogin &&
            (isLogin ? (
              <MyDelAccount
                isLogin={isLogin}
                no={no}
                mySubs={mySubs}
                myPoint={myPoint}
                logout={logout}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          path="/mypage/point"
          element={
            isLogin &&
            (isLogin ? (
              <Point
                myPoint={myPoint}
                isLogin={isLogin}
                no={no}
                mySubs={mySubs}
                logout={logout}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
          exact={true}
        />

        <Route
          path="/mypage/friends"
          element={
            isLogin &&
            (isLogin ? (
              <Friends
                myPoint={myPoint}
                isLogin={isLogin}
                no={no}
                mySubs={mySubs}
                logout={logout}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
          exact={true}
        />
        <Route
          exact={true}
          path="/mypage/review"
          element={
            isLogin &&
            (isLogin ? (
              <MyReview
                isLogin={isLogin}
                no={no}
                myPoint={myPoint}
                mySubs={mySubs}
                logout={logout}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          exact={true}
          path="/mypage/orderlist"
          element={
            isLogin &&
            (isLogin ? (
              <MyOrder
                isLogin={isLogin}
                no={no}
                myPoint={myPoint}
                mySubs={mySubs}
                logout={logout}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          exact={true}
          path="/mypage/board"
          element={
            isLogin &&
            (isLogin ? (
              <MyBoard
                isLogin={isLogin}
                no={no}
                myPoint={myPoint}
                mySubs={mySubs}
                logout={logout}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />

        <Route
          path="/chat/login"
          exact={true}
          element={<ChatLogin authLogic={authLogic} />}
        />
        <Route
          path="/chat/chatroom/:userId"
          element={<ChatMessage authLogic={authLogic} />}
          exact={true}
        />

        <Route
          path="/mypage/subscription"
          element={
            isLogin &&
            (isLogin ? (
              <Subscription
                myPoint={myPoint}
                isLogin={isLogin}
                mySubs={mySubs}
                no={no}
                logout={logout}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/register"
          exact={true}
          element={
            !isLogin ? <RegisterPage isLogin={isLogin} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/notice"
          element={<Notice isLogin={isLogin} logout={logout} no={no} />}
          exact={true}
        />
        <Route
          path="/notice/detail/:notice_no"
          element={<NoticeDetail isLogin={isLogin} logout={logout} no={no} />}
          exact={true}
        />
        <Route
          path="/faq"
          element={<Faq isLogin={isLogin} logout={logout} />}
          exact={true}
        />
        <Route
          path="/faq/detail/:faq_no"
          element={<FaqDetail isLogin={isLogin} logout={logout} />}
          exact={true}
        />
        <Route
          path="/board/boardList"
          exact={true}
          element={
            isLogin &&
            (isLogin ? (
              <MemberBoardList isLogin={isLogin} no={no} logout={logout} />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          path="/board/boardDetail/:board_no"
          exact={true}
          element={
            isLogin &&
            (isLogin ? (
              <MemberBoardDetail isLogin={isLogin} no={no} logout={logout} />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          path="/board/boardForm"
          exact={true}
          element={
            isLogin &&
            (isLogin ? (
              <MemberBoardForm
                isLogin={isLogin}
                logout={logout}
                pictureUpload={pictureUpload}
                no={no}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          path="/board/boardEditForm/:board_no"
          exact={true}
          element={
            isLogin &&
            (isLogin ? (
              <MemberBoardEditForm isLogin={isLogin} no={no} logout={logout} />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          path="/memo/receiveMemoList"
          exact={true}
          element={
            isLogin &&
            (isLogin ? (
              <MemberReceiveMemoList
                isLogin={isLogin}
                no={no}
                logout={logout}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          path="/memo/sendMemoList"
          exact={true}
          element={
            isLogin &&
            (isLogin ? (
              <MemberSendMemoList isLogin={isLogin} no={no} logout={logout} />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          exact={true}
          path="/payment/result"
          element={
            isLogin &&
            (isLogin ? (
              <PaymentResult isLogin={isLogin} logout={logout} />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          exact={true}
          path="/payment"
          element={
            isLogin &&
            (isLogin ? (
              <OrderPage
                isLogin={isLogin}
                no={no}
                myPoint={myPoint}
                logout={logout}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />

        <Route
          exact={true}
          path="/payments"
          element={
            isLogin &&
            (isLogin ? (
              <Payment
                isLogin={isLogin}
                no={no}
                myPoint={myPoint}
                logout={logout}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />

        <Route
          exact={true}
          path="/spayment"
          element={
            isLogin &&
            (isLogin ? (
              <SorderPage
                isLogin={isLogin}
                no={no}
                myPoint={myPoint}
                logout={logout}
              />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          exact={true}
          path="/orderdetail/:ORDER_NO"
          element={
            isLogin &&
            (isLogin ? (
              <OrderD isLogin={isLogin} logout={logout} no={no} />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          exact={true}
          path="/torderdetail/:ORDER_NO"
          element={
            isLogin &&
            (isLogin ? (
              <TOrderD isLogin={isLogin} no={no} logout={logout} />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          exact={true}
          path="/products"
          element={<Products isLogin={isLogin} no={no} logout={logout} />}
        />
        <Route
          exact={true}
          path="/product/:id"
          element={<ProductDetail isLogin={isLogin} no={no} logout={logout} />}
        />
        <Route
          exact={true}
          path="/cart"
          element={
            isLogin &&
            (isLogin ? (
              <Carts isLogin={isLogin} logout={logout} />
            ) : (
              <Navigate to="/login" />
            ))
          }
        />
        <Route
          exact={true}
          path="/review"
          element={<MemberReview isLogin={isLogin} no={no} logout={logout} />}
        />

        {/********************** 관리자 페이지 영역 *************************/}
        <Route
          path="/admin/login"
          element={
            !isAdmin ? (
              <AdminLogin
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/member" />
            )
          }
          exact={true}
        />
        <Route
          path="/admin/notice"
          element={
            isAdmin &&
            (isAdmin ? (
              <NoticeAdmin
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/notice/update/:notice_no"
          element={
            isAdmin &&
            (isAdmin ? (
              <NoticeUpAdmin
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/faq"
          element={
            isAdmin &&
            (isAdmin ? (
              <FaqAdmin adminId={adminId} isLogin={isLogin} isAdmin={isAdmin} />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/faq/update/:faq_no"
          element={
            isAdmin &&
            (isAdmin ? (
              <FaqUpAdmin
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/member"
          element={
            isAdmin &&
            (isAdmin ? (
              <MemAdmin adminId={adminId} isLogin={isLogin} isAdmin={isAdmin} />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/member/:member_no"
          element={
            isAdmin &&
            (isAdmin ? (
              <MemAdminDetail
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/review"
          element={
            isAdmin &&
            (isAdmin ? (
              <AdminReview
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/board/boardList"
          exact={true}
          element={
            isAdmin &&
            (isAdmin ? (
              <AdminBoardList
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
        />
        <Route
          path="/admin/report/reportList"
          exact={true}
          element={
            isAdmin &&
            (isAdmin ? (
              <AdminReportList
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
        />
        <Route
          path="/admin/board/boardDetail/:board_no"
          exact={true}
          element={
            isAdmin &&
            (isAdmin ? (
              <AdminBoardDetail
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
        />

        <Route
          path="/admin/statics"
          element={
            isAdmin &&
            (isAdmin ? (
              <Statics adminId={adminId} isLogin={isLogin} isAdmin={isAdmin} />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />

        <Route
          path="/admin/order"
          element={
            isAdmin &&
            (isAdmin ? (
              <AdminOrder
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/order/:order_no"
          element={
            isAdmin &&
            (isAdmin ? (
              <AdminOrderDetail
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/point"
          element={
            isAdmin &&
            (isAdmin ? (
              <PointAdmin
                adminId={adminId}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/store"
          element={
            isAdmin &&
            (isAdmin ? (
              <Store adminId={adminId} isLogin={isLogin} isAdmin={isAdmin} />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/store/modify/:STORE_NO"
          element={
            isAdmin &&
            (isAdmin ? (
              <StoreModify isLogin={isLogin} isAdmin={isAdmin} />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/store/detail/:STORE_NO"
          element={
            isAdmin &&
            (isAdmin ? (
              <StoreDetail isLogin={isLogin} isAdmin={isAdmin} />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/md"
          element={
            isAdmin &&
            (isAdmin ? (
              <Amd
                pictureUpload={pictureUpload}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/md/modify/:MD_NO"
          element={
            isAdmin &&
            (isAdmin ? (
              <AmdModify
                pictureUpload={pictureUpload}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/md/detail/:MD_NO"
          element={
            isAdmin &&
            (isAdmin ? (
              <AmdDetail isLogin={isLogin} isAdmin={isAdmin} />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
      </Routes>
    </>
  );
}

export default App;
