package kh.sellermoon.admin.dao;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.mybatis.spring.SqlSessionTemplate;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class FaqDao {
	Logger logger = LogManager.getLogger(FaqDao.class);
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	public List<Map<String, Object>> faqList(Map<String, Object> pMap) {
		logger.info(pMap.get("faq_no"));
		List<Map<String, Object>> faqList = null;
		faqList = sqlSessionTemplate.selectList("faqList",pMap);
	      logger.info("pMap : "+pMap);
	      return faqList;
	}


	public int faqUpdate(Map<String, Object> pMap) {
		logger.info("faqUpdate 호출 성공");
		int result = 0;
	    try {
	    	result = sqlSessionTemplate.update("faqUpdate",pMap);
	    	logger.info("result : "+result);
		} catch (Exception e) {
			logger.info("Exception : "+e.toString());
		}
		return result;
	}

	public int faqDelete(Map<String, Object> pMap) {
		logger.info("faqDelete 호출 성공");
		int result = 0;
		try {
			result = sqlSessionTemplate.delete("faqDelete",pMap);
			logger.info("result : "+result);
		} catch (Exception e) {
			logger.info("Exception : "+e.toString());
		}	
		return result;
	}

	public int viewCount(Map<String, Object> pMap) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("viewCount",pMap);
			logger.info("result : "+result);
		} catch (Exception e) {
			logger.info("Exception : "+e.toString());
		}	
		return result;
	}


	public int faqInsert(Map<String, Object> pMap) {
		int result = 0;
	    result = sqlSessionTemplate.update("faqInsert",pMap);
		return result;
	}

}

