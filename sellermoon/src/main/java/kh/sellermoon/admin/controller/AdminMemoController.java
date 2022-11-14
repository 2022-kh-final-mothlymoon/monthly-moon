package kh.sellermoon.admin.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kh.sellermoon.admin.logic.AdminMemoLogic;

/*
	<<관리자>> MemoController 
 */
@Controller
@RequestMapping("admin/memo/*")
public class AdminMemoController {
	Logger logger = LoggerFactory.getLogger(AdminMemoController.class);
	
	// 관리자가 회원에게 보낸 메세지 리스트를 보여주는 페이지
	final String sendMemoList = "redirect:http://localhost:3000/admin/memo/sendMemoList";
	
	@Autowired(required = false)
	private AdminMemoLogic memoLogic = null;
	
	// [[[[[[[[[[ 관리자 쪽지 보내기 ]]]]]]]]]]
	@GetMapping("sendMemoInsert")
	public String memoInsert(@RequestParam Map<String, Object> pMap) {
		logger.info("admin : sendMemoInsert 호출 성공");
		int result = 0;
		result = memoLogic.sendMemoInsert(pMap);
		return sendMemoList;
	}
}
