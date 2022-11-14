package kh.sellermoon.member.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

/*
	<<<회원>>> BoardDao
*/
@Service
public class MemberBoardDao {
	Logger logger = LoggerFactory.getLogger(MemberBoardDao.class);
	
	@Autowired(required = false)
	private SqlSessionTemplate sqlSessionTemplate = null;

	// [[[[[[[[[[ 회원 게시글 전체 조회 ]]]]]]]]]]
	public List<Map<String, Object>> boardList(Map<String, Object> pMap) {
		logger.info("member : pMap => " + pMap);
		List<Map<String, Object>> boardList = null;
		try {
			boardList = sqlSessionTemplate.selectList("boardList");
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return boardList;
	}
	
	// [[[[[[[[[[ 회원 게시글 상세 조회 ]]]]]]]]]]
	public Map<String, Object> boardDetail(Map<String, Object> pMap) {
		logger.info("member : pMap => " + pMap);
		Map<String, Object> boardDetail = null;
		try {
			boardDetail = sqlSessionTemplate.selectOne("boardDetail", pMap);
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return boardDetail;
	}
	
	// [[[[[[[[[[ 회원 게시글 입력 ]]]]]]]]]]
	public int boardInsert(Map<String, Object> pMap) {
		logger.info("member : pMap => " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.update("boardMInsert", pMap);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
	
	// [[[[[[[[[[ 회원 게시글 수정 ]]]]]]]]]]
	public int boardUpdate(Map<String, Object> pMap) {
		logger.info("member : pMap => " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.insert("boardMUpdate", pMap);
			logger.info("result : " + result);
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
	
	// [[[[[[[[[[ 회원 게시글 삭제 ]]]]]]]]]]
	public int boardDelete(Map<String, Object> pMap) {
		logger.info("member : pMap => " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.delete("boardDelete", pMap);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// [[[[[[[[[[ 회원 게시글 조회수 (글 번호 디테일 페이지 이동시 채번) ]]]]]]]]]]
	public int board_hit(Map<String, Object> pMap) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("boardHit", pMap);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
	
	public List<Map<String, Object>> myBoard(Map<String, Object> pMap) {
		List<Map<String, Object>> myBoard = null;
		myBoard = sqlSessionTemplate.selectList("myBoard",pMap);
	      logger.info("pMap : "+pMap);
	      return myBoard;
	}
}
