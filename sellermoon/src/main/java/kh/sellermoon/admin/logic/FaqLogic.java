package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.FaqDao;

@Service
public class FaqLogic {
	Logger logger = LogManager.getLogger(FaqLogic.class);
	
	@Autowired
	private FaqDao faqDao = null;
	
	public List<Map<String, Object>> faqList(Map<String, Object> pMap) {
		logger.info("faqList 호출 성공");
		List<Map<String, Object>> faqList = null;
		faqList = faqDao.faqList(pMap);
		return faqList;
	}


	public int faqUpdate(Map<String, Object> pMap) {
		logger.info("faqUpdate 호출 성공");
		int result = 0;
		result = faqDao.faqUpdate(pMap);
		return result;
	}

	public int faqDelete(Map<String, Object> pMap) {
		logger.info("faqDelete 호출 성공");
		int result = 0;
		result = faqDao.faqDelete(pMap);
		return result;
	}

	public List<Map<String, Object>> faqDetail(Map<String, Object> pMap) {
		logger.info("faqDetail 호출 성공");
		List<Map<String,Object>> faqList = null;
		faqList = faqDao.faqList(pMap);
		if(faqList!=null && faqList.size()==1) {
			faqDao.viewCount(pMap);
		}
		return faqList; 
	}


	public int faqInsert(Map<String, Object> pMap) {
		int result = 0;
		result = faqDao.faqInsert(pMap);
		return result;
	}



}
