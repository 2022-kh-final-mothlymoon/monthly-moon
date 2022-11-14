package kh.sellermoon.member.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kh.sellermoon.member.logic.MemberMemoLogic;

/*
	<<회원>> MemoController (쪽지 보내기 insert / 쪽지 삭제 delete)
*/
@Controller
@RequestMapping("member/memo/*")
public class MemberMemoController {
	Logger logger = LoggerFactory.getLogger(MemberMemoController.class);
	
	// 회원 보낸 쪽지함
	final String sendMemoList = "redirect:http://localhost:3000/memo/sendMemoList";
	// 회원 받은 쪽지함 (main)
	final String receiveMemoList = "redirect:http://localhost:3000/memo/receiveMemoList";

	@Autowired(required = false)
	private MemberMemoLogic memoLogic = null;
	
	// [[[[[[[[[[ 회원 쪽지 보내기 ]]]]]]]]]]
	@GetMapping("memoInsert")
	public String memoInsert(@RequestParam Map<String, Object> pMap) {
		logger.info("member : memoInsert 호출 성공");
		int result = 0;
		result = memoLogic.memoInsert(pMap);
		return sendMemoList; // 쪽지 보내고 보낸 쪽지함으로 이동
	}
	
	// [[[[[[[[[[ 회원 쪽지 읽음 여부 업데이트 ]]]]]]]]]]
	@GetMapping("memoUpdate")
	public String memoUpdate(@RequestParam Map<String, Object> pMap) {
		logger.info("member : memoUpdate 호출 성공");
		int result = 0;
		result = memoLogic.memoUpdate(pMap);
		return receiveMemoList;
	}
	
	// [[[[[[[[[[ 회원 쪽지 삭제 ]]]]]]]]]]
	@GetMapping("memoDelete")
	public String memoDelete(@RequestParam Map<String, Object> pMap) {
		logger.info("member : memoDelete 호출 성공");
		int result = 0;
		result = memoLogic.memoDelete(pMap);
		return sendMemoList; // 보낸 쪽지 삭제 후 보낸 쪽지함으로 이동
	}	
}
