package kh.sellermoon.member.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kh.sellermoon.admin.logic.AmdLogic;
import kh.sellermoon.member.logic.CartLogic;
import kh.sellermoon.member.logic.ProductLogic;
import kh.sellermoon.member.vo.MdVO;

import com.google.gson.Gson;

@Controller
@RequestMapping("/product/*")
public class RestProductController {
	Logger logger = LoggerFactory.getLogger(RestProductController.class);

	@Autowired
	private ProductLogic productLogic;
	
	@GetMapping("list")
	public ResponseEntity<?> getAllProducts(@RequestParam(required = false, defaultValue="2") int page,
			@RequestParam(required = false, defaultValue="누적판매순") String sort,
			@RequestParam(required = false, defaultValue="전체") String category) {
		String resultJsopStr = "";
		try {
			Map<String, Object> map = new HashMap<>();
			map.put("page", page);
			map.put("sort", sort);
			if(!category.trim().equals("전체")) {
				map.put("category", category); // 전체가 아닐경우 where절 조건에 추가
			}
			
			logger.info("MAP "+ map);
			
			List<MdVO> list = productLogic.getProducts(map);
			Gson g = new Gson();
			resultJsopStr =  g.toJson(list);
			
		}catch(Exception e) {
			logger.error("error : " +	e.getStackTrace());
			logger.error("error msg : " +	e.getMessage());
		}
		//return resultJsopStr;
		return ResponseEntity.ok(resultJsopStr);
	}
	
	@GetMapping("detail")
	public ResponseEntity<?>  getProductDetails(@RequestParam int no) {
		String resultJsopStr = "";
		try {
			MdVO md = productLogic.getProductByNo(no);
			logger.info("p :" + md);
			
			Gson g = new Gson();
			resultJsopStr =  g.toJson(md);
			
		}catch(Exception e) {
			logger.error("error : " +	e.getStackTrace());
			logger.error("error msg : " +	e.getMessage());
		}
		//return resultJsopStr;
		return ResponseEntity.ok(resultJsopStr);
	}
	
}
