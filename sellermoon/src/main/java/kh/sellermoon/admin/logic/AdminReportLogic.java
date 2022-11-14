package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.AdminReportDao;


/*
	<<<관리자>>> ReportLogic
*/
@Service
public class AdminReportLogic {
	Logger logger = LoggerFactory.getLogger(AdminReportLogic.class);
	
	@Autowired(required = false)
	private AdminReportDao reportDao = null;

	// [[[[[[[[[[ 관리자 게시글 신고 내역 전체 조회 ]]]]]]]]]]
	public List<Map<String, Object>> reportBoardList(Map<String, Object> pMap) {
		logger.info("admin : replyBoardList 호출 성공");
		List<Map<String, Object>> reportBoardList = null;
		reportBoardList = reportDao.reportBoardList(pMap);
		return reportBoardList;
	}
	
	// [[[[[[[[[[ 관리자 댓글 신고 내역 전체 조회 ]]]]]]]]]]
	public List<Map<String, Object>> reportReplyList(Map<String, Object> pMap) {
		logger.info("admin : reportReplyList 호출 성공");
		List<Map<String, Object>> reportReplyList = null;
		reportReplyList = reportDao.reportReplyList(pMap);
		return reportReplyList;
	}
}
