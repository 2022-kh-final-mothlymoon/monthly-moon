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

import kh.sellermoon.admin.logic.AdminReplyLogic;

@RestController
@RequestMapping("/admin/board/*")
public class AdminReplyRestController {
	Logger logger = LoggerFactory.getLogger(AdminReplyRestController.class);
	
	@Autowired(required = false)
	private AdminReplyLogic replyLogic = null;
	
	// [[[[[[[[[[ 관리자 댓글 조회 (해당 글 번호에서 조회하기) ]]]]]]]]]]
	@GetMapping(value="jsonReplyList")
	public String jsonReplyList(@RequestParam Map<String, Object> pMap) {
		logger.info("admin : jsonReplyList 호출 성공");
		List<Map<String, Object>> replyList = null;
		replyList = replyLogic.replyList(pMap);
		String gReplyList = null;
		Gson g = new Gson();
		gReplyList = g.toJson(replyList);
		return gReplyList;
	}
}
