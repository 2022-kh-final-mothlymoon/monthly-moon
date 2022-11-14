package kh.sellermoon.admin.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

/*
	<<<관리자>>> MemoDao
*/
@Service
public class AdminMemoDao {
	Logger logger = LoggerFactory.getLogger(AdminMemoDao.class);
	
	@Autowired(required = false)
	private SqlSessionTemplate sqlSessionTemplate = null;

	// [[[[[[[[[[ 관리자 보낸 쪽지 전체 조회 ]]]]]]]]]]
	public List<Map<String, Object>> sendMemoList(Map<String, Object> pMap) {
		logger.info("admin sendMemoList : pMap => " + pMap);
		List<Map<String, Object>> sendMemoList = null;
		try {
			sendMemoList = sqlSessionTemplate.selectList("sendMemoList", pMap);
			logger.info("memoList : " + sendMemoList);
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return sendMemoList;
	}

	// [[[[[[[[[[ 관리자 쪽지 상세 조회 (클릭하면 상세조회 모달) ]]]]]]]]]]
	public Map<String, Object> sendMemoDetail(Map<String, Object> pMap) {
		logger.info("admin sendMemoDetail : pMap => " + pMap);
		Map<String, Object> sendMemoDetail = null;
		try {
			sendMemoDetail = sqlSessionTemplate.selectOne("memoList", pMap);
			logger.info("memoDetail : " + sendMemoDetail);
		} catch(DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return sendMemoDetail;
	}

	// [[[[[[[[[[ 관리자 쪽지 입력 (회원에게 메세지 전송) ]]]]]]]]]]
	public int sendMemoInsert(Map<String, Object> pMap) {
		logger.info("admin sendMemoInsert : pMap => " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.update("sendMemoAInsert", pMap);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
}
