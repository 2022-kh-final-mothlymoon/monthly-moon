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
	<<<관리자>>> ReplyDao (해당하는 글 번호의 댓글 전체 읽기 / 블라인드 삭제)
 */
@Service
public class AdminReplyDao {
	Logger logger = LoggerFactory.getLogger(AdminReplyDao.class);
	
	@Autowired(required = false)
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	// [[[[[[[[[[ 관리자 댓글 전체 조회 (board_no에 걸쳐있는 댓글 전체)  ]]]]]]]]]]
	public List<Map<String, Object>> replyList(Map<String, Object> pMap) {
		logger.info("admin : pMap => " + pMap);
		List<Map<String, Object>> replyList = null;
		try {
			replyList = sqlSessionTemplate.selectList("replyList", pMap);
		} catch(DataAccessException e) {
			logger.info("Exception : "  + e.toString());
		}
		return replyList;
	}
	
	// [[[[[[[[[[ 관리자 댓글 수정 (블라인드) ]]]]]]]]]]
	public int replyUpdate(Map<String, Object> pMap) {
		logger.info("admin : pMap => " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.update("replyAUpdate", pMap);
			logger.info("result : " + result);
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
	
	// [[[[[[[[[[ 관리자 댓글 삭제 (한 건) ]]]]]]]]]]
	public int replyDelete(Map<String, Object> pMap) {
		logger.info("admin : pMap => " + pMap);
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
