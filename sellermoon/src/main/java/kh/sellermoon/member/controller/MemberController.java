package kh.sellermoon.member.controller;


import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kh.sellermoon.admin.controller.RestAdminController;
import kh.sellermoon.member.logic.MemberLogic;
import kh.sellermoon.member.vo.MemberVO;
import kh.sellermoon.member.vo.PointVO;

@Controller
//@RequestMapping("/monthlymoon")
public class MemberController {
	Logger logger = LoggerFactory.getLogger(RestAdminController.class);
	@Autowired
	private MemberLogic memberLogic = null;

	// 회원가입
	@PostMapping("register")
	public String memberRegister(MemberVO mVO, PointVO pVO) {
		logger.info("memberRegister 호출 성공");
		int result = 0;
		result = memberLogic.emailChk(mVO.getMember_email());
		if(result == 1) {
			return "/monthlymoon/register";
		}else if(result == 0) {
			memberLogic.memberRegister(mVO, pVO);			
		}
		return "redirect:http://localhost:3000/login";
	}

	// 로그아웃
	@GetMapping("logout")
	public String memberLogout(HttpSession session) {
		session.invalidate();
		logger.info("로그아웃 성공");
		return "redirect:/monthlymoon/main";
	}
	
	

}
