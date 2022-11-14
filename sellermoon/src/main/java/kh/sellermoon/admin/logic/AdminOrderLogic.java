package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.AdminOrderDao;


@Service
public class AdminOrderLogic {
	Logger logger = LoggerFactory.getLogger(AdminOrderLogic.class);
	@Autowired
	private AdminOrderDao orderDao = null;

	public List<Map<String, Object>> orderList(Map<String, Object> pMap) {
		logger.info("주문 정보 호출 성공");
		List<Map<String,Object>> orderList = null;
		orderList = orderDao.orderList(pMap);
		return orderList;
	}

}
