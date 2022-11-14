import styled from "styled-components"

export const MYUL = styled.ul `
  width: 100%;
  border-radius: 5px;
  background: #5e514d;
  overflow: hidden;
  list-style: none;
  height: 150px;
  padding: 28px 15px;
  margin-bottom: 60px;
`

export const MYLI1 = styled.li `
  position: relative;
  width: 40%;
  float: left;
  text-align: left;
  margin: 0;
  padding: 75px 0px 15px;
`

export const MYLI2 = styled.li `
  position: relative;
  width: 30%;
  float: left;
  text-align: left;
  margin: 0x;
  padding: 75px 20px 20px;
  border-left: 1px solid #a0a0a0; /* 왼쪽에 구분선 */
  height: 80px;
`

export const MYSPAN = styled.span `
  display: inline-block;
  position: absolute;
  top: 5px;
  left: 21px;
  font-size: 1rem;
  font-weight: 600;
  color: #a0a0a0;
`

export const MYP = styled.p `
  display: inline-block;
  position: absolute;
  top: 60px;
  left: 20px;
  font-size: 1.7rem;
  font-weight: 600;
  color: #fff;
  line-height: 1;
`

/* Point */

export const POINT_P = styled.p `
  margin: 60px 0 0;
  font-size: 16px;
  font-weight: 600;
  padding-left: 20px;
`

export const POINT_LI = styled.li `
  position: relative;
  padding-left: 10px;
  font-size: 15px;
  line-height: 32px;
  color: #303033;
`

export const FRIEND_IMG = styled.img `
  width: 60%;
  text-align: center;
  /* max-width: 400px; */
  margin: 20px 0 60px 0;
  padding: 0;
`

export const FRIEND_P = styled.p`
  font-size: 19px;
  font-weight: 600;
  line-height: 5px;
`

export const FRIEND_CODE = styled.input`
  display: block;
  /* margin: 4px 0 20px 0; */
  margin: 0 auto;
  text-align: center;
  padding: 0 50px;
  font-size: 45px;
  font-weight: 700;
  height: 42px;
  line-height: 42px;
  border: none;
  outline: none;
`

export const FRIEND_BTN = styled.button`
  width: 100%;
  max-width: 360px;
  margin-top: 50px;
  font-size: 27px;
  line-height: 26px;
  padding: 35px 20px;
  background-color: #35c5f0;
  border-color: #35c5f0;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: color .1s,background-color .1s,border-color .1s;
  border-radius: 4px;
`
export const FRIEND_ALERT = styled.div`
  width: 100%;
  max-width: 360px;
  margin-top: 10px;
  font-size: 20px;
  line-height: 26px;
  padding: 20px 10px;
  background-color: black;
  color: #fff;
  font-weight: 500;
`

/* ***** */