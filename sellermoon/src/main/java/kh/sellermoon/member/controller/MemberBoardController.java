package kh.sellermoon.member.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import kh.sellermoon.member.logic.MemberBoardLogic;

/*
	<<<회원>>> BoardController
*/
@Controller
@RequestMapping("/member/board/*")
public class MemberBoardController {
	Logger logger = LoggerFactory.getLogger(MemberBoardController.class);
	
	@Autowired(required = false)
	private MemberBoardLogic boardLogic = null;
	
	final String boardList = "redirect:http://localhost:3000/board/boardList";
	
	// [[[[[[[[[[ 회원 게시글 입력 ]]]]]]]]]]
	@GetMapping("boardInsert")
	public String boardInsert(@RequestParam Map<String, Object> pMap) {
		logger.info("member : boardInsert 호출 성공");
		int result = 0;
		result = boardLogic.boardInsert(pMap);		
		// 전체 글 목록으로 넘어가기 전에 게시글이 등록되었습니다. 페이지 후 목록으로 버튼 (react에서)
		return boardList; 
		// 사진 업로드는 cloudynary에서
	}
	
	// [[[[[[[[[[ 회원 게시글 수정 ]]]]]]]]]]
	@GetMapping("boardUpdate")
	public Object boardUpdate(@RequestParam Map<String, Object> pMap) {
		logger.info("member : boardUpdate 호출 성공");
		int result = 0;
		result = boardLogic.boardUpdate(pMap);
		// 전체 글 목록으로 넘어가기 전에 게시글이 수정되었습니다. 페이지 후 목록으로 버튼 (react에서)
		return boardList; 
	}
		
	// [[[[[[[[[[ 회원 게시글 삭제 ]]]]]]]]]]
	@GetMapping("boardDelete")
	public Object boardDelete(@RequestParam Map<String, Object> pMap) {
		logger.info("boardDelete 호출 성공");
		int result = 0;
		result = boardLogic.boardDelete(pMap);
		// 전체 글 목록으로 넘어가기 전에 게시글이 삭제되었습니다. 페이지 후 목록으로 버튼 (react에서)
		return boardList;
	}
}
