import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginGoogle } from '../../../service/authLogic';
import { CHAT_CONTAINER, CHAT_WRAPPER, CHAT_NAME, CHAT_IMG1, CHAT_IMG2, CHAT_NAME_P1, CHAT_NAME_P2, CHAT_NAME_P3, CHAT_CHANNEL, CHAT_BUTTON1, CHAT_BUTTON2, CHAT_IMG3 } from './../../../styles/ChatStyle';

const ChatLogin = ({ authLogic }) => {
  
  const navigate = useNavigate()
  
  const auth = useSelector((state) => state.auth)
  console.log(auth)

  const googleProvider = useSelector((state) => state.googleProvider)
  console.log(googleProvider)

  const moveTalk = (userId) => {
    window.localStorage.setItem("userId", userId)
    navigate({ pathname: "/chat/chatroom/" + userId })
    //navigate(1);
    //navigate(-1);
  }

  const loginG = async () => {
    try {
      const result = await loginGoogle(auth, googleProvider)
      console.log(result);
      console.log(result.displayName);
      console.log(result.uid)
      window.localStorage.setItem("userId", result.uid)
      window.localStorage.setItem("userName", result.displayName)
      window.localStorage.setItem("userPhoto", result.photoURL)
      moveTalk(result.uid)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = (event) => {
    //로그인 성공 후 넘어온 정보 확인하기
    authLogic
      .login("Google") //
      .then((data) => moveTalk(data.user.uid))
  }

  return (
    <>
      <CHAT_CONTAINER>
        <CHAT_WRAPPER>
          <CHAT_CHANNEL>
            <i className="fa-solid fa-comment-dots"></i>&nbsp;월간문톡채널
          </CHAT_CHANNEL>
          
          <hr />
          
          <div className="d-flex justify-content-center" style={{padding: "10px 20px"}}>
            <CHAT_IMG1 src="https://res.cloudinary.com/drxxdsv01/image/upload/v1667384663/%ED%94%84%EB%A1%9C%ED%95%84%EC%82%AC%EC%A7%84_yxlgzt.png" alt="profile" />
            
            <CHAT_NAME>
              <CHAT_NAME_P1>
                월간;문 (Monthly-Moon) <i className="fa-solid fa-circle-check"></i>
              </CHAT_NAME_P1>
              <CHAT_NAME_P2>친구 50,881</CHAT_NAME_P2>
            </CHAT_NAME>
          </div>

          <div className="d-flex justify-content-left" style={{padding: "10px 35px", color: "#646262"}} >
            <p>쓸수록 건강해지는 월경케어 브랜드<br/>Your Period will be a HappyMoonday!</p>
          </div>

          <hr style={{marginBottom: "40px"}} />

          <div className="d-flex justify-content-center" 
              style={{border: "1px solid #dbdbdb", borderRadius: "15px", cursor:"pointer"}}
              onClick={loginG}>

              <CHAT_IMG3 src="https://res.cloudinary.com/drxxdsv01/image/upload/v1667392670/live-chat_ecsvxp.png" alt="google" />

            <CHAT_NAME>
              <CHAT_BUTTON1>상담원 채팅</CHAT_BUTTON1>
              <CHAT_BUTTON2>간편하게 채팅으로 문의해보세요.<br/>(월-금 10:00 - 18: 00)</CHAT_BUTTON2>
            </CHAT_NAME>
          </div>
            
          <CHAT_NAME_P3>소식 최신</CHAT_NAME_P3>

          <div className="d-flex justify-content-center">
            <CHAT_IMG2 src="https://res.cloudinary.com/drxxdsv01/image/upload/v1667388426/talkcontent_yhejbr.png" alt="content" />
          </div>

        </CHAT_WRAPPER>
      </CHAT_CONTAINER>
    </>
  );
};

export default ChatLogin;