package kh.sellermoon.member.controller;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import kh.sellermoon.member.logic.OrderLogic;

@RestController
@RequestMapping("/order/*")
public class RestOrderController {
	Logger logger = LogManager.getLogger(RestOrderController.class);
	
	@Autowired
	private OrderLogic orderLogic = null;
	
	@GetMapping("myorder")
	public String MyOrder(Model model, @RequestParam Map<String, Object> pMap) {
      logger.info("myOrder 호출 성공");
      
      List<Map<String, Object>> myOrder = null;
      myOrder = orderLogic.myOrder(pMap);
      logger.info(myOrder);
      String temp = null;
      Gson g = new Gson();
      temp = g.toJson(myOrder);
      return temp;
   }
	
	
}
