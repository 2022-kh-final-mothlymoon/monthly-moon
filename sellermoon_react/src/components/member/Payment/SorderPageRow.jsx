import React from 'react';
import { ORDER_IMG, ORDER_P1, ORDER_SPAN } from '../../../styles/PaymentStyle';
import { ORDER_H3, ORDER_LI } from '../../../styles/PaymentStyle';

const SorderPageRow = (props) => {

  return (
    <>
      <ORDER_LI>
        <ORDER_SPAN>{props.pay.MD_BRAND}</ORDER_SPAN>
        <div className="d-flex">
          <ORDER_IMG src={props.pay.MD_IMAGE_URL} alt="orderimg" />
          <div>
            <ORDER_H3>{props.pay.MD_NAME}</ORDER_H3>
            <ORDER_P1>{props.pay.MD_PRICE.toLocaleString()}원 / 수량 {props.pay.CART_QUANTITY}개</ORDER_P1>
          </div>
        </div>
      </ORDER_LI>
    </>
  );
};

export default SorderPageRow;