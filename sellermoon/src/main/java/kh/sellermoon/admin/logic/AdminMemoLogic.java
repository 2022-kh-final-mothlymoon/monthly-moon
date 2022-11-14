package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.AdminMemoDao;

/*
	<<<관리자>>> MemoLogic
*/
@Service
public class AdminMemoLogic {
	Logger logger = LoggerFactory.getLogger(AdminMemoLogic.class);
	
	@Autowired(required = false)
	private AdminMemoDao memoDao = null;
	
	// [[[[[[[[[[ 관리자 보낸 매세지 전체 조회 ]]]]]]]]]]
	public List<Map<String, Object>> sendMemoList(Map<String, Object> pMap) {
		logger.info("sendMemoList 호출 성공");
		List<Map<String, Object>> sendMemoList = null;
		sendMemoList = memoDao.sendMemoList(pMap);
		return sendMemoList;
	}
	
	// [[[[[[[[[[ 관리자 보낸 매세지 상세 조회 (제목 클릭 시 모달) ]]]]]]]]]]
	public Map<String, Object> sendMemoDetail(Map<String, Object> pMap) {
		logger.info("sendMemoDetail 호출 성공");
		Map<String, Object> sendMemoDetail = null;
		sendMemoDetail = memoDao.sendMemoDetail(pMap);
		return sendMemoDetail;
	}

	// [[[[[[[[[[ 관리자 메세지 작성 (전체 회원에게 보내기) ]]]]]]]]]]
	public int sendMemoInsert(Map<String, Object> pMap) {
		logger.info("sendMemoInsert 호출 성공");
		int result = 0;
		result = memoDao.sendMemoInsert(pMap);
		return result;
	}
}
