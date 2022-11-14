import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Navbar, Container, Button, Nav, Form } from 'react-bootstrap';
import { BEST, CARDIMG, CARDDIV } from '../../../styles/MainStyle';

const TabCards = (props) => {

  let result = props.padset

  return (
    <>
      <div className="col-md-4">
        <Link to="/">
          <CARDDIV>
            <BEST>best</BEST>
            <CARDIMG src={result.img} alt="img"/>
          </CARDDIV>
        </Link>
        <h5 onClick={()=>{ Navigate('/store')}}>
          { result.title }
        </h5>
        <p> { result.content }</p>
        <h5> { result.price }</h5>
      </div>

    </>
  );
};

export default TabCards;