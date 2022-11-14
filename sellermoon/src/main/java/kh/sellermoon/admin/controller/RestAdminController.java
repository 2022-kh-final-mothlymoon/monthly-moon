package kh.sellermoon.admin.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import kh.sellermoon.admin.logic.AdminLogic;
import kh.sellermoon.admin.vo.AdminVO;


@RestController
@RequestMapping("/admin/*")
public class RestAdminController {
	Logger logger = LoggerFactory.getLogger(RestAdminController.class);
	@Autowired
	private AdminLogic adminLogic = null;
	
	// 관리자 로그인
	@PostMapping("login")
	public String login(HttpSession session, @RequestParam Map<String,Object> pMap) {
		logger.info("login 호출 성공 : "+pMap);
		AdminVO aVO = null;
		String temp = null;
		aVO = adminLogic.login(pMap);
		Gson g = new Gson();
		temp = g.toJson(aVO);
		return temp;
	}

	// 관리자 단에서 회원 정보보기
	@GetMapping("member")
	public String memberList(@RequestParam Map<String, Object> pMap) {
		logger.info("회원 정보 호출 성공");
		String temp = null;
		List<Map<String,Object>> memberList = null;
		memberList = adminLogic.memberList(pMap);
		Gson g = new Gson();
		temp = g.toJson(memberList);
		return temp;
	}
	
}
