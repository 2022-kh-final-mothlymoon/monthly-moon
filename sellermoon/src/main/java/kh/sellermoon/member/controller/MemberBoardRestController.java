package kh.sellermoon.member.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import kh.sellermoon.member.logic.MemberBoardLogic;

@RestController
@RequestMapping("/member/board/*")
public class MemberBoardRestController {
	Logger logger = LoggerFactory.getLogger(MemberBoardRestController.class);
	
	@Autowired(required = false)
	private MemberBoardLogic boardLogic = null;
	
	// [[[[[[[[[[ 회원 게시글 전체조회 / 상세조회 / 조건검색 ]]]]]]]]]]
	@GetMapping("jsonBoardList")
	public String boardList(@RequestParam Map<String, Object> pMap) {
		logger.info("member : jsonBoardList 호출 성공");
		List<Map<String, Object>> boardList = null;
		boardList = boardLogic.boardList(pMap);
		String gBoardList = null;
		Gson g = new Gson();
		gBoardList = g.toJson(boardList);
		return gBoardList;
	}
	// 마이페이지
	@GetMapping("myboard")
	public String myBoard(Model model, @RequestParam Map<String, Object> pMap) {
	      logger.info("myBoard 호출 성공");
	      
	      List<Map<String, Object>> myBoard = null;
	      myBoard = boardLogic.myBoard(pMap);
	      String temp = null;
	      Gson g = new Gson();
	      temp = g.toJson(myBoard);
	      return temp;
	}
}
