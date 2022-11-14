/*global kakao*/ 
import React from 'react';
import { useEffect } from 'react';

const KakaoMap = () => {

  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.499002, 127.032910),
      level: 3
    };

    var map = new kakao.maps.Map(container, options);
    var markerPosition  = new kakao.maps.LatLng(37.499002, 127.032910); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
  });
  marker.setMap(map);

    }, [])

  return (
    <>
      <div id="map" style={{ width: "500px", height: "300px"}}></div>
    </>
  );
};

export default KakaoMap;
