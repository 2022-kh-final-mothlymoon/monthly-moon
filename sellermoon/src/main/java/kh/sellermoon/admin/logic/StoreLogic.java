package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.StoreDao;
@Service
public class StoreLogic {
	Logger logger = LogManager.getLogger(StoreLogic.class);
	@Autowired
private StoreDao storeDao =null;
	public List<Map<String, Object>> storeList(Map<String, Object> pMap) {
		logger.info("storeList Logic 호출 성공");
		List<Map<String, Object>> storeList = null;
		storeList = storeDao.storeList(pMap);
	      return storeList;
	}
	public int storeInsert(Map<String, Object> pMap) {
		logger.info("storeInsert Logic 호출 성공");
		int result = 0;
		result = storeDao.storeInsert(pMap);
		return result;
	}
//	public int storeDelete(Map<String, Object> pMap) {
//		int result = 0;
//		result = storeDao.storeDelete(pMap);
//		return result;
//	}
	public List<Map<String, Object>> storeDetail(Map<String, Object> pMap) {
		logger.info("storeDetail Logic 호출 성공");
		List<Map<String,Object>> storeList = null;
		storeList = storeDao.storeDetail(pMap);
		return storeList;
	}
	public int storeUpdate(Map<String, Object> pMap) {
		logger.info("storeUpdate Logic 호출 성공");
		int result = 0;
		result = storeDao.storeUpdate(pMap);
		return result;
	}

}
