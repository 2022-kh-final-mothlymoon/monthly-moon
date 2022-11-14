package kh.sellermoon.member.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import kh.sellermoon.member.logic.ReviewLogic;
import kh.sellermoon.member.vo.PointVO;
import kh.sellermoon.member.vo.ReviewVO;

@RestController
public class RestReviewController {
	Logger logger = LoggerFactory.getLogger(RestReviewController.class);
	
	@Autowired
	private ReviewLogic reviewLogic = null;
	
	// 리뷰 등록 전 구매회원인지 확인
	@PostMapping("chkrevieworder")
	public String chkReviewOrder(@RequestParam Map<String, Object> pMap) {
		logger.info("구매회원 확인 호출 성공");
		int result = 0;
		String temp = null;
		result = reviewLogic.chkReviewOrder(pMap);
		Gson g = new Gson();
		temp = g.toJson(result);
		return temp;
	}
	
	// 리뷰 등록
	@PostMapping("insertreview")
	public String insertReview(ReviewVO rVO, PointVO pVO) {
		logger.info("리뷰 등록 호출 성공");
		int result = 0;
		String temp = null;
		result = reviewLogic.insertReview(rVO, pVO);
		Gson g = new Gson();
		temp = g.toJson(result);
		return temp;
	}
	
	// 하나의 상품 모든 리뷰 보기
	@PostMapping("onemdallreview")
	public String oneMdAllReview(@RequestParam Map<String, Object> pMap) {
		logger.info("한 개 상품 모든 리뷰 보기 호출 성공");
		String temp = null;
		List<Map<String,Object>> allR = null;
		allR = reviewLogic.oneMdAllReview(pMap);
		Gson g = new Gson();
		temp = g.toJson(allR);
		return temp;
	}
	
	// 리뷰 수정 위한 view
	@PostMapping("modviewreview")
	public String modViewReview(ReviewVO rVO) {
		logger.info("한 개 상품 모든 리뷰 보기 호출 성공");
		String temp = null;
		ReviewVO allR = reviewLogic.modViewReview(rVO);
		Gson g = new Gson();
		temp = g.toJson(allR);
		return temp;
	}
	
	// 1명의 회원 모든 리뷰 보기 (마이페이지)
	@PostMapping("memreview")
	public String memberReview(@RequestParam Map<String, Object> pMap) {
		logger.info("1명의 회원 모든 리뷰 보기 호출 성공");
		String temp = null;
		List<Map<String,Object>> memR = null;
		memR = reviewLogic.memberReview(pMap);
		Gson g = new Gson();
		temp = g.toJson(memR);
		return temp;
	}
	
	// 리뷰 좋아요
	@PostMapping("likereview")
	public String likeReview(ReviewVO rVO) {
		logger.info("리뷰 좋아요 호출 성공");
		int result = 0;
		String temp = null;
		result = reviewLogic.likeReview(rVO);
		Gson g = new Gson();
		temp = g.toJson(result);
		return temp;
	}
	
	// 리뷰 수정
	@PostMapping("modreview")
	public String modReview(ReviewVO rVO) {
		logger.info("리뷰 수정 호출 성공");
		int result = 0;
		String temp = null;
		result = reviewLogic.modReview(rVO);
		Gson g = new Gson();
		temp = g.toJson(result);
		return temp;
	}
	
	// 리뷰 삭제
	@PostMapping("delreview")
	public String delReview(ReviewVO rVO) {
		logger.info("리뷰 삭제 호출 성공");
		int result = 0;
		String temp = null;
		result = reviewLogic.delReview(rVO);
		Gson g = new Gson();
		temp = g.toJson(result);
		return temp;
	}

}
