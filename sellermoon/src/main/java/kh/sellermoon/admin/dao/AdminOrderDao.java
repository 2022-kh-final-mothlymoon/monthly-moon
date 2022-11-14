package kh.sellermoon.admin.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminOrderDao {
	Logger logger = LoggerFactory.getLogger(AdminOrderDao.class);
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;

	public List<Map<String, Object>> orderList(Map<String, Object> pMap) {
		logger.info("주문 정보 호출 성공");
		List<Map<String,Object>> orderList = null;
		orderList = sqlSessionTemplate.selectList("adminOrder",pMap);
		return orderList;
	}

}
