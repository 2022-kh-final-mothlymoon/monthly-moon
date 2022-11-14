package kh.sellermoon.member.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kh.sellermoon.member.logic.MemberReportLogic;

/*
	<<<회원>>> ReportController
*/
@Controller
@RequestMapping("/member/board/*") // 신고는 게시글에서 처리될 내용
public class MemberReportController {
	Logger logger = LoggerFactory.getLogger(MemberReportController.class);
	
	@Autowired(required = false)
	private MemberReportLogic reportLogic = null;
	
	final String boardList = "redirect:http://localhost:3000/board/boardList";
	
	// [[[[[[[[[[ 회원 게시글 신고 입력 ]]]]]]]]]]
	@GetMapping("reportBInsert")
	public String reportBInsert(@RequestParam Map<String, Object> pMap) {
		logger.info("member : reportBInsert 호출 성공");
		int result = 0;
		result = reportLogic.reportBInsert(pMap);
		return boardList;
	}
	
	// [[[[[[[[[[ 회원 댓글 신고 입력 ]]]]]]]]]]
	@GetMapping("reportRInsert")
	public String reportRInsert(@RequestParam Map<String, Object> pMap) {
		logger.info("member : reportRInsert 호출 성공");
		int result = 0;
		result = reportLogic.reportRInsert(pMap);
		return boardList;
	}
}
