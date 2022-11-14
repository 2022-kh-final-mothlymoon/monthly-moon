package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.AdminBoardDao;

/*
	<<<관리자>>> BoardLogic
*/
@Service
public class AdminBoardLogic {
	Logger logger = LoggerFactory.getLogger(AdminBoardLogic.class);

	@Autowired(required = false)
	private AdminBoardDao boardDao = null;

	// [[[[[[[[[[ 게시글 전체 조회 ]]]]]]]]]]
	public List<Map<String, Object>> boardList(Map<String, Object> pMap) {
		logger.info("boardList 호출 성공");
		List<Map<String, Object>> boardList = null;
		boardList = boardDao.boardList(pMap);
		return boardList;
	}

	// [[[[[[[[[[ 게시글 상세 조회 ]]]]]]]]]]
	public Map<String, Object> boardDetail(Map<String, Object> pMap) {
		logger.info("boardDetail 호출 성공");
		Map<String, Object> boardDetail = null;
		boardDetail = boardDao.boardDetail(pMap);
		return boardDetail;
	}

	// [[[[[[[[[[ 게시글 수정 (블라인드 처리) ]]]]]]]]]
	public int boardUpdate(Map<String, Object> pMap) {
		logger.info("boardUpdate 호출 성공");
		int result = 0;
		result = boardDao.boardUpdate(pMap);
		return result;
	}
	
	// [[[[[[[[[[ 게시글 삭제 ]]]]]]]]]] 
	public int boardDelete(Map<String, Object> pMap) {
		logger.info("boardDelete 호출 성공");
		int result = 0;
		result = boardDao.boardDelete(pMap);
		return result;
	}
}
