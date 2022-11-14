package kh.sellermoon.member.dao;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.AmdDao;

@Service
public class PaymentDao {
	Logger logger = LogManager.getLogger(PaymentDao.class);
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	public int paymentInsert(Map<String, Object> pMap) {
		logger.info("paymentInsert DAO 호출 성공");
		int result = 0;
		result = sqlSessionTemplate.update("paymentInsert", pMap);
		logger.info("pMap : " + pMap);
		return result;
	}
	
	// 개별구매
	public List<Map<String, Object>> paymentList(Map<String, Object> pMap) {
		logger.info(pMap.get("member_no"));
		List<Map<String, Object>> paymentList = null;
		paymentList = sqlSessionTemplate.selectList("paymentList",pMap);
	    logger.info("pMap : "+pMap);
	      return paymentList;
	}
	
	// 정기구독
	public List<Map<String, Object>> spaymentList(Map<String, Object> pMap) {
		logger.info(pMap.get("member_no"));
		List<Map<String, Object>> spaymentList = null;
		spaymentList = sqlSessionTemplate.selectList("spaymentList",pMap);
	    logger.info("pMap : "+pMap);
	      return spaymentList;
	}

	public Map<String, Object> payTotal(Map<String, Object> pMap) {
		logger.info(pMap.get("member_no"));
		Map<String, Object> payTotal = null;
		payTotal = sqlSessionTemplate.selectOne("payTotal",pMap);
	      logger.info("pMap : "+pMap);
	      return payTotal;
	}

	public Map<String, Object> spayTotal(Map<String, Object> pMap) {
		logger.info(pMap.get("member_no"));
		Map<String, Object> spayTotal = null;
		spayTotal = sqlSessionTemplate.selectOne("spayTotal",pMap);
	      logger.info("pMap : "+pMap);
	      return spayTotal;
	}

	public int requestPay(Map<String, Object> pMap) {
		int result = 0;
	    result = sqlSessionTemplate.update("requestPay",pMap);
		return result;
	}
	
	public int payPointUpdate(Map<String, Object> pMap) {
		logger.info("payPointUpdate 호출 성공");
		int result = 0;
	    try {
	    	result = sqlSessionTemplate.update("payPointUpdate",pMap);
	    	logger.info("result : "+result);
		} catch (Exception e) {
			logger.info("Exception : "+e.toString());
		}
		return result;
	}
	public int spaymentInsert(Map<String, Object> pMap) {
		logger.info("spaymentInsert DAO 호출 성공");
		int result = 0;
		result = sqlSessionTemplate.update("spaymentInsert", pMap);
		logger.info("pMap : " + pMap);
		return result;
	}
	
	
}
