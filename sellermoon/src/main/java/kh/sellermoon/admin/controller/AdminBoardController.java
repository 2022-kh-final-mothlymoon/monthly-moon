package kh.sellermoon.admin.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import kh.sellermoon.admin.logic.AdminBoardLogic;

/*
	<<<관리자>>> BoardController
*/
@Controller
@RequestMapping("/admin/board/*")
public class AdminBoardController {
	Logger logger = LoggerFactory.getLogger(AdminBoardController.class);
	
	final String boardList = "redirect:http://localhost:3000/admin/board/boardList";
	
	@Autowired(required = false)
	private AdminBoardLogic boardLogic = null;

	// [[[[[[[[[[ 관리자 게시글 수정 (블라인드 처리) ]]]]]]]]]]
	@GetMapping(value="boardUpdate")
	public Object boardUpdate(@RequestParam Map<String, Object> pMap) {
		logger.info("boardUpdate 호출 성공");
		int result = 0;
		result = boardLogic.boardUpdate(pMap);
		return boardList;
	}
		
	// [[[[[[[[[[ 관리자 게시글 삭제 ]]]]]]]]]]
	@GetMapping("boardDelete")
	public String boardDelete(@RequestParam Map<String, Object> pMap) {
		logger.info("boardDelete 호출 성공");
		int result = 0;
		result = boardLogic.boardDelete(pMap);
		return boardList;
	}
}
