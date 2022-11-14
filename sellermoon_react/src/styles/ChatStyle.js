import styled from "styled-components";

/* *** Chat 로그인 페이지 *** */

export const CHAT_CHANNEL = styled.p`
  color: rgb(51, 51, 51);
  font-size: 23px;
  padding: 20px 20px 0 20px;
  font-weight: 700;
  margin: 0;
`

export const CHAT_CONTAINER = styled.div`
  box-sizing: border-box;
  margin: 0;
  background-color: #666;
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`

export const CHAT_WRAPPER = styled.div`
  min-width: 550px;
  min-height: 100vh;
  margin: 0;
  padding: 25px;
  background-color: #ffffff;
`

export const CHAT_IMG1 = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 30px;
  border: 1px solid #eadfce;
  cursor: pointer;
`

export const CHAT_NAME = styled.div`
  display: table;
  width: 100%;
  padding: 30px 13px 0 13px;
  box-sizing: border-box;
`

export const CHAT_NAME_P1 = styled.p`
  color: rgb(51, 51, 51);
  font-size: 25px;
  line-height: 21px;
  font-weight: 700;
  margin:0 auto;
`

export const CHAT_NAME_P2 = styled.p`
  font-size: 18px;
  line-height: 40px;
  color: #646262;
`

export const CHAT_NAME_P3 = styled.p`
  color: rgb(51, 51, 51);
  font-size: 18px;
  font-weight: 600;
  padding: 5px 50px;
  margin-top: 20px;
`

export const CHAT_IMG2 = styled.img`
  width: 400px;
  padding: 0;
  margin: 0;
  align-items: center; 
`
export const CHAT_BUTTON1 = styled.p`
color: rgb(51, 51, 51);
font-size: 22px;
line-height: 21px;
font-weight: 600;
margin: 10px 10px;
`

export const CHAT_BUTTON2 = styled.p`
  font-size: 18px;
  line-height: 25px;
  color: #646262;
  margin: 0 10px;
`

export const CHAT_IMG3 = styled.img`
  width: 80px;
  height: 80px;
  margin: 35px 10px 25px 40px;
  padding: 0;
`


/*  flex-direction: column;
  justify-content: center;
  align-items: center; */


/* #####################################################아래부터 Chatroom *** */

export const CHAT_WRAPPER2 = styled.div`
  min-width: 550px;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
`

export const MSG_UL = styled.ul`
  height: 760px;
  overflow-y: scroll;
  padding: 0;
  margin: 0;
`

export const GOHOME = styled.span`
position: absolute;
display: inline-block;
width: 48px;
height: 48px;
font-size: 30px;
color: #5e514d;
top: 4px;
left: 20px;
`

export const CHAT_TITLE = styled.p`
  padding: 0;
  margin: 15px 10px 0 0;
  font-size: 1.07rem;
  font-weight: 700;
`


/************ 상대방 말풍선 왼쪽 **************/
export const MSG_LI_FRIEND = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  padding : 10px 0px;
  list-style: none;
  margin-left: 20px;
  /* justify-content: flex-end; */
`

export const MSG_FRIEND = styled.div`
  background: #eee;
  padding: 10px 15px;
  border-radius: 18px;
  font-size: 1.04rem;
`

/************** 나의 말풍선 오른쪽 *************/
export const MSG_LI_MINE = styled.li`
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  padding : 10px 0px;
  list-style: none;
`

export const MSG_MINE = styled.div`
  background: #ead3b1;
  padding: 10px 15px;
  margin-right: 20px;
  border-radius: 18px;
  font-size: 1.04rem;
`
/* ********************************************** */


export const PROFILE_PHOTO = styled.img`
display: inline-block;
  width: 43px;
  height: 43px;
  margin: 5px 10px 0 0;
  border-radius: 30px;
`

export const MSG_COL = styled.div`
display: flex;
flex-direction: column;
position: relative;
`

export const MSG_TIME1 = styled.span`
align-self: flex-end;
/* flex-basis: 3.75rem; */
flex-shrink: 0;
color: rgb(88, 88, 88);
font-size: 0.8rem;
margin-left: 7px;
`
export const MSG_TIME2 = styled.span`
align-self: flex-end;
flex-shrink: 0;
color: rgb(88, 88, 88);
font-size: 0.8rem;
margin-right: 7px;
`

export const MSG_NAME = styled.span`
font-size: 0.8rem;
font-weight: 600;
margin : 0;
padding : 0 0 5px 0;
`

/* ************메세지 입력창************* */
export const CHAT_FORM = styled.form`
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  border-top: 1px solid #cbc5c5;
`

export const SEND_CONTAINER = styled.div`
  background-color: #ffffff;
  display: flex;
  border: 3px solid #ead3b1;
  width: 420px;
  height: 52px;
  border-radius: 30px;
  margin: 25px 30px 0px 65px;
  padding: 0;
`

export const SEND_INPUT = styled.input`
float: left;
width: 75%;
height: 100%;
padding: 5px;
margin-left: 45px;
border: none;
font-size: 20px;
line-height: 22px;
outline: none;
`

/* ***************************** */