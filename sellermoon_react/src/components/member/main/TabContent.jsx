import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import data from './../../../data';
import { TABTITLE } from './../../../styles/MainStyle';
import TabCards from './TabCards';


const TabContent = () => {

  let [ tab, setTab ] = useState(0); // 0이면 0번째 내용 보이게, 1이면 1번째 내용 ...
  let [fade, setFade] = useState('')
  let [padset, setPadset] = useState(data)

  useEffect(() => {
  // fade 변수 자리에 claaName 'end'를 탈부착 (css)
  // 부착만 하면 안되고, 뗐다가 부착해야 애니메이션이 보임
  // 따라서 cleanUp Function + setTimeout 사용하기!
  setTimeout(() => {
    setFade('end');
  }, 100) // 0.1 초뒤에 실행

  // useEffect 실행 전에 실행됨
  return () => {
    setFade('');
    }
  }, [tab])


  return (
    <>
    
      <Nav fill variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">
            <TABTITLE>정기구독</TABTITLE>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">
            <TABTITLE>인기상품</TABTITLE>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">
            <TABTITLE>신제품</TABTITLE>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(3)}} eventKey="link3">
            <TABTITLE>체험팩</TABTITLE>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className={`start ${fade}`}>
        {/* tab state가 0이면, 첫번째 div보여주고, 1이면 두번째 div보여줌... */}
        {[
        
        <div className="container">
          <div className="row">
            {
              padset.map(function(data, i){
                //console.log(padset[i].type);
                if(padset[i].type === "padset")
                return <TabCards padset={padset[i]} key={i} />
              })
            }
          </div>
        </div>,

        <div className="container">
          <div className="row">
            {
              padset.map(function(data, i){
                //console.log(padset[i].type);
                if(padset[i].type === "popular")
                return <TabCards padset={padset[i]} key={i} />
              })
            }
          </div>
        </div>,

        <div className="container">
          <div className="row">
            {
              padset.map(function(data, i){
                //console.log(padset[i].type);
                if(padset[i].type === "new")
                return <TabCards padset={padset[i]} key={i} />
              })
            }
          </div>
        </div>,

        <div className="container">
          <div className="row">
            {
              padset.map(function(data, i){
                //console.log(padset[i].type);
                if(padset[i].type === "experience")
                return <TabCards padset={padset[i]} key={i} />
              })
            }
          </div>
        </div>,
        
        ][tab]}
      </div>

    </>
  );
};

export default TabContent;