package kh.sellermoon.member.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.dao.MemberBoardDao;
import kh.sellermoon.member.logic.MemberBoardLogic;

/*
	<<<회원>>> BoardLogic
*/
@Service
public class MemberBoardLogic {
	Logger logger = LoggerFactory.getLogger(MemberBoardLogic.class);

	@Autowired(required = false)
	private MemberBoardDao boardDao = null;

	// [[[[[[[[[[ 회원 게시글 전체 조회 ]]]]]]]]]]
	public List<Map<String, Object>> boardList(Map<String, Object> pMap) {
		logger.info("member : boardList 호출 성공");
		List<Map<String, Object>> boardList = null;
		boardList = boardDao.boardList(pMap);
		return boardList;
	}
	
	// [[[[[[[[[[ 회원 게시글 상세 조회 ]]]]]]]]]]
	public Map<String, Object> boardDetail(Map<String, Object> pMap) {
		logger.info("member : boardDetail 호출 성공");
		Map<String, Object> boardDetail = null;
		boardDetail = boardDao.boardDetail(pMap);
		return boardDetail;
	}
	
	// [[[[[[[[[[ 회원 게시글 작성 ]]]]]]]]]]
	public int boardInsert(Map<String, Object> pMap) {
		logger.info("member : boardInsert 호출 성공");
		int result = 0;
		result = boardDao.boardInsert(pMap);
		return result;
	}
	
	// [[[[[[[[[[ 회원 게시글 수정 ]]]]]]]]]]
	public int boardUpdate(Map<String, Object> pMap) {
		logger.info("member : boardUpdate 호출 성공");
		int result = 0;
		result = boardDao.boardUpdate(pMap);
		return result;
	}
	
	// [[[[[[[[[[ 회원 게시글 삭제 ]]]]]]]]]]
	public int boardDelete(Map<String, Object> pMap) {
		logger.info("member : boardDelete 호출 성공");
		int result = 0;
		result = boardDao.boardDelete(pMap);
		return result;
	}
	
	public List<Map<String, Object>> myBoard(Map<String, Object> pMap) {
		logger.info("myBoard 호출 성공");
		List<Map<String, Object>> myBoard = null;
		myBoard = boardDao.myBoard(pMap);
		return myBoard;
	}
}
