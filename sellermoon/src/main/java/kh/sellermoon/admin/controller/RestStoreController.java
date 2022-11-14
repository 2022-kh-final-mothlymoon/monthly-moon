package kh.sellermoon.admin.controller;

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

import kh.sellermoon.admin.logic.StoreLogic;

@RestController
@RequestMapping("/admin/store/*")
public class RestStoreController {
	 Logger logger = LogManager.getLogger(RestStoreController.class);
	   
	   @Autowired
	   private StoreLogic storeLogic = null;
	   
	   @GetMapping("jsonStoreList")
	   public String jsonStoreList(Model model, @RequestParam Map<String, Object> pMap) {
	      logger.info("StoreList 호출 성공");
	      List<Map<String, Object>> storeList = null;
	      storeList = storeLogic.storeList(pMap);
	      logger.info(storeList);
	      String temp = null;
	      Gson g = new Gson();
	      temp = g.toJson(storeList);
	      return temp;
	   }
	   @GetMapping("jsonStoreDetail")
	   public String jsonStoreDetail(Model model, @RequestParam Map<String, Object> pMap) {
		   logger.info("jsonStoreList 호출 성공");
		   List<Map<String, Object>> storeList = null;
		   storeList = storeLogic.storeDetail(pMap);
		   logger.info(storeList);
		   String temp = null;
		   Gson g = new Gson();
		   temp = g.toJson(storeList);
		   return temp;
	   }
}
