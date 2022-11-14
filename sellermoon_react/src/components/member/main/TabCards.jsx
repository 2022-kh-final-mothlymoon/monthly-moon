import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { CARDDIV, BEST, CARDIMG } from '../../../styles/MainStyle';

const TabCards = (props) => {

  let result = props.padset

  return (
    <>
      
      <div className="col-lg-4">
          <Link to="/">
            <CARDDIV>
              <BEST>best</BEST>
              <CARDIMG src={result.img} alt="img"/>
            </CARDDIV>
          </Link>

        <div style={{padding:"0px 10px"}}>
          <p onClick={()=>{ Navigate('/store')}}
              style={{ fontWeight:"700", fontSize:"21px" }}>
            { result.title }
          </p>

          <p style={{marginBottom:"5px", padding:"0"}}> { result.content }</p>

          <p style={{ fontWeight:"500", fontSize:"19px" }}> { result.price }</p>

        </div>
      </div>

    </>
  );
};

export default TabCards;