import React from "react";
import axios from "axios"
import NavbarMypage from "./../Common/NavbarMypage";
import SidebarMypage from "./../Common/SidebarMypage";
import { BROWN_BTN, BROWN_BTN2, CONTENTS } from "./../../../styles/NoticeStyle";
import Header from "./../Common/Header";
import Footer from "./../Common/Footer";
import {
  TABLE,
  TH,
  TH_NOW,
  TD,
  P_STRONG,
  P_SMALL,
} from "./../../../styles/SubStyle";
import { useEffect } from "react";
import { subslist, subspurchase } from "../../../service/dbLogic";
import { useState } from "react";
import { subsdeliver } from "./../../../service/dbLogic";
import { Modal, Container, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Subscription = ({ myPoint, no, isLogin, logout, mySubs }) => {

  let navigate = useNavigate();

/* *************************************************  */
  /* 모달 관련 */
  const [show1, setShow1] = useState(false)
  const handleClose1 = () => setShow1(false)
  const handleShow1 = () => setShow1(true)

  const [show2, setShow2] = useState(false)
  const handleClose2 = () => setShow2(false)
  const handleShow2 = () => setShow2(true)

  const [show3, setShow3] = useState(false)
  const handleClose3 = () => setShow3(false)
  const handleShow3 = () => setShow3(true)
/* *************************************************  */

  const [subsVO, setSubsVO] = useState({
    member_name: "",
    member_address: "",
    member_address_detail: "",
    md_name: "",
    md_content: "",
    md_price: 0,
    st_amount: 0,
    sub_no: 0,
    sub_start: "",
    sub_end: "",
    sub_period: 0,
  });

  const [subsDeliver, setSubsDeliver] = useState({
    order_date: "",
    delivery_status: "",
    delivery_date: "",
  });

  const [subsPurchase, setSubsPurchase] = useState({
    purchase_method: "",
  });

  /* **************************************************** */
  /* 구독 기본정보 가져오기 */
  useEffect(() => {
    const subsList = async () => {
      await subslist({ member_no: no }).then((res) => {
        if (res.data === null) {
          return () => {};
        } else {
          console.log(res);
          console.log(res.data);
          setSubsVO(res.data);
        }
      });
    };
    subsList();
  }, [no]);

  /* ************************************************** */

  /* 구독 배송정보 가져오기 */
  useEffect(() => {
    const subsDeliver = async () => {
      await subsdeliver({ member_no: no }).then((res) => {
        if (res.data === null) {
          return () => {};
        } else {
          console.log(res.data);
          setSubsDeliver(res.data);
        }
      });
    };
    subsDeliver();
  }, [no]);

  /* ************************************************** */

  /* 구독 결제정보 가져오기 */
  useEffect(() => {
    const subsPurchase = async () => {
      await subspurchase({ member_no: no }).then((res) => {
        if (res.data === null) {
          return () => {};
        } else {
          console.log(res.data);
          setSubsPurchase(res.data);
        }
      });
    };
    subsPurchase();
  }, [no]);

  /* ************************************************** */
  /* 날짜 계산 함수 */
  let date = new Date(subsDeliver.ORDER_DATE);
  let today = new Date();
  
  const setDate1 = () => {
    date.setDate(date.getDate() + 28); /* 결제일 + 28일뒤 */
    const payday = date.toLocaleString()
    return payday;
  }

  const setDate2 = () => {
    date.setDate(date.getDate() + 56); /* 결제일 + 56일뒤 */
    const payday = date.toLocaleString()
    return payday;
  }

  const setDate3 = () => {
    date.setDate(date.getDate() + 84); /* 결제일 + 84일뒤 */
    const payday = date.toLocaleString()
    return payday;
  }

  /* ************************************************** */

    //onchange 이벤트로 input 값 가져오기
    const onChange = (e) => {
      if(e.currentTarget == null) return;
        console.log("폼 내용 변경 발생 name : "+e.target.name);
        console.log("폼 내용 변경 발생 value : "+e.target.value);
      e.preventDefault();
      /* faq배열 복제하고 n_no속성만 n_no로 덮어쓰기 */
      setSubsVO({
        ...subsVO,
        [e.target.name]: e.target.value,
      })
    }

    
  /* ************************************************** */
////////////// 배송주기 Update //////////////////
const periodUpdate = (e) => {
  e.preventDefault()

  let list = {
      // json 형태로 spring에 값을 넘김
      sub_period: subsVO.sub_period,
  }
  console.log("periodUpdate => "+ JSON.stringify(list));

  axios
  .post(process.env.REACT_APP_SPRING_IP +"subs/periodupdate", list)
  .then((response) => {
    console.log(response);
    console.log(response.data);
    window.location.replace("/mypage/subscription")
    alert("변경되었습니다!")
  })
  .catch((error) => {
      console.log(error);
  })
}



/* *************************************************  */
////////////// 일시정지 Update //////////////////
const pauseUpdate = (e) => {
  e.preventDefault()

  let list = {
      // json 형태로 spring에 값을 넘김
      sub_end: today.toLocaleString()
  }
  console.log("pauseUpdate => "+ JSON.stringify(list));

  axios
  .post(process.env.REACT_APP_SPRING_IP +"subs/pauseupdate", list)
  .then((response) => {
    console.log(response);
    console.log(response.data);
    window.location.replace("/mypage/subscription")
    alert("접수되었습니다!")
  })
  .catch((error) => {
      console.log(error);
  })
}

const cancelPause = (e) => {
  e.preventDefault()

  let list = {
      // json 형태로 spring에 값을 넘김
      sub_end: 0,
  }
  console.log("pauseUpdate => "+ JSON.stringify(list));

  axios
  .post(process.env.REACT_APP_SPRING_IP +"subs/pauseupdate", list)
  .then((response) => {
    console.log(response);
    console.log(response.data);
    window.location.replace("/mypage/subscription")
    alert("일시정지가 취소되었습니다.")
  })
  .catch((error) => {
      console.log(error);
  })
}

/* *************************************************  */

  const closeUpdate = (e) => {
    e.preventDefault()

  let list = {
      // json 형태로 spring에 값을 넘김
      sub_period: 0,
  }
  console.log("closeUpdate => "+ JSON.stringify(list));

  axios
  .post(process.env.REACT_APP_SPRING_IP +"subs/periodupdate", list)
  .then((response) => {
    console.log(response);
    console.log(response.data);
    window.location.replace("/mypage/subscription")
    alert("구독해지 신청이 완료되었습니다.")
  })
  .catch((error) => {
      console.log(error);
  })
  }

  const cancelClose = (e) => {
    e.preventDefault()

  let list = {
      sub_period: 28,
  }
  console.log("cancelClose => "+ JSON.stringify(list));

  axios
  .post(process.env.REACT_APP_SPRING_IP +"subs/periodupdate", list)
  .then((response) => {
    console.log(response);
    console.log(response.data);
    window.location.replace("/mypage/subscription")
    alert("구독해지 신청이 취소되었습니다.")
  })
  .catch((error) => {
      console.log(error);
  })
  }

/* *************************************************  */

  return (
    <>
      <Header isLogin={isLogin} logout={logout} />
      <div className="container">
        <CONTENTS className="row">
          <SidebarMypage />
          <div className="col-9">
            <div className="list-wrapper">
              <NavbarMypage myPoint={myPoint} mySubs={mySubs} />

              <P_STRONG>정기구독 현황</P_STRONG>

                  <TABLE>
                    <colgroup>
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "25%" }} />
                    </colgroup>

                    <thead>
                      <tr>
                        {subsDeliver.DELIVERY_STATUS === "결제완료" ? (
                          <TH_NOW>
                            <i className="fa-regular fa-credit-card"></i>
                            <br />
                            결제완료
                          </TH_NOW>
                        ) : (
                          <TH>
                            <i className="fa-regular fa-credit-card"></i>
                            <br />
                            결제완료
                          </TH>
                        )}
                        {subsDeliver.DELIVERY_STATUS === "상품준비중" ? (
                          <TH_NOW>
                            <i className="fa-solid fa-box-open"></i>
                            <br />
                            상품준비중
                          </TH_NOW>
                        ) : (
                          <TH>
                            <i className="fa-solid fa-box-open"></i>
                            <br />
                            배송준비
                          </TH>
                        )}
                        {subsDeliver.DELIVERY_STATUS === "배송중" ? (
                          <TH_NOW>
                            <i className="fa-solid fa-truck"></i>
                            <br />
                            배송중
                          </TH_NOW>
                        ) : (
                          <TH>
                            <i className="fa-solid fa-truck"></i>
                            <br />
                            배송중
                          </TH>
                        )}
                        {subsDeliver.DELIVERY_STATUS === "배송완료" ? (
                          <TH_NOW>
                            <i className="fa-regular fa-circle-check"></i>
                            <br />
                            배송완료
                          </TH_NOW>
                        ) : (
                          <TH>
                            <i className="fa-regular fa-circle-check"></i>
                            <br />
                            배송완료
                          </TH>
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        {subsDeliver.DELIVERY_STATUS === "결제완료" && (
                          <TD colSpan={4}>
                            1회차 <strong>정기구독이 결제되었습니다.</strong>
                            <br />
                            배송 준비 예정입니다.
                          </TD>
                        )}
                        {subsDeliver.DELIVERY_STATUS === "상품준비중" && (
                          <TD colSpan={4}>
                            결제가 승인되어{" "}
                            <strong>배송을 준비하고 있습니다.</strong>
                            <br />곧 배송이 시작됩니다.
                          </TD>
                        )}
                        {subsDeliver.DELIVERY_STATUS === "배송중" && (
                          <TD colSpan={4}>
                            고객님의 정기구독 상품을{" "}
                            <strong>배송중입니다.</strong>
                            <br />
                            택배사의 사정에 따라 배송 지연이 있을 수 있습니다.
                          </TD>
                        )}
                        {subsDeliver.DELIVERY_STATUS === "배송완료" && (
                          <TD colSpan={4}>
                            1회차 정기구독 상품이{" "}
                            <strong>배송 완료되었습니다.</strong>
                            <br />
                            감사합니다.
                          </TD>
                        )}
                      </tr>
                    </tbody>
                  </TABLE>

{/* 구독내역 여부에 따라 다른 렌더링 */}
  {
    subsVO.SUB_NO > 0 ?
    <>

                  <P_SMALL>1회차 정기구독 요약</P_SMALL>
                  <table>
                    <colgroup>
                      <col style={{ width: "15%" }} />
                      <col style={{ width: "85%" }} />
                    </colgroup>

                    <tbody>
                      <tr>
                        <th>결제일</th>
                        <td>{subsDeliver.ORDER_DATE}</td>
                      </tr>
                      <tr>
                        <th>발송일</th>
                        <td>{subsDeliver.DELIVERY_DATE === true ? subsDeliver.DELIVERY_DATE : "업데이트 예정"}</td>
                      </tr>
                      <tr>
                        <th>결제금액</th>
                        <td>{subsVO.MD_PRICE}원</td>
                      </tr>
                      <tr>
                        <th>구성</th>
                        <td>{subsVO.MD_NAME}&nbsp;({subsVO.MD_CONTENT})</td>
                      </tr>
                      <tr>
                        <th>배송지</th>
                        <td>
                          {subsVO.MEMBER_ADDRESS},&nbsp;
                          {subsVO.MEMBER_ADDRESS_DETAIL}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <br />
                  <br />

                  <P_SMALL>다음 정기구독 현황</P_SMALL>
                  <table>
                    <colgroup>
                      <col style={{ width: "30%" }} />
                      <col style={{ width: "40%" }} />
                      <col style={{ width: "20%" }} />
                    </colgroup>

                    <tbody>
                      <tr>
                        <th>
                          <br />
                          &nbsp; 2회차 정기구독 결제일
                          <br />
                          &nbsp;
                        </th>
                        <td>
                          <h5><strong>
                            {subsVO.SUB_PERIOD === 28 ? setDate1() 
                              : subsVO.SUB_PERIOD === 56 ? setDate2() 
                                : subsVO.SUB_PERIOD === 84 ? setDate3() : "해지상태 입니다"
                            }
                          </strong></h5>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <br />
                          &nbsp; 2회차 정기구독 월경주기 (배송주기)
                          <br />
                          &nbsp;
                        </th>
                        <td>
                          <h5><strong>{subsVO.SUB_PERIOD}일 주기</strong></h5>
                        </td>
                        <td>
                          <BROWN_BTN onClick={handleShow1}>배송주기 변경</BROWN_BTN>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <br />
                  <br />

                  <P_SMALL>결제 정보</P_SMALL>
                  <table>
                    <colgroup>
                      <col style={{ width: "20%" }} />
                      <col style={{ width: "50%" }} />
                      <col style={{ width: "20%" }} />
                    </colgroup>

                    <tbody>
                      <tr>
                        <th>
                          <br />
                          &nbsp; 결제수단
                          <br />
                          &nbsp;
                        </th>
                        <td>카카오페이 정기결제({subsPurchase.PURCHASE_METHOD})</td>
                        <td>
                          <BROWN_BTN>변경</BROWN_BTN>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <br />
                  <br />

                  <table>
                    <colgroup>
                      <col style={{ width: "80%" }} />
                      <col style={{ width: "20%" }} />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>
                          정기구독 일시정지 &nbsp; &nbsp; {subsVO.SUB_END !== "0" ? `( 일시정지 접수 완료 - `+subsVO.SUB_END+` )` : null}
                        </th>
                        <th>
                          <BROWN_BTN onClick={handleShow2}>정지</BROWN_BTN>
                        </th>
                      </tr>
                      {
                        subsVO.SUB_END !== "0"
                        ?
                        <>
                          <tr>
                            <td>
                              <div className="alert alert-danger mt-3" id="event-alert">
                                <span style={{ fontWeight: "600", marginRight:"30px" }}>
                                  정기구독이 일시정지 상태입니다.
                                </span>
                                <Button variant="outline-danger" onClick={cancelPause}>취소하기</Button>
                              </div>
                            </td>
                          </tr>
                        </>
                        :
                        null
                      }
                    </tbody>
                  </table>
                  

                  <br />
                  <br />

                  <table>
                    <colgroup>
                      <col style={{ width: "80%" }} />
                      <col style={{ width: "20%" }} />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>정기구독 해지</th>
                        <th>
                          <BROWN_BTN onClick={handleShow3}>해지</BROWN_BTN>
                        </th>
                      </tr>
                        {
                          subsVO.SUB_PERIOD === 0 ?
                          <>
                            <tr>
                              <td>
                                <div className="alert alert-danger mt-3" id="event-alert">
                                  <span style={{ fontWeight: "600", marginRight:"30px" }}>
                                    정기구독 해지 신청이 접수되었습니다.
                                  </span>
                                  <Button variant="outline-danger" onClick={cancelClose}>취소하기</Button>
                                </div>
                              </td>
                            </tr>
                          </>
                          : null
                        }
                    </tbody>
                  </table>
    </>
    : 
    <div className="d-flex justify-content-center">
      <h4 style={{fontWeight: "600"}}>정기구독 내역이 없습니다</h4>
    </div>
  }

              <br />
              <br />
              <br />
            </div>{" "}
            {/* end of list-wrapper */}
          </div>{" "}
          {/* end of col */}
        </CONTENTS>
      </div>{" "}
      {/* end of container */}
      <Footer />


{/* ========[[[배송주기 수정 모달 시작]]]======= */}
<Modal show={show1} onHide={handleClose1} size="md">
        <Modal.Header closeButton>
        <Modal.Title className="m_title">월경주기 (배송주기) 변경</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        {/* ##########################[[Form 전송 update]]########################### */}
        <form id="f_board" onSubmit={periodUpdate}>
          
          <Container>
            <Form.Group className="mb-4 mt-3">
              <Form.Label className="m_title">적용중인 월경주기 (배송주기)</Form.Label>
              <Form.Control
                  type="text" name="sub_period" id="sub_period" size="md"
                  defaultValue={subsVO.SUB_PERIOD+`일 주기`} disabled readOnly />
            </Form.Group>

            
            <Form.Group className="mb-5">
              <Form.Label className="m_title">월경주기 (배송주기) 변경</Form.Label>
              <Form.Select aria-label="Default select example" size="md"
                            id="sub_period" name="sub_period" onChange={onChange}>
                  <option>선택해주세요</option>
                  <option value="28">1주기마다 (28일마다)</option>
                  <option value="56">2주기마다 (56일마다)</option>
                  <option value="84">3주기마다 (84일마다)</option>
                </Form.Select>
            </Form.Group>

          </Container>
          
          <div className="d-flex justify-content-end" style={{ marginBottom:"20px" }}>
            <BROWN_BTN type="submit">
              저장
            </BROWN_BTN>
          </div>
        </form>
        {/* ############################################################# */}
        </Modal.Body>
      </Modal>
      {/* ========[[[ 모달 끝]]]======= */}



{/* ========[[[일시정지 모달 시작]]]======= */}
<Modal show={show2} onHide={handleClose2} size="md">
        <Modal.Header closeButton>
        <Modal.Title className="m_title">일시정지</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        {/* ##########################[[Form 전송 update]]########################### */}
        <form id="f_board" onSubmit={pauseUpdate}>
          
          <Container>
            <Form.Group className="mb-4 mt-3">
              <P_STRONG>정기구독을 잠시 쉬고 싶으신가요?</P_STRONG>
              <br />
              <span className="foot-span">
                일시정지는 정기구독 구성과 내역, 결제정보, 주소지 정보가<br/>
                그대로 유지되어 다시 시작하기 편리합니다.<br/> 
                일시정지를 풀기 전까지는 자동 결제되지 않습니다.
              </span>
            </Form.Group>

            <br />

            <Form.Group className="mb-5">
              <Form.Label className="m_title">일시정지 사유</Form.Label>
              <Form.Select aria-label="Default select example" size="md"
                            id="sub_pause" name="sub_pause" onChange={onChange}>
                  <option>일시정지 하는 이유</option>
                  <option value="1">임신으로 당분간 필요치 않습니다.</option>
                  <option value="2">긴 여행 혹은 해외로 떠나요.</option>
                  <option value="3">월경 주기가 불규칙 합니다.</option>
                  <option value="4">피임약을 복용합니다.</option>
                  <option value="5">생리대가 많이 남아있습니다.</option>
                  <option value="6">기타</option>
                </Form.Select>
            </Form.Group>

          </Container>
          
          <div className="d-flex justify-content-end" style={{ marginBottom:"20px" }}>
            <BROWN_BTN type="submit">
              저장
            </BROWN_BTN>
          </div>
        </form>
        {/* ############################################################# */}
        </Modal.Body>
      </Modal>
      {/* ========[[[ 모달 끝]]]======= */}



  {/* ========[[[구독해지 모달 시작]]]======= */}
  <Modal show={show3} onHide={handleClose3} size="lg">
        <Modal.Header closeButton>
        <Modal.Title className="m_title">일시정지</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <form id="f_board" onSubmit={closeUpdate}>
          <Container>
            <Form.Group className="mb-4 mt-3">
              <P_SMALL>
                '월간;문'의 구독서비스를 이용해 주셔서 감사합니다.<br/>
                다시 이용해 주신다면 언제든 환영입니다. 아래에서 정기구독 해지를 완료하세요.
              </P_SMALL>
              <br />
              <span className="foot-span">
                &nbsp;&nbsp;◾ 서비스는 현 결제 주기의 마지막 날에 해지됩니다.<br/>
                &nbsp;&nbsp;◾ 언제든지 다시 구독서비스를 시작하세요. 해지 후 10개월 이내에 구독을 다시 시작하시면<br/> 
                &nbsp;&nbsp;&nbsp;&nbsp;회원님의 구독 관련 정보와 혜택이 그대로 유지됩니다.
              </span>
            </Form.Group>

            <br />

          </Container>
          
          <div className="d-flex justify-content-center" style={{ margin:"0 10px 30px 10px" }}>
            <BROWN_BTN2 type="submit">
              해지 신청
            </BROWN_BTN2>
            <BROWN_BTN2 onClick={() => {navigate("/");}}>
              정기구독 둘러보기
            </BROWN_BTN2>
          </div>
        </form>
        {/* ############################################################# */}
        </Modal.Body>
      </Modal>
      {/* ========[[[ 모달 끝]]]======= */}





    </>
  );
};

export default Subscription;
