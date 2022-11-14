import React, { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CHAT_CONTAINER,
  CHAT_WRAPPER2,
  CHAT_FORM,
  PROFILE_PHOTO,
  MSG_LI_FRIEND,
  MSG_LI_MINE,
  MSG_UL,
  MSG_FRIEND,
  MSG_MINE,
  MSG_COL,
  MSG_TIME1,
  MSG_TIME2,
  MSG_NAME,
  CHAT_TITLE,
  GOHOME,
  SEND_CONTAINER,
  SEND_INPUT,
} from "./../../../styles/ChatStyle";
import { Link } from "react-router-dom";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FS_APIKEY,
  authDomain: process.env.REACT_APP_FS_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FS_DATABASEURL,
  projectId: process.env.REACT_APP_FS_PROJECTID,
  storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FS_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FS_APPID,
};

const firebaseApp = initializeApp(firebaseConfig);

const database = getDatabase();

const ChatMessage = ({ authLogic }) => {
  const userId = window.localStorage.getItem("userId");
  const userName = window.localStorage.getItem("userName");
  const userPhoto = window.localStorage.getItem("userPhoto");
  console.log("userUid===>" + userId);
  console.log("userName===>" + userName);
  console.log("photoURL===>" + userPhoto);

  const formRef = useRef(); // html 노드 접근시 사용함

  const msgRef = useRef();

  const userIdRef = useRef();

  // 클라우드 리얼데이터베이스 서버 정보 동기화 처리
  // 메시지 전송 시 객체로 넘겼으므로 초기화도 []가 아니라 {}로 해야 함
  const [messages, setMessages] = useState({});

  // 사용자가 입력한 메세지 담기
  const [message, setMessage] = useState({
    m_no: 0,
    userId: "",
    userName: "",
    msg: "",
    curtime: "",
    userPhoto: "",
  });

  const setClock = () => {
    const date = new Date();
    const hour = ("0" + date.getHours()).slice(-2);
    const min = ("0" + date.getMinutes()).slice(-2);
    const sec = ("0" + date.getSeconds()).slice(-2);

    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const curtime = year + "-" + month + "-" + day + " " + hour + ":" + min;
    return curtime;
  };

  useEffect(() => {
    console.log(database);
    setMessage({ ...message, curtime: setClock() });
    const starCountRef = ref(database, "talk");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(data);
    });
  }, []);

  const send = (e) => {
    if (e.key === "Enter") {
      // submit 속성 사용 시 반드시 아래코드 추가할 것! - 버블링 방지
      e.preventDefault();

      // 사용자가 입력해서 제출하고 나면 폼 리셋되도록 해줌
      formRef.current.reset();
      set(ref(database, "talk/" + message.m_no), message);
    }
  };

  // send 전송버튼 클릭 이벤트 (if문 제외)
  const handleSend = (e) => {
    // submit 속성 사용 시 반드시 아래코드 추가할 것! - 버블링 방지
    e.preventDefault();

    // 사용자가 입력해서 제출하고 나면 폼 리셋되도록 해줌
    formRef.current.reset();
    set(ref(database, "talk/" + message.m_no), message);
  };

  const handleChangeForm = (e) => {
    if (e.currentTarget == null) return;
    //console.log("폼 내용 변경 발생 name : "+e.target.name);
    //console.log("폼 내용 변경 발생 value : "+e.target.value);

    setMessage({
      ...message,
      userId: userId,
      userName: userName,
      userPhoto: userPhoto,
      curtime: setClock(),
      m_no: Date.now(),
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <CHAT_CONTAINER>
        <CHAT_WRAPPER2>
          <div
            className="d-flex justify-content-end"
            style={{ position: "relative", margin: "10px 10px" }}
          >
            <Link to="/">
              <GOHOME>
                <i className="fa-solid fa-house"></i>
              </GOHOME>
            </Link>
            <CHAT_TITLE> {userName}님의 1:1 채팅</CHAT_TITLE>
            <PROFILE_PHOTO src={userPhoto} alt="userPhoto" />
          </div>

          <hr />

          <div>
            <MSG_UL>
              {" "}
              {/* 삼항연산자로 상대방의 말풍선과 나의 말풍선 구분 */}
              {messages &&
                Object.keys(messages).map((key) =>
                  messages[key].userId === userId ? (
                    <>
                      <MSG_LI_MINE key={key}>
                        <MSG_TIME2>
                          {messages[key].dateStr}&nbsp;{messages[key].curtime}
                        </MSG_TIME2>
                        <MSG_COL>
                          <MSG_MINE>{messages[key].msg}</MSG_MINE>
                        </MSG_COL>
                      </MSG_LI_MINE>
                    </>
                  ) : (
                    <>
                      <MSG_LI_FRIEND key={key}>
                        <PROFILE_PHOTO
                          src={messages[key].userPhoto}
                          alt="userPhoto"
                        />
                        <MSG_COL>
                          <MSG_NAME>{messages[key].userName}</MSG_NAME>
                          <MSG_FRIEND>{messages[key].msg}</MSG_FRIEND>
                        </MSG_COL>
                        <MSG_TIME1>
                          {messages[key].dateStr}&nbsp;{messages[key].curtime}
                        </MSG_TIME1>
                      </MSG_LI_FRIEND>
                    </>
                  )
                )}
            </MSG_UL>
          </div>

          <CHAT_FORM ref={formRef}>
            <input
              type="hidden"
              ref={userIdRef}
              name="userId"
              onChange={handleChangeForm} //////
            />
            <SEND_CONTAINER>
              <SEND_INPUT
                className="search-input"
                type="text"
                ref={msgRef}
                name="msg"
                placeholder="메세지를 입력하세요"
                aria-label="Username"
                onKeyDown={send}
                onChange={handleChangeForm}
              />
              <Button onClick={handleSend} id="nav-icon">
                <i className="fa-regular fa-paper-plane"></i>
              </Button>
            </SEND_CONTAINER>
          </CHAT_FORM>
        </CHAT_WRAPPER2>
      </CHAT_CONTAINER>
    </>
  );
};

export default ChatMessage;
