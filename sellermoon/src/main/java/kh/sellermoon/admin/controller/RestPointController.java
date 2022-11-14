package kh.sellermoon.admin.controller;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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

import kh.sellermoon.admin.logic.PointLogic;

@RestController
@RequestMapping("/point/*")
public class RestPointController {
	Logger logger = LogManager.getLogger(RestPointController.class);
	
	@Autowired
	private PointLogic pointLogic = null;
	
	@GetMapping("pointlist")
	public String PointList(Model model, @RequestParam Map<String, Object> pMap) {
      logger.info("PointList 호출 성공");
      
      List<Map<String, Object>> pointList = null;
      pointList = pointLogic.pointList(pMap);
      logger.info(pointList);
      String temp = null;
      Gson g = new Gson();
      temp = g.toJson(pointList);
      return temp;
   }
	
	@GetMapping("mypoint")
	public String myPoint(Model model, @RequestParam Map<String, Object> pMap) {
		logger.info("myPoint 호출 성공");
		
		Map<String, Object> myPoint = null;
		myPoint = pointLogic.myPoint(pMap);
		logger.info(myPoint);
		String temp = null;
		Gson g = new Gson();
		temp = g.toJson(myPoint);
		return temp;
	}
	
	
	
	@ResponseBody
	@PostMapping("pointinsert")
	public String pointInsert(@RequestBody Map<String, Object> pMap) {
	   logger.info(pMap);
	   int result = 0;
	   result = pointLogic.pointInsert(pMap);
	   return ""+result; // 문자열 붙이면 String 타입으로 형전환
	}   
	
	
	@PostMapping("pointupdate")
	public String pointUpdate(@RequestBody Map<String,Object> pMap) {
		logger.info("pointUpdate 호출 성공");
		int result = 0;
		result = pointLogic.pointUpdate(pMap);
		return String.valueOf(result);
	}
	
	
	@GetMapping("pointdelete")
	public Object pointDelete(@RequestParam Map<String,Object> pMap) {
		logger.info("pointDelete 호출 성공");
		int result = 0;
		result = pointLogic.pointDelete(pMap);
		return String.valueOf(result);
	}
	
}