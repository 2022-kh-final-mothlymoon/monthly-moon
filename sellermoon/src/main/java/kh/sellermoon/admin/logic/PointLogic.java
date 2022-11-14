package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.PointDao;

@Service
public class PointLogic {
	Logger logger = LogManager.getLogger(PointLogic.class);
	
	@Autowired
	private PointDao pointDao = null;
	
	public List<Map<String, Object>> pointList(Map<String, Object> pMap) {
		logger.info("pointList 호출 성공");
		List<Map<String, Object>> pointList = null;
		pointList = pointDao.pointList(pMap);
		return pointList;
	}
	
	public int pointUpdate(Map<String, Object> pMap) {
		logger.info("pointUpdate 호출 성공");
		int result = 0;
		result = pointDao.pointUpdate(pMap);
		return result;
	}

	public int pointDelete(Map<String, Object> pMap) {
		logger.info("pointDelete 호출 성공");
		int result = 0;
		result = pointDao.pointDelete(pMap);
		return result;
	}


	public int pointInsert(Map<String, Object> pMap) {
		int result = 0;
		result = pointDao.pointInsert(pMap);
		return result;
	}

	public Map<String, Object> myPoint(Map<String, Object> pMap) {
		logger.info("myPoint 호출 성공");
		Map<String, Object> myPoint = null;
		myPoint = pointDao.myPoint(pMap);
		return myPoint;
	}

	
}
