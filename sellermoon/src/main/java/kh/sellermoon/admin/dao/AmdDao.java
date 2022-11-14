package kh.sellermoon.admin.dao;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AmdDao {
	Logger logger = LogManager.getLogger(AmdDao.class);
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;

	public List<Map<String, Object>> amdList(Map<String, Object> pMap) {
		logger.info("amdList DAO 호출 성공");
		logger.info(pMap.get("MD_NO"));
		List<Map<String, Object>> amdList = null;
		amdList = sqlSessionTemplate.selectList("amdList", pMap);
		logger.info("pMap : " + pMap);
		return amdList;
	}

	public List<Map<String, Object>> amdDetail(Map<String, Object> pMap) {
		logger.info("amdDetail DAO 호출 성공");
		logger.info(pMap.get("MD_NO"));
		List<Map<String, Object>> amdList = null;
		amdList = sqlSessionTemplate.selectList("amdDetail", pMap);
		logger.info("pMap : " + pMap);
		return amdList;
	}

	public int amdInsert(Map<String, Object> pMap) {
		logger.info("amdInsert DAO 호출 성공");
		int result = 0;
		result = sqlSessionTemplate.update("amdInsert", pMap);
		logger.info("pMap : " + pMap);
		return result;
	}

	public int amdDelete(Map<String, Object> pMap) {
		int result = 0;
		try {
			result = sqlSessionTemplate.delete("amdDelete", pMap);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	public int amdUpdate(Map<String, Object> pMap) {
		logger.info("amdUpdate DAO 호출 성공");
		logger.info(pMap.get("MD_NO"));
		logger.info(pMap.get("MD_NAME"));
		int result = 0;
		try {

			result = sqlSessionTemplate.update("amdUpdate", pMap);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

}
