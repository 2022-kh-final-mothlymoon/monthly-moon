import { Link } from "react-router-dom";
import styled from "styled-components";

/* 전체를 감싸는 div */
export const LDIV = styled.div`
  width: 45%;
  margin: 2rem auto;
  padding: 3.5rem 2.5rem;
  border: 0px;
  background-color: #f8eedc;
  border-radius: 1rem;
  text-align: center;
`;

export const LDIVV = styled.div`
  width: 45%;
  margin: 2rem auto;
  padding: 4rem 3rem;
  border: 0px;
  background-color: #f8eedc;
  border-radius: 1rem;
`;

export const LSPAN = styled.span`
  border-bottom: 4px solid #5e514d;
  font-size: 2.3rem;
  font-weight: 700;
  margin: 0;
  padding: 20px 140px;
  color: #5e514d;
`;
export const LSPAN2 = styled.span`
  border-bottom: 4px solid #5e514d;
  font-size: 1.7rem;
  font-weight: 700;
  margin: 0;
  padding: 20px 140px;
  color: #5e514d;
`;

/* text,input 요소들을 감싸는 div */
export const LDIV2 = styled.div`
  width: 100%;
  margin: 1.5rem auto;
`;

export const LDIV3 = styled.div`
  width: 100%
  margin: 0 auto;
  text-align: center;
`;

export const LDIV4 = styled.div`
  margin-top: 0.5rem;
`;

/* input 스타일 */
export const LINPUT = styled.input`
  width: 50%;
  height: 33%;
  margin-top: 3.6rem;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 0.1rem solid gray;
  background: transparent;
  outline: none;
`;

export const CHKDIV = styled.div`
  width: 100%;
  margin: 1.2rem;
`;

export const CHKINPUT = styled.input`
  margin-right: 0.5rem;
`;

export const VALIDDIV = styled.div`
  width: 50%;
  color: #a63838;
  margin: 0.5em auto;
  text-align: left;
`;

export const LOGINBTN = styled.button`
  width: 65%;
  height: 56px;
  margin: 0.2rem auto;
  background: #5e514d;
  font-size: 1.25em;
  border: 0px;
  color: #fafafa;
  font-weight: 600;
  border-radius: 0.3rem;
  cursor: pointer;
  &:hover:not([disabled]) {
    color: #f8eedc;
  }
`;

export const LOGINDIV = styled.div`
  width: 80%;
  margin: 1rem auto 0;
  display: grid;
`;

export const BORDERDIV = styled.div`
  border-top: 0.1px solid gray;
  border-right: none;
  border-left: none;
  border-bottom: none;
  color: gray;
  width: 50%;
  margin: 2.5rem auto 0;
  padding: 1em 0 0.4em 0;
`;

export const SOCIALBTN = styled.img`
  width: 70%;
  height: 56px;
  margin: 0.5rem;
  cursor: pointer;
`;

export const SOCIALDIV = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export const REGISTERLINK = styled(Link)`
  text-decoration: none;
  margin: 0 3rem;
  color: black;
  &:hover {
    color: #b29d82;
  }
`;

export const LJOIN = styled.div`
  background: transparent;
  color: #5e514d;
  border: 2px solid #5e514d;
  margin: 2rem auto;
  border-radius: 28px;
  height: inherit;
  width: 55%;
  padding: 12px 50px;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #b29d82;
  }
`;
