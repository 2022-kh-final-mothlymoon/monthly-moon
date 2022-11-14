package kh.sellermoon.admin.dao;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.mybatis.spring.SqlSessionTemplate;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PointDao {
	Logger logger = LogManager.getLogger(PointDao.class);
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	public List<Map<String, Object>> pointList(Map<String, Object> pMap) {
		logger.info(pMap.get("point_no"));
		List<Map<String, Object>> pointList = null;
		pointList = sqlSessionTemplate.selectList("pointList",pMap);
	      logger.info("pMap : "+pMap);
	      return pointList;
	}

	
	public int pointUpdate(Map<String, Object> pMap) {
		logger.info("pointUpdate 호출 성공");
		int result = 0;
	    try {
	    	result = sqlSessionTemplate.update("pointUpdate",pMap);
	    	logger.info("result : "+result);
		} catch (Exception e) {
			logger.info("Exception : "+e.toString());
		}
		return result;
	}

	public int pointDelete(Map<String, Object> pMap) {
		logger.info("pointDelete 호출 성공");
		int result = 0;
		try {
			result = sqlSessionTemplate.delete("pointDelete",pMap);
			logger.info("result : "+result);
		} catch (Exception e) {
			logger.info("Exception : "+e.toString());
		}	
		return result;
	}


	public int pointInsert(Map<String, Object> pMap) {
		int result = 0;
	    result = sqlSessionTemplate.update("pointInsert",pMap);
		return result;
	}


	public Map<String, Object> myPoint(Map<String, Object> pMap) {
		logger.info(pMap.get("member_no"));
		Map<String, Object> myPoint = null;
		myPoint = sqlSessionTemplate.selectOne("myPoint",pMap);
	      logger.info("pMap : "+pMap);
	      return myPoint;
	}

}
