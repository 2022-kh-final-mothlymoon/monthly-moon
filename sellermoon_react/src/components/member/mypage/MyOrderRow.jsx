import React from 'react';
import { OTD1, OTD2, OTD3 } from './../../../styles/SubStyle';
import { ORDER_MLI, ORDER_MSPAN, ORDER_MIMG, ORDER_MP1, ORDER_MP2, ORDER_MTYPE, ORDER_MP3  } from './../../../styles/PaymentStyle';
import { useNavigate } from 'react-router-dom';

const MyOrderRow = (props) => {

  let navigate = useNavigate();

  return (
    <>
      <tr>
        <OTD1 colSpan={3}>
          주문일자 <strong>{props.order.ORDER_DATE}</strong> &nbsp; &nbsp; &nbsp; 
          주문번호 <strong onClick={() => {navigate("/");}} style={{cursor:"pointer"}}>
                    {props.order.ORDER_NO}
                  </strong>
        </OTD1>
      </tr>
      <tr>
        <OTD3>
          <ORDER_MLI>
            <ORDER_MTYPE>{props.order.ORDER_TYPE==="O" ? "개별구매" : "정기구독"}</ORDER_MTYPE>
            <ORDER_MSPAN>{props.order.MD_BRAND}</ORDER_MSPAN>
            <div className="d-flex">
              <ORDER_MIMG src={props.order.MD_IMAGE_URL} alt="orderimg" />
              <div>
                <ORDER_MP1>{props.order.MD_NAME}</ORDER_MP1>
                <ORDER_MP2>
                  [{props.order.MD_DISCOUNT}%]&nbsp;{props.order.MD_PRICE.toLocaleString()}원 / 수량 {props.order.CART_QUANTITY}개
                </ORDER_MP2>
              </div>
            </div>
          </ORDER_MLI>
        </OTD3>
        <OTD3><span style={{fontWeight:"600"}}>{ !props.order.DELIVERY_FEE ? "무료배송" : props.order.DELIVERY_FEE+`원` }</span></OTD3>
        <OTD3><span style={{fontWeight:"700", fontSize:"20px"}}>{ props.order.DELIVERY_STATUS}</span></OTD3>
      </tr>
    </>
  );
};

export default MyOrderRow;