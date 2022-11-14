import React from 'react';
import { FRIEND_ALERT } from '../../../styles/MypageStyle';

const FriendsAlert = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <FRIEND_ALERT>
          친구 초대 코드가 복사되었습니다!
        </FRIEND_ALERT>
      </div>
  </>
  );
};

export default FriendsAlert;