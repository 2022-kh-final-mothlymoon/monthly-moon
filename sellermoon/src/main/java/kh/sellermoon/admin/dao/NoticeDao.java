package kh.sellermoon.admin.dao;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.mybatis.spring.SqlSessionTemplate;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class NoticeDao {
	Logger logger = LogManager.getLogger(NoticeDao.class);
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	public List<Map<String, Object>> noticeList(Map<String, Object> pMap) {
		logger.info(pMap.get("notice_no"));
		List<Map<String, Object>> noticeList = null;
		noticeList = sqlSessionTemplate.selectList("noticeList",pMap);
	      logger.info("pMap : "+pMap);
	      return noticeList;
	}

	public int noticeInsert(Map<String, Object> pMap) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("noticeInsert",pMap);
			logger.info("result : "+result);
		} catch (Exception e) {
			logger.info("Exception : "+e.toString());
		} 	
		return result;
	}

	public int noticeUpdate(Map<String, Object> pMap) {
		logger.info("noticeUpdate 호출 성공");
		int result = 0;
	    try {
	    	result = sqlSessionTemplate.update("noticeUpdate",pMap);
	    	logger.info("result : "+result);
		} catch (Exception e) {
			logger.info("Exception : "+e.toString());
		}
		return result;
	}

	public int noticeDelete(Map<String, Object> pMap) {
		logger.info("noticeDelete 호출 성공");
		int result = 0;
		try {
			result = sqlSessionTemplate.delete("noticeDelete",pMap);
			logger.info("result : "+result);
		} catch (Exception e) {
			logger.info("Exception : "+e.toString());
		}	
		return result;
	}

	public int hitCount(Map<String, Object> pMap) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("hitCount",pMap);
			logger.info("result : "+result);
		} catch (Exception e) {
			logger.info("Exception : "+e.toString());
		}	
		return result;
	}

}

