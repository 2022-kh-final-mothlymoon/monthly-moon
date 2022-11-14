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

import kh.sellermoon.admin.logic.AdminMemoLogic;

/*
	<<<관리자>>> MemoRestController
*/
@RestController
@RequestMapping("/admin/memo/*")
public class AdminMemoRestController {
	Logger logger = LoggerFactory.getLogger(AdminMemoRestController.class);

	@Autowired(required = false)
	private AdminMemoLogic memoLogic = null;
	
	// [[[[[[[[[[ 관리자 보낸 쪽지 전체조회, 상세조회, 조건검색 ]]]]]]]]]]
	@GetMapping("jsonSendMemoList")
	public String jsonSendMemoList(@RequestParam Map<String, Object> pMap) {
		logger.info("admin : jsonSendMemoList 호출 성공");
		List<Map<String, Object>> sendMemoList = null;
		sendMemoList = memoLogic.sendMemoList(pMap);
		String gSendMemoList = null;
		Gson g = new Gson();
		gSendMemoList = g.toJson(sendMemoList);
		return gSendMemoList;
	}
}
