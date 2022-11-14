package kh.sellermoon.member.logic;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.dao.MemberReportDao;

/*
	<<<회원>>> ReportLogic
*/
@Service
public class MemberReportLogic {
	Logger logger = LoggerFactory.getLogger(MemberReportLogic.class);

	@Autowired(required = false)
	private MemberReportDao reportDao = null;
	
	// [[[[[[[[[[ 회원 게시글 신고 작성 ]]]]]]]]]]
	public int reportBInsert(Map<String, Object> pMap) {
		logger.info("member : reportBInsert 호출 성공");
		int result = 0;
		logger.info(pMap.toString());
		result = reportDao.reportBInsert(pMap);
		return result;
	}
	
	// [[[[[[[[[[ 회원 댓글 신고 작성 ]]]]]]]]]]
	public int reportRInsert(Map<String, Object> pMap) {
		logger.info("member : reportRInsert 호출 성공");
		int result = 0;
		result = reportDao.reportRInsert(pMap);
		return result;
	}
}
