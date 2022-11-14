package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.NoticeDao;

@Service
public class NoticeLogic {
	Logger logger = LogManager.getLogger(NoticeLogic.class);
	
	@Autowired
	private NoticeDao noticeDao = null;
	
	public List<Map<String, Object>> noticeList(Map<String, Object> pMap) {
		logger.info("NoticeList 호출 성공");
		List<Map<String, Object>> noticeList = null;
		noticeList = noticeDao.noticeList(pMap);
		return noticeList;
	}

	public int noticeInsert(Map<String, Object> pMap) {
		logger.info("noticeInsert 호출 성공 : "+pMap);
		int result = 0;
		result = noticeDao.noticeInsert(pMap);
		return result;
	}

	public int noticeUpdate(Map<String, Object> pMap) {
		logger.info("noticeUpdate 호출 성공");
		int result = 0;
		result = noticeDao.noticeUpdate(pMap);
		return result;
	}

	public int noticeDelete(Map<String, Object> pMap) {
		logger.info("noticeDelete 호출 성공");
		int result = 0;
		result = noticeDao.noticeDelete(pMap);
		return result;
	}

	public List<Map<String, Object>> noticeDetail(Map<String, Object> pMap) {
		logger.info("noticeDetail 호출 성공");
		List<Map<String,Object>> noticeList = null;
		noticeList = noticeDao.noticeList(pMap);
		if(noticeList!=null && noticeList.size()==1) {
			noticeDao.hitCount(pMap);
		}
		return noticeList; 
	}



}
