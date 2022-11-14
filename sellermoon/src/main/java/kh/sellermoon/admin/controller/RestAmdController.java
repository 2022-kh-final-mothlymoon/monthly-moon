package kh.sellermoon.admin.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.Gson;

import kh.sellermoon.admin.logic.AmdLogic;
import kh.sellermoon.admin.logic.StoreLogic;
import util.HashMapBinder;

@RestController
@RequestMapping("/admin/amd/*")
public class RestAmdController {
	 Logger logger = LogManager.getLogger(RestAmdController.class);
	   
	   @Autowired
	   private AmdLogic amdLogic = null;
	   
	   @GetMapping("jsonAmdList")
	   public String jsonAmdList(Model model, @RequestParam Map<String, Object> pMap) {
	      logger.info("jsonAmdList 호출 성공");
	      List<Map<String, Object>> amdList = null;
	      amdList = amdLogic.amdList(pMap);
	      logger.info(amdList);
	      String temp = null;
	      Gson g = new Gson();
	      temp = g.toJson(amdList);
	      return temp;
	   }
	   @GetMapping("jsonAmdDetail")
	   public String jsonAmdDetail(Model model, @RequestParam Map<String, Object> pMap) {
		   logger.info("jsonAmdDetail 호출 성공");
		   List<Map<String, Object>> amdList = null;
		   amdList = amdLogic.amdDetail(pMap);
		   logger.info(amdList);
		   String temp = null;
		   Gson g = new Gson();
		   temp = g.toJson(amdList);
		   return temp;
	   }
	  
}
