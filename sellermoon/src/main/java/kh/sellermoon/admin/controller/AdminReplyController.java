package kh.sellermoon.admin.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kh.sellermoon.admin.logic.AdminReplyLogic;

@Controller
@RequestMapping("/admin/board/*")
public class AdminReplyController {
	Logger logger = LoggerFactory.getLogger(AdminReplyRestController.class);
	
	final String boardList = "redirect:http://localhost:3000/admin/board/boardList";
	
	@Autowired(required = false)
	private AdminReplyLogic replyLogic = null;
	
	// [[[[[[[[[[ 관리자 댓글 수정 (블라인드) ]]]]]]]]]]
	@GetMapping(value="replyUpdate")
	public Object replyUpdate(@RequestParam Map<String, Object> pMap) {
		logger.info("replyUpdate 호출 성공");
		int result = 0;
		result = replyLogic.replyUpdate(pMap);
		return boardList;
	}
	
	// [[[[[[[[[[ 관리자 댓글 삭제 (한 건) ]]]]]]]]]]
	@GetMapping(value="replyDelete")
	public String replyDelete(@RequestParam Map<String, Object> pMap) {
		logger.info("replyDelete 호출 성공");
		int result = 0;
		result = replyLogic.replyDelete(pMap);
		return boardList;
	}
}
