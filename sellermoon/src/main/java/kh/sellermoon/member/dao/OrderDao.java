package kh.sellermoon.member.dao;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDao {
	Logger logger = LogManager.getLogger(OrderDao.class);
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;

	public List<Map<String, Object>> myOrder(Map<String, Object> pMap) {
		logger.info(pMap.get("member_no"));
		List<Map<String, Object>> myOrder = null;
		myOrder = sqlSessionTemplate.selectList("myOrder",pMap);
	      logger.info("pMap : "+pMap);
	      return myOrder;
	}

}
