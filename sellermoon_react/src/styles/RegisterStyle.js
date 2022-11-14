import styled from "styled-components";

/* 전체를 감싸는 div */
export const RDIV = styled.div`
  width: 50%;
  margin: 2rem auto;
  padding: 2.5rem;
  border: 0px;
  background-color: #f8eedc;
  border-radius: 1rem;
`;

/* label,input, button 요소들을 감싸는 div */
export const RDIV2 = styled.div`
  width: 100%;
  margin: 1.5rem auto 0;
  display: flex;
  justify-content: space-between;
`;

/* form 감싸는 div */
export const RDIV3 = styled.div`
  width: 100%
  margin: 0 auto;
  padding: 1.5rem 3rem;
  border-bottom: 3px solid #5e514d;
`;

export const RTEXTDIV = styled.div`
  font-size: 1.2rem;
  margin-right: 3rem;
`;

export const RTEXTDIV2 = styled.div`
  font-size: 1.2rem;
  margin-right: 5rem;
`;

/* input 스타일 */
export const RINPUT = styled.input`
  width: 50%;
  height: 35%;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 0.1rem solid gray;
  background: transparent;
  outline: none;
`;

export const RZINPUT = styled.input`
  width: 40%;
  height: 25%;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 0.1rem solid gray;
  background: transparent;
  outline: none;
`;

export const RNDIV = styled.div`
  width: 100%;
  margin: 1.5rem auto;
  display: flex;
`;

/* 회원가입 button 감싸는 div */
export const RBUTTON = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

export const RVALIDDIV = styled.div`
  width: 50%;
  color: #a63838;
  margin: 0 auto;
  text-align: left;
`;
