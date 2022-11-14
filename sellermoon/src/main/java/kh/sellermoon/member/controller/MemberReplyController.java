package kh.sellermoon.member.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kh.sellermoon.member.logic.MemberReplyLogic;

/*
	<<<관리자>>> BoardController
*/
@Controller
@RequestMapping("/member/board/*")
public class MemberReplyController {
	Logger logger = LoggerFactory.getLogger(MemberReplyController.class);

	@Autowired(required = false)
	private MemberReplyLogic replyLogic = null;
	
	final String boardList = "redirect:http://localhost:3000/board/boardList";
	
	// [[[[[[[[[[ 회원 댓글 입력 (해당하는 상세 글에서 댓글 입력) ]]]]]]]]]]
	@GetMapping("replyInsert")
	public String replyInsert(@RequestParam Map<String, Object> pMap) {
		logger.info("member : replyInsert 호출 성공");
		int result = 0;
		result = replyLogic.replyInsert(pMap);
		return boardList;
	}
	
	// [[[[[[[[[[ 회원 댓글 수정 ]]]]]]]]]]
	@GetMapping("replyUpdate")
	public Object replyUpdate(@RequestParam Map<String, Object> pMap) {
		int result = 0;
		result = replyLogic.replyUpdate(pMap);
		return boardList;
	}
	
	// [[[[[[[[[[ 회원 댓글 삭제 ]]]]]]]]]]
	@GetMapping("replyDelete")
	public Object replyDelete(@RequestParam Map<String, Object> pMap) {
		logger.info("replyDelete 호출 성공");
		int result = 0;
		result = replyLogic.replyDelete(pMap);
		return boardList;
	}
}
