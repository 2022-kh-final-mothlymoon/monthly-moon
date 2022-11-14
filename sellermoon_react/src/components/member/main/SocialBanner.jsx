import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BANNER_FIRST, BANNER_P, BANNER_P2, BANNER_IMG, BANNER_SECOND } from '../../../styles/MainStyle';

const SocialBanner = () => {
  return (
    <>
      <div className="d-flex mt-5">
        <BANNER_FIRST>
          <div style={{ padding: "50px 70px" }}>
            <Row>
              <Col xs={12} md={7}>
                <b style={{color:"#83786F"}}>생리대 지원사업 <i className="fa-solid fa-angle-right"></i></b>
                <BANNER_P>"소녀야, 너는 반짝이는 별"</BANNER_P>
                <BANNER_P2>홀로 낯선 변화를 겪어내는 소녀들의 내일이 <br/> 더욱 반짝일 수 있도록 함께해주세요.</BANNER_P2>
              </Col>
              <Col xs={6} md={5}>
                <a href="https://ad.goodneighbors.kr/girl22/web/gsa/index.html?utm_source=%EA%B5%AC%EA%B8%80PC&utm_medium=cpc&utm_campaign=girl22&utm_content=B1&utm_term=%EA%B5%BF%EB%84%A4%EC%9D%B4%EB%B2%84%EC%8A%A4&gclid=Cj0KCQjwwfiaBhC7ARIsAGvcPe7Vx3rA5rWp8AxwevMLlfgwPFz2abDoTtci9wdXpOzPczgBXvCgGlcaAnl5EALw_wcB">
                  <BANNER_IMG src="https://res.cloudinary.com/drxxdsv01/image/upload/v1667119832/ci_logo_tgh2dp.png" alt="logo" />
                </a>
              </Col>
            </Row>
          </div>
        </BANNER_FIRST>

        <BANNER_SECOND>
          <div style={{ padding: "50px 60px" }}>
            <Row>
                <Col xs={12} md={7}>
                  <b style={{color:"#83786F"}}>파트너쉽 <i className="fa-solid fa-angle-right"></i></b>
                  <br />
                  <BANNER_P>"월간문은 모두의 행복한 월경날을 원합니다."</BANNER_P>
                  <BANNER_P2>소녀가장, 한부모 가정에 여성용품 기부하며 <br/> 지속적으로 힘을 보태고 있습니다.</BANNER_P2>
                </Col>
                <Col xs={6} md={5}>
                  <a href="http://www.hjy.kr/user/index_2.php">
                    <BANNER_IMG src="https://res.cloudinary.com/drxxdsv01/image/upload/v1667119809/signature_t1qohi.png" alt="logo" />
                  </a>
                </Col>
              </Row>
          </div>
        </BANNER_SECOND>
      </div>
    </>
  );
};

export default SocialBanner;