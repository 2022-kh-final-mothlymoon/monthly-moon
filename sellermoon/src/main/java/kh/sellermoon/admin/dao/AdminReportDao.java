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
	<<<관리자>>> ReportDao
*/
@Service
public class AdminReportDao {
	Logger logger = LoggerFactory.getLogger(AdminReportDao.class);

	@Autowired(required = false)
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	// [[[[[[[[[[ 관리자 게시글 신고 내역 전체 조회 ]]]]]]]]]]
	public List<Map<String, Object>> reportBoardList(Map<String, Object> pMap) {
		logger.info("admin reportBoardList : pMap => " + pMap);
		List<Map<String, Object>> reportBoardList = null;
		try {
			reportBoardList = sqlSessionTemplate.selectList("reportBoardList", pMap);
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return reportBoardList;
	}

	// [[[[[[[[[[ 관리자 댓글 신고 내역 전체 조회 ]]]]]]]]]]
	public List<Map<String, Object>> reportReplyList(Map<String, Object> pMap) {
		logger.info("admin reportDetail : pMap => " + pMap);
		List<Map<String, Object>> reportReplyList = null;
		try {
			reportReplyList = sqlSessionTemplate.selectList("reportReplyList", pMap);
		} catch(DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return reportReplyList;
	}

}
