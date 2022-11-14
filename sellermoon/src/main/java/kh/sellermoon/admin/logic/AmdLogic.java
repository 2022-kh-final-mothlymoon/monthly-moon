package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.AmdDao;
import kh.sellermoon.admin.dao.StoreDao;
@Service
public class AmdLogic {
	Logger logger = LogManager.getLogger(AmdLogic.class);
	@Autowired
private AmdDao amdDao =null;
	public List<Map<String, Object>> amdList(Map<String, Object> pMap) {
		logger.info("storeList Logic 호출 성공");
		List<Map<String, Object>> amdList = null;
		amdList = amdDao.amdList(pMap);
	      return amdList;
	}
	public int amdInsert(Map<String, Object> pMap) {
		logger.info("amdInsert Logic 호출 성공");
		int result = 0;
		result = amdDao.amdInsert(pMap);
		return result;
	}
	public int amdDelete(Map<String, Object> pMap) {
		int result = 0;
		result = amdDao.amdDelete(pMap);
		return result;
	}
	public List<Map<String, Object>> amdDetail(Map<String, Object> pMap) {
		logger.info("amdDetail Logic 호출 성공");
		List<Map<String,Object>> amdList = null;
		amdList = amdDao.amdDetail(pMap);
		return amdList;
	}
	public int amdUpdate(Map<String, Object> pMap) {
		logger.info("amdUpdate Logic 호출 성공");
		int result = 0;
		result = amdDao.amdUpdate(pMap);
		return result;
	}

}
