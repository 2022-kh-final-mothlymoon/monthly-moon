import styled from "styled-components"

export const CONTAINER_TAB = styled.div `
  width: 1020px;
  margin: auto;
  padding-bottom: 5rem;
`
export const SLIDER = styled.div `
  /* 슬라이더가로스크롤바 생기는 문제 */
  overflow: hidden;
  padding-bottom: 7rem; /* 패딩 안주면 dot 버튼 사라짐 */
`
export const SLIDEIMG = styled.img `
  width: 100%;
`

export const CARDDIV = styled.div `
  position: relative;
  margin-top: 20px;
`

export const BEST = styled.span `
  position: absolute;
  display: inline-block;
  width: 48px;
  height: 48px;
  font-size: 15px;
  background: #fff;
  border-radius: 24px;
  border-width: 2px;
  border-style: solid;
  text-align: center;
  font-weight: 700;
  color : #f05a5e;
  line-height: 44px;
  top: 40px;
  left: 20px;
`

export const CARDIMG = styled.img `
  max-width: 80%;
  max-height: 80%;
`

export const TABTITLE = styled.span `
  color: rgb(51, 51, 51);
  font-weight: 600;
  font-size: 18px;
`



export const BANNER_FIRST = styled.div `
  width: 100%;
  background-color: #F8EEDC;

`

export const BANNER_SECOND = styled.div `
  width: 100%;
  background-color: #F6E7D7;
`

export const BANNER_IMG = styled.img `
  width: 100%;
  max-width: 400px;
  margin-top: 50px;
`

export const BANNER_P = styled.p `
  margin-top: 30px;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 700;
  color: #5e514d;
`

export const BANNER_P2 = styled.p `
font-size: 16px;
line-height: 1.5;
font-weight: 400;
`