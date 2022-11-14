package kh.sellermoon.admin.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import kh.sellermoon.admin.logic.AdminReportLogic;

/*
	<<<관리자>>> ReportRestController
*/
@RestController
@RequestMapping("/admin/report/*")
public class AdminReportRestController {
	Logger logger = LoggerFactory.getLogger(AdminReportRestController.class);
	
	@Autowired(required = false)
	private AdminReportLogic reportLogic = null;
	
	// [[[[[[[[[[ 관리자 게시글 신고내역 전체조회 / 상세조회 / 조건검색 ]]]]]]]]]]
	@GetMapping("jsonReportBoardList")
	public String jsonReportBoardList(@RequestParam Map<String, Object> pMap) {
		logger.info("admin : jsonReportBoardList 호출 성공");
		List<Map<String, Object>> reportBoardList = null;
		reportBoardList = reportLogic.reportBoardList(pMap);
		String gReportBoardList = null;
		Gson g = new Gson();
		gReportBoardList = g.toJson(reportBoardList);
		return gReportBoardList;
	}
	
	// [[[[[[[[[[ 관리자 댓글 신고내역 전체조회 / 상세조회 / 조건검색 ]]]]]]]]]]
	@GetMapping("jsonReportReplyList")
	public String jsonReportReplyList(@RequestParam Map<String, Object> pMap) {
		logger.info("admin : jsonReportReplyList 호출 성공");
		List<Map<String, Object>> reportReplyList = null;
		reportReplyList = reportLogic.reportReplyList(pMap);
		String gReportReplyList = null;
		Gson g = new Gson();
		gReportReplyList = g.toJson(reportReplyList);
		return gReportReplyList;
	}

}
