package kh.sellermoon.admin.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.Gson;

import kh.sellermoon.admin.logic.NoticeLogic;
import util.HashMapBinder;

@RestController
@RequestMapping("/notice/*")
public class RestNoticeController {
	Logger logger = LogManager.getLogger(RestNoticeController.class);
	
	@Autowired
	private NoticeLogic noticeLogic = null;
	
	@GetMapping("noticelist")
	public String NoticeList(Model model, @RequestParam Map<String, Object> pMap) {
      logger.info("NoticeList 호출 성공");
      
      List<Map<String, Object>> noticeList = null;
      noticeList = noticeLogic.noticeList(pMap);
      logger.info(noticeList);
      String temp = null;
      Gson g = new Gson();
      temp = g.toJson(noticeList);
      return temp;
   }
	
	@PostMapping("noticeinsert")
	   public String noticeInsert(MultipartHttpServletRequest mpRequest, @RequestParam(value="notice_file", required=false) MultipartFile notice_file) {
		int result = 0;
		Map<String,Object> pMap = new HashMap<>();
		HashMapBinder hmb = new HashMapBinder(mpRequest);
		hmb.mbind(pMap);
		logger.info("noticeinsert 호출 성공 ==> "+pMap);
		if(!notice_file.isEmpty()) {//
			String filename = notice_file.getOriginalFilename();
			logger.info("한글 처리 테스트 : "+filename);
			String savePath = "C:\\workspace_sellerMoon\\sellermoon\\src\\main\\webapp\\pds";
			//파일에 대한 풀 네임 담기
			String fullPath = savePath+"\\"+filename;			
			try {
				//File객체는 파일명을 객체화 해줌
				File file = new File(fullPath);
				//board_sub_t에 파일크기를 담기 위해 계삭
				byte[] bytes = notice_file.getBytes();
				BufferedOutputStream bos =
						new BufferedOutputStream(
								new FileOutputStream(file));
				//실제로 파일 내용이 채워짐
				bos.write(bytes);
				bos.close();
				long size = file.length();
				double d_size = Math.floor(size/1024.0);//kb
				logger.info("size:"+d_size);
				pMap.put("notice_file", filename);
				//pMap.put("bs_size", d_size);
				logger.info("파일 정보 : "+pMap.get("notice_file"));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			notice_file = null;
		}
		result = noticeLogic.noticeInsert(pMap);
		return String.valueOf(result);
	}	
	

	@PostMapping("noticeupdate")
	public String noticeUpdate(@RequestBody Map<String,Object> pMap) {
		logger.info("noticeUpdate 호출 성공");
		int result = 0;
		result = noticeLogic.noticeUpdate(pMap);
		return String.valueOf(result);
	}
	
	
	@GetMapping("noticedelete")
	public Object noticeDelete(@RequestParam Map<String,Object> pMap) {
		logger.info("noticeDelete 호출 성공");
		int result = 0;
		result = noticeLogic.noticeDelete(pMap);
		return String.valueOf(result);
	}
	
	@GetMapping("noticedetail")
	public String noticedetail(Model model, @RequestParam Map<String,Object> pMap) {
		logger.info("noticedetail 호출 성공");
		List<Map<String,Object>> noticeList = null;
		noticeList = noticeLogic.noticeDetail(pMap);
		model.addAttribute("noticeList",noticeList);
		return String.valueOf(noticeList);
	}	
}
