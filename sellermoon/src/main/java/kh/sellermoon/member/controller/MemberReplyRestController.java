package kh.sellermoon.member.controller;

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

import kh.sellermoon.member.logic.MemberReplyLogic;

@RestController
@RequestMapping("/member/board/*")
public class MemberReplyRestController {
	Logger logger = LoggerFactory.getLogger(MemberReplyRestController.class);

	@Autowired(required= false)
	private MemberReplyLogic replyLogic = null;
	
	// [[[[[[[[[[ 회원 댓글 조회 (해당하는 글 번호에서 조회하기) ]]]]]]]]]]
	@GetMapping("jsonReplyList")
	public String replyList(@RequestParam Map<String, Object> pMap) {
		logger.info("member : jsonReplyList 호출 성공");
		System.out.println(pMap);
		List<Map<String, Object>> replyList = null;
		replyList = replyLogic.replyList(pMap);
		String gReplyList = null;
		Gson g = new Gson();
		gReplyList = g.toJson(replyList);
		return gReplyList;
	}
}
