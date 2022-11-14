package kh.sellermoon.member.logic;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.dao.OrderDao;

@Service
public class OrderLogic {
	Logger logger = LogManager.getLogger(OrderLogic.class);
	
	@Autowired
	private OrderDao orderDao = null;

	public List<Map<String, Object>> myOrder(Map<String, Object> pMap) {
		logger.info("myOrder 호출 성공");
		List<Map<String, Object>> myOrder = null;
		myOrder = orderDao.myOrder(pMap);
		return myOrder;
	}

}
