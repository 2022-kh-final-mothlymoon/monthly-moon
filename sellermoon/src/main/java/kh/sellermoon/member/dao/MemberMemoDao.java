package kh.sellermoon.member.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

/*
	<<회원>> MemoDao
 */
@Service
public class MemberMemoDao {
	Logger logger = LoggerFactory.getLogger(MemberMemoDao.class);

	@Autowired(required=false)
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	// [[[[[[[[[[ 회원 받은 쪽지 중 읽지 않은 쪽지 수 확인 (읽지 않은 쪽지 : n통) ]]]]]]]]]]
	public int noReadMemo(Map<String, Object> pMap) {
		logger.info("member : noReadMemo 호출 성공 ==> " + pMap); // pMap 안에 받는 사람이 있어야한다.
		int cnt = 0;
		cnt = sqlSessionTemplate.selectOne("noReadMemo", pMap); // 안읽은 쪽지의 숫자를 확인하는건지? 아니면 안읽은 쪽지만 확인하는거라 selectOne?
		logger.info("member : cnt ==> " + cnt); // 배달 사고가 어디서 발생한건지 체크하기 위한 중간 확인 코드 !
		return cnt;
	}
	
	// [[[[[[[[[[[ 전체 쪽지 조회 ]]]]]]]]]]]
	public List<Map<String, Object>> memoList(Map<String, Object> pMap) {
		logger.info("member : memoList 호출 성공 ==> " + pMap);
		List<Map<String, Object>> memoList = null;
		memoList = sqlSessionTemplate.selectList("memoList", pMap);
		logger.info(memoList.toString());
		return memoList;
	}
	
	// [[[[[[[[[[ 회원 받은 쪽지함 ]]]]]]]]]]
	public List<Map<String, Object>> receiveMemoList(Map<String, Object> pMap) {
		logger.info("member : receiveMemoList 호출 성공 ==> " + pMap);
		List<Map<String, Object>> receiveMemoList = null;
		receiveMemoList = sqlSessionTemplate.selectList("receiveMemoList", pMap);
		logger.info(receiveMemoList.toString());
		return receiveMemoList;
	}
	
	// [[[[[[[[[[ 회원 보낸 쪽지함 ]]]]]]]]]]
	public List<Map<String, Object>> sendMemoList(Map<String, Object> pMap) {
		logger.info("member : sendMemoList 호출 성공 ==> " + pMap);
		List<Map<String, Object>> receiveMemoList = null;
		receiveMemoList = sqlSessionTemplate.selectList("sendMemoList", pMap);
		logger.info(receiveMemoList.toString());
		return receiveMemoList;
	}
	
	// [[[[[[[[[[ 회원 받은 쪽지 클릭 시 읽음 여부 갱신 ]]]]]]]]]]
	public int memoUpdate(Map<String, Object> pMap) {
		logger.info("member : memoUpdate 호출 성공 ===> " + pMap);
		int result = 0;
		try {			
			result = sqlSessionTemplate.update("memoUpdate", pMap);
			logger.info("result : " + result);
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
	
	// [[[[[[[[[[ 회원 쪽지 작성 ]]]]]]]]]]
	public int memoInsert(Map<String, Object> pMap) {
		logger.info("member : memoInsert 호출 성공 ==> "+ pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.update("memoInsert", pMap);
			logger.info("result : " + result);
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// [[[[[[[[[[ 회원 받은/보낸 쪽지 삭제 ]]]]]]]]]]
	public int memoDelete(Map<String, Object> pMap) {
		logger.info("member : memoDelete 호출 성공 ==> " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.delete("memoDelete", pMap);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
}
