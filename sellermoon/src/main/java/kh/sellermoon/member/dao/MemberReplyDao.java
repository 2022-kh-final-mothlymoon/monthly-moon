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
	<<<회원>>> ReplyDao
*/
@Service
public class MemberReplyDao {
	Logger logger = LoggerFactory.getLogger(MemberReplyDao.class);
	
	@Autowired(required = false)
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	// [[[[[[[[[[ 회원 댓글 조회 (해당하는 게시글의 댓글 조회) ]]]]]]]]]]
	public List<Map<String, Object>> replyList(Map<String, Object> pMap) {
		logger.info("member : pMap => " + pMap);
		List<Map<String, Object>> replyList = null;
		try {
			replyList = sqlSessionTemplate.selectList("replyList");
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return replyList;
	}

	// [[[[[[[[[[ 회원 댓글 입력 ]]]]]]]]]]
	public int replyInsert(Map<String, Object> pMap) {
		logger.info("member : pMap => " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.update("replyMInsert", pMap);
			logger.info("result : " + result);
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// [[[[[[[[[[ 회원 댓글 수정 ]]]]]]]]]]
	public int replyUpdate(Map<String, Object> pMap) {
		logger.info("member : pMap => " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.update("replyMUpdate", pMap);
			logger.info("result : " + result);
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// [[[[[[[[[[ 회원 댓글 삭제 ]]]]]]]]]]
	public int replyDelete(Map<String, Object> pMap) {
		logger.info("member : pMap => " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.delete("replyDelete", pMap);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

}
