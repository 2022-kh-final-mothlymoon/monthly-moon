package kh.sellermoon.member.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
	<<<회원>>> ReportDao
*/
@Service
public class MemberReportDao {
	Logger logger = LoggerFactory.getLogger(MemberReportDao.class);
	
	@Autowired(required = false)
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	// [[[[[[[[[[ 회원 게시글 신고 입력 ]]]]]]]]]]
	public int reportBInsert(Map<String, Object> pMap) {
		logger.info("member : pMap => : " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.update("reportBInsert", pMap);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// [[[[[[[[[[ 회원 신고 입력 ]]]]]]]]]]
	public int reportRInsert(Map<String, Object> pMap) {
		logger.info("member : pMap => : " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.update("reportRInsert", pMap);				logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
}
