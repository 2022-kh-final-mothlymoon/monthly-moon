package kh.sellermoon.admin.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import kh.sellermoon.admin.logic.AdminReviewLogic;
import kh.sellermoon.member.vo.PointVO;
import kh.sellermoon.member.vo.ReviewVO;

@RestController
@RequestMapping("/admin/*")
public class AdminReviewRestController {
	Logger logger = LoggerFactory.getLogger(AdminReviewRestController.class);

	@Autowired
	private AdminReviewLogic reviewLogic = null;

	// 관리자 리뷰 보기
	@PostMapping("review")
	public String adminReview(@RequestParam Map<String, Object> pMap) {
		logger.info("관리자 리뷰 보기 호출 성공");
		String temp = null;
		List<Map<String, Object>> aR = null;
		aR = reviewLogic.adminReview(pMap);
		Gson g = new Gson();
		temp = g.toJson(aR);
		return temp;
	}
	
	// 베스트 리뷰 선정
	@PostMapping("bestreview")
	public String bestReview(ReviewVO rVO, PointVO pVO) {
		logger.info("베스트 리뷰 호출 성공");
		int result = 0;
		String temp = null;
		result = reviewLogic.bestReview(rVO, pVO);
		Gson g = new Gson();
		temp = g.toJson(result);
		return temp;
	}
	// select Box
	@PostMapping("selectreview")
	public String selectReview(@RequestParam Map<String, Object> pMap) {
		logger.info("상품리스트 호출 성공");
		String temp = null;
		List<Map<String, Object>> selectView = null;
		selectView = reviewLogic.selectReview(pMap);
		Gson g = new Gson();
		temp = g.toJson(selectView);
		return temp;
	}
	

}
