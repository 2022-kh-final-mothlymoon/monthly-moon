package kh.sellermoon.member.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import kh.sellermoon.member.logic.OrderDetailLogic;

@RestController
@RequestMapping("/*")
public class RestOrderDetailController {
	Logger logger = LoggerFactory.getLogger(RestOrderDetailController.class);

	@Autowired
	private OrderDetailLogic orderdetailLogic = null;

	
	@GetMapping("jsonOrderDetailList")
	public String jsonOrderDetailList(Model model, @RequestParam Map<String, Object> pMap) {
		logger.info("jsonOrderDetailList 호출 성공");
		List<Map<String, Object>> orderdetailList = null;
		orderdetailList = orderdetailLogic.orderDetailList(pMap);
		logger.info(orderdetailList + "");
		String temp = null;
		Gson g = new Gson();
		temp = g.toJson(orderdetailList);
		return temp;
	}

	@GetMapping("jsonOrderDetailList2")
	public String jsonOrderDetailList2(Model model, @RequestParam Map<String, Object> pMap) {
		logger.info("jsonOrderDetailList2 호출 성공");
		List<Map<String, Object>> orderdetailList2 = null;
		orderdetailList2 = orderdetailLogic.orderDetailList2(pMap);
		logger.info(orderdetailList2 + "");
		String temp = null;
		Gson g = new Gson();
		temp = g.toJson(orderdetailList2);
		return temp;
	}
	
	// 현황 취소로 배송정보 업데이트
	@PostMapping("deliUpdate")
	public String deliUpdate(@RequestBody Map<String, Object> pMap) {
		logger.info("pointUpdate 호출 성공");
		int result = 0;
		result = orderdetailLogic.deliUpdate(pMap);
		return String.valueOf(result);
	}
	
	// 현황 취소로 오더정보 업데이트
	@PostMapping("cancelUpdate")
	public String cancelUpdate(@RequestBody Map<String, Object> pMap) {
		logger.info("cancelUpdate 호출 성공");
		int result = 0;
		result = orderdetailLogic.cancelUpdate(pMap);
		return String.valueOf(result);
	}
}
