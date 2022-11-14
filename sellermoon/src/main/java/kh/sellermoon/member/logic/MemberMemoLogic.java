package kh.sellermoon.member.logic;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.dao.MemberMemoDao;

@Service
public class MemberMemoLogic {
	Logger logger = LoggerFactory.getLogger(MemberMemoLogic.class);
	
	@Autowired(required = false)
	private MemberMemoDao memoDao = null;
	
	// [[[[[[[[[[ 전체 쪽지 리스트 ]]]]]]]]]]
	public List<Map<String, Object>> memoList(Map<String, Object> pMap) {
		logger.info("member : memoList 호출 성공");
		List<Map<String, Object>> memoList = null;
		memoList = memoDao.memoList(pMap);
		return memoList;
	}
	
	// [[[[[[[[[[ 회원 쪽지 작성 ]]]]]]]]]]
	public int memoInsert(Map<String, Object> pMap) {
		logger.info("member : memoInsert 호출 성공");
		int result = 0;
		result = memoDao.memoInsert(pMap);
		return result;
	}

	// [[[[[[[[[[ 회원 쪽지 읽음 여부 업데이트 ]]]]]]]]]]
	public int memoUpdate(Map<String, Object> pMap) {
		logger.info("member : memoUpdate 호출 성공");
		int result = 0;
		result = memoDao.memoUpdate(pMap);
		return result;
	}
	
	// [[[[[[[[[[ 회원 보낸/받은 쪽지 삭제 ]]]]]]]]]]
	public int memoDelete(Map<String, Object> pMap) {
		logger.info("member : memoDelete 호출 성공");
		int result = 0;
		result = memoDao.memoDelete(pMap);
		return result;
	}

}
