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

import kh.sellermoon.member.logic.MemberMemoLogic;

/*
	<<<회원>>> MemoRestController (받은 쪽지, 보낸 쪽지 조회 select)
*/
@RestController
@RequestMapping("/member/memo/*")
public class MemberMemoRestController {
	Logger logger = LoggerFactory.getLogger(MemberMemoRestController.class);
	
	@Autowired(required = false)
	private MemberMemoLogic memoLogic = null;
	
	// [[[[[[[[[[ 회원 보낸 쪽지 전체조회, 상세조회, 조건검색 ]]]]]]]]]]
	@GetMapping("jsonMemoList")
	public String jsonMemoList(@RequestParam Map<String, Object> pMap) {
		logger.info("member : jsonMemoList 호출 성공");
		List<Map<String, Object>> memoList = null;
		memoList = memoLogic.memoList(pMap);
		String gMemoList = null;
		Gson g = new Gson();
		gMemoList = g.toJson(memoList);
		return gMemoList;
	}
}
