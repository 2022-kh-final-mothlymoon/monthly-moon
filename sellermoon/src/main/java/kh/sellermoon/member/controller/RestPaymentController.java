package kh.sellermoon.member.controller;

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

import kh.sellermoon.member.logic.PaymentLogic;

@RestController
@RequestMapping("/*")
public class RestPaymentController {
	Logger logger = LogManager.getLogger(RestPaymentController.class);
	
	@Autowired
	private PaymentLogic paymentLogic = null;
	//결제정보 넘기기
	@ResponseBody
	@PostMapping("paymentInsert")
	public String RestpaymentInsert(@RequestBody Map<String, Object> pMap) {
		logger.info("RestpaymentInsert 호출 성공");
		logger.info("pMap");
		int result = 0;
		result = paymentLogic.paymentInsert(pMap);
		logger.info(result+"");
	   return ""+result; // 문자열 붙이면 String 타입으로 형전환
	}   
	@PostMapping("spaymentInsert")
	public String RestspaymentInsert(@RequestBody Map<String, Object> pMap) {
		logger.info("RestspaymentInsert 호출 성공");
		logger.info("pMap");
		int result = 0;
		result = paymentLogic.spaymentInsert(pMap);
		logger.info(result+"");
		return ""+result; // 문자열 붙이면 String 타입으로 형전환
	}   
	// 개별구매
		@GetMapping("paymentlist")
		public String paymentList(Model model, @RequestParam Map<String, Object> pMap) {
	      logger.info("paymentList 호출 성공");
	      
	      List<Map<String, Object>> paymentList = null;
	      paymentList = paymentLogic.paymentList(pMap);
	      logger.info(paymentList);
	      String temp = null;
	      Gson g = new Gson();
	      temp = g.toJson(paymentList);
	      return temp;
	   }
		
		// 정기구독
		@GetMapping("spaymentlist")
		public String spaymentList(Model model, @RequestParam Map<String, Object> pMap) {
			logger.info("spaymentList 호출 성공");
			
			List<Map<String, Object>> spaymentList = null;
			spaymentList = paymentLogic.spaymentList(pMap);
			logger.info(spaymentList);
			String temp = null;
			Gson g = new Gson();
			temp = g.toJson(spaymentList);
			return temp;
		}
		
		@GetMapping("paytotal")
		public String payTotal(Model model, @RequestParam Map<String, Object> pMap) {
			logger.info("payTotal 호출 성공");
			
			Map<String, Object> payTotal = null;
			payTotal = paymentLogic.payTotal(pMap);
			logger.info(payTotal);
			String temp = null;
			Gson g = new Gson();
			temp = g.toJson(payTotal);
			return temp;
		}
		
		@GetMapping("spaytotal")
		public String spayTotal(Model model, @RequestParam Map<String, Object> pMap) {
			logger.info("spaytotal 호출 성공");
			
			Map<String, Object> spayTotal = null;
			spayTotal = paymentLogic.spayTotal(pMap);
			logger.info(spayTotal);
			String temp = null;
			Gson g = new Gson();
			temp = g.toJson(spayTotal);
			return temp;
		}
		@PostMapping("payPointUpdate")
		public String payPointUpdate(@RequestBody Map<String,Object> pMap) {
			logger.info("payPointUpdate 호출 성공");
			int result = 0;
			result = paymentLogic.payPointUpdate(pMap);
			return String.valueOf(result);
		}
	
}
