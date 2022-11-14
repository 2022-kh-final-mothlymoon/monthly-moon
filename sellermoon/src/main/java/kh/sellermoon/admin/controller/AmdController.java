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
import org.springframework.stereotype.Controller;
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

@Controller
@RequestMapping("/admin/amd/*")
public class AmdController {
	 Logger logger = LogManager.getLogger(RestAmdController.class);
	   
	   @Autowired
	   private AmdLogic amdLogic = null;
	   
	   @GetMapping("amdInsert")
		public String storeInsert(@RequestParam Map<String, Object> pMap) {
			logger.info("amdInsert 호출 성공");
			logger.info("pMap");
			int result = 0;
			result = amdLogic.amdInsert(pMap);
			logger.info(result);
			return "redirect:http://localhost:3000/admin/md";
		}  
	  
//	   @GetMapping("amdInsert")
//	   public String amdInsert(MultipartHttpServletRequest mpRequest, @RequestParam(value="MD_IMAGE", required=false) MultipartFile MD_IMAGE,@RequestParam(value="MD_DETAIL_IMAGE", required=false) MultipartFile MD_DETAIL_IMAGE) {
//		int result = 0;
//		Map<String,Object> pMap = new HashMap<>();
//		HashMapBinder hmb = new HashMapBinder(mpRequest);
//		hmb.mbind(pMap);
//		logger.info("rboardInsert 호출 성공 ==> "+pMap);
//		if(!MD_IMAGE.isEmpty()) {//
//			String filename = MD_IMAGE.getOriginalFilename();
//			logger.info("한글 처리 테스트 : "+filename);
//			String savePath = "C:\\workspace_fp\\sellermoon\\src\\main\\webapp\\pds";
//			//파일에 대한 풀 네임 담기
//			String fullPath = savePath+"\\"+filename;			
//			try {
//				//File객체는 파일명을 객체화 해줌
//				File file = new File(fullPath);
//				//board_sub_t에 파일크기를 담기 위해 계삭
//				byte[] bytes = MD_IMAGE.getBytes();
//				byte[] bytes_d = MD_DETAIL_IMAGE.getBytes();
//				BufferedOutputStream bos =
//						new BufferedOutputStream(
//								new FileOutputStream(file));
//				//실제로 파일 내용이 채워짐
//				bos.write(bytes);
//				bos.write(bytes_d);
//				bos.close();
//				logger.info("MD_IMAGE:"+file);
//				pMap.put("MD_IMAGE", file);
//				pMap.put("MD_DETAIL_IMAGE", file);
//				logger.info("파일 정보 : "+pMap.get("MD_IMAGE"));
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}
//		result = amdLogic.amdInsert(pMap);
//		//return String.valueOf(result);
//		return "redirect:http://localhost:3000/amd";
//	}
	   
	   @GetMapping("amdDelete")
	public Object amdDelete(@RequestParam Map<String, Object> pMap) {
		logger.info("amdDelete 호출 성공");
		int result = 0;
		result = amdLogic.amdDelete(pMap);

		final String redirectUrl = "redirect:http://localhost:3000/admin/md";
		return redirectUrl;
	}
	   @GetMapping("amdUpdate")
		//@RequestMapping(value="/storeUpdate", method = RequestMethod.GET)
		public Object amdUpdate(@RequestParam Map<String, Object> pMap) {
			logger.info("amdUpdate 호출 성공");
			int result = 0;
			result = amdLogic.amdUpdate(pMap);
			logger.info(result);
			final String redirectUrl = "redirect:http://localhost:3000/admin/md";
		      return redirectUrl;
		}
}
