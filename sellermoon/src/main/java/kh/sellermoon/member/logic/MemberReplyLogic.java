package kh.sellermoon.member.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.dao.MemberReplyDao;

/*
	<<<회원>>> ReplyLogic
*/
@Service
public class MemberReplyLogic {
	Logger logger = LoggerFactory.getLogger(MemberReplyLogic.class);

	@Autowired(required = false)
	private MemberReplyDao replyDao = null;
	
	// [[[[[[[[[[ 회원 댓글 조회 (해당하는 게시글에 대한 댓글) ]]]]]]]]]]
	public List<Map<String, Object>> replyList(Map<String, Object> pMap) {
		logger.info("member : replyList 호출 성공");
		List<Map<String, Object>> replyList = null;
		replyList = replyDao.replyList(pMap);
		return replyList;
	}
	
	// [[[[[[[[[[ 회원 댓글 작성 ]]]]]]]]]]
	public int replyInsert(Map<String, Object> pMap) {
		logger.info("member : replyInsert 호출 성공");
		int result = 0;
		result = replyDao.replyInsert(pMap);
		return result;
	}

	// [[[[[[[[[[ 회원 댓글 수정 ]]]]]]]]]]
	public int replyUpdate(Map<String, Object> pMap) {
		logger.info("member : replyUpdate 호출 성공");
		int result = 0;
		result = replyDao.replyUpdate(pMap);
		return result;
	}

	// [[[[[[[[[[ 회원 댓글 삭제 ]]]]]]]]]]
	public int replyDelete(Map<String, Object> pMap) {
		logger.info("member : replyDelete 호출 성공");
		int result = 0;
		result = replyDao.replyDelete(pMap);
		return result;
	}


}
