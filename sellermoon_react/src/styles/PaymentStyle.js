import styled from "styled-components";

export const FORM = styled.form`
  padding: 20px 10px;
  border-bottom: 2px solid #b29d82;
`

export const POINTSUM = styled.span`
  padding: 0 10px;
  font-weight: 600;
`

export const ORDER_WRAPPER = styled.div`
  padding: 20px 20px;
  border-left: 2px solid #b29d82;
`

export const ORDER_UL = styled.ul`
overflow-y: auto;
min-height: 210px;
max-height: 410px;
padding-bottom: 20px;
margin: 0;
`

export const ORDER_LI = styled.li`
position: relative;
margin: 20px 0px 0px;
display: flex;
list-style: none;
`

export const ORDER_SPAN = styled.span`
position: absolute;
    top: 2px;
    left: 190px;
    display: block;
    font-size: 17px;
    font-weight: 600;
    color: rgb(0, 0, 0);
    text-decoration: underline;
    z-index: 1;
`

export const ORDER_FLEX = styled.div`
position: relative;
margin: 20px 0px 0px;
display: flex;
`

export const ORDER_IMG = styled.img`
flex-shrink: 0;
    margin-right: 20px;
    width: 170px;
    height: 170px;
    object-fit: cover;
    order: 0;
    vertical-align: top;
`

export const ORDER_H3 = styled.h3`
padding: 33px 0px 7px;
    font-size: 20px;
    line-height: 22px;
    font-weight: 600;
    overflow-wrap: break-word;
    margin:0;
`

export const ORDER_P1 = styled.p`
color: rgb(255, 72, 0);
font-weight: 600;
font-size: 15px;
`

export const ORDER_P2 = styled.p`
color: rgb(255, 72, 0);
font-weight: 700;
font-size: 30px;
margin: 20px 30px 0 130px;
`

export const ORDER_NUM1 = styled.span`
color: rgb(51, 51, 51);
font-size: 16px;
margin: 20px 30px 0 30px;
`

export const ORDER_NUM2 = styled.span`
color: rgb(51, 51, 51);
font-weight: 600;
font-size: 18px;
margin: 20px 30px 0 150px;
`

export const ORDER_CHECK = styled.input`
width: 22px;
height: 22px;
margin: 0 6px 8px 25px;
`
export const ORDER_CHECKS = styled.span`
color: rgb(160, 160, 160);
font-weight: 500;
font-size: 14px;
margin: 0 0 8px 5px;
`

export const ORDER_BTN = styled.button`
width: 250px;
height: 60px;
color: #fafafa;
background-color: #5e514d;
border: none;
margin : 30px 15px 0 15px;
font-weight : 600;
font-size : 23px;
`

/* 마이페이지 주문배송조회 */
export const ORDER_MLI = styled.li`
position: relative;
margin: 20px 0px 0px;
display: flex;
list-style: none;
`

export const ORDER_MSPAN = styled.span`
position: absolute;
top: 1px;
    left: 230px;
    display: block;
    font-size: 15px;
    font-weight: 600;
    color: rgb(0, 0, 0);
    text-decoration: underline;
    z-index: 1;
`

export const ORDER_MTYPE = styled.span`
position: absolute;
top: -1px;
left: 140px;
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #fafafa;
    z-index: 1;
    background-color: #00b8d4;
    border-radius: 20px;
    padding: 3px 10px;
`

export const ORDER_MIMG = styled.img`
flex-shrink: 0;
    margin-right: 20px;
    width: 120px;
    height: 120px;
    object-fit: cover;
    order: 0;
    vertical-align: top;
`

export const ORDER_MP1 = styled.p`
padding: 36px 0px 7px;
    font-size: 17.5px;
    line-height: 26px;
    font-weight: 700;
    overflow-wrap: break-word;
    margin:0;
    text-align: left;
`

export const ORDER_MP2 = styled.p`
color: rgb(255, 72, 0);
font-weight: 600;
font-size: 14px;
text-align: left;
`
