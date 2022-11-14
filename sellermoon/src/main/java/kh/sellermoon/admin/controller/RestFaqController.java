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

import kh.sellermoon.admin.logic.FaqLogic;

@RestController
@RequestMapping("/faq/*")
public class RestFaqController {
	Logger logger = LogManager.getLogger(RestFaqController.class);
	
	@Autowired
	private FaqLogic faqLogic = null;
	
	@GetMapping("faqlist")
	public String FaqList(Model model, @RequestParam Map<String, Object> pMap) {
      logger.info("FaqList 호출 성공");
      
      List<Map<String, Object>> faqList = null;
      faqList = faqLogic.faqList(pMap);
      logger.info(faqList);
      String temp = null;
      Gson g = new Gson();
      temp = g.toJson(faqList);
      return temp;
   }
	
	@ResponseBody
	@PostMapping("faqinsert")
	public String faqInsert(@RequestBody Map<String, Object> pMap) {
	   logger.info(pMap);
	   int result = 0;
	   result = faqLogic.faqInsert(pMap);
	   return ""+result; // 문자열 붙이면 String 타입으로 형전환
	}   
	
	
	@PostMapping("faqupdate")
	public String faqUpdate(@RequestBody Map<String,Object> pMap) {
		logger.info("faqUpdate 호출 성공");
		int result = 0;
		result = faqLogic.faqUpdate(pMap);
		return String.valueOf(result);
	}
	
	
	@GetMapping("faqdelete")
	public Object faqDelete(@RequestParam Map<String,Object> pMap) {
		logger.info("faqDelete 호출 성공");
		int result = 0;
		result = faqLogic.faqDelete(pMap);
		return String.valueOf(result);
	}
	
	@GetMapping("faqdetail")
	public String faqDetail(Model model, @RequestParam Map<String,Object> pMap) {
		logger.info("faqdetail 호출 성공");
		List<Map<String,Object>> faqList = null;
		faqList = faqLogic.faqDetail(pMap);
		model.addAttribute("faqList",faqList);
		return String.valueOf(faqList);
	}	
}
