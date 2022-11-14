package kh.sellermoon.admin.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import kh.sellermoon.admin.logic.AdminOrderLogic;

@RestController
@RequestMapping("/admin/*")
public class RestAdminOrderController {
	Logger logger = LoggerFactory.getLogger(RestAdminOrderController.class);
	@Autowired
	private AdminOrderLogic orderLogic = null;
	
	// 관리자 단에서 주문 정보보기
		@PostMapping("order")
		public String orderList(@RequestParam Map<String, Object> pMap) {
			logger.info("주문 정보 호출 성공");
			String temp = null;
			List<Map<String,Object>> orderList = null;
			orderList = orderLogic.orderList(pMap);
			Gson g = new Gson();
			temp = g.toJson(orderList);
			return temp;
		}
	

}
