package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.AdminReplyDao;

/*
	<<<관리자>>> ReplyLogic
*/
@Service
public class AdminReplyLogic {
	Logger logger = LoggerFactory.getLogger(AdminReplyLogic.class);
	
	@Autowired(required = false)
	private AdminReplyDao replyDao = null;

	// [[[[[[[[[[ 관리자 댓글 전체 조회 (해당하는 글 번호의 댓글 전체 ]]]]]]]]]]
	public List<Map<String, Object>> replyList(Map<String, Object> pMap) {
		logger.info("replyList 호출 성공");
		List<Map<String, Object>> replyList = null;
		replyList = replyDao.replyList(pMap);
		return replyList;
	}

	// [[[[[[[[[[ 관리자 댓글 수정 (블라인드) ]]]]]]]]]]
	public int replyUpdate(Map<String, Object> pMap) {
		logger.info("replyUpdate 호출 성공");
		int result = 0;
		result = replyDao.replyUpdate(pMap);
		return result;
	}

	// [[[[[[[[[[ 관리자 댓글 삭제 (한 건) ]]]]]]]]]]
	public int replyDelete(Map<String, Object> pMap) {
		logger.info("replyDelete 호출 성공");
		int result = 0;
		result = replyDao.replyDelete(pMap);
		return result;
	}

}
