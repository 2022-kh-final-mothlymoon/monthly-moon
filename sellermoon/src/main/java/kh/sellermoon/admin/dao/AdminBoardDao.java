package kh.sellermoon.admin.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

/*
	<<<관리자>>> BoardDao
*/
@Service
public class AdminBoardDao {
	Logger logger = LoggerFactory.getLogger(AdminBoardDao.class);

	@Autowired(required = false)
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	// [[[[[[[[[[ 관리자 게시글 전체 조회 ]]]]]]]]]]
	public List<Map<String, Object>> boardList(Map<String, Object> pMap) {
		logger.info("admin boardList :  pMap => " + pMap);
		List<Map<String, Object>> boardList = null;
		try {
			boardList = sqlSessionTemplate.selectList("boardList", pMap);
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return boardList;
	}

	// [[[[[[[[[[ 관리자 게시글 상세 조회 ]]]]]]]]]]
	public Map<String, Object> boardDetail(Map<String, Object> pMap) {
		logger.info("admin boardDetail : pMap => " + pMap);
		Map<String, Object> boardDetail = null;
		try {
			boardDetail = sqlSessionTemplate.selectOne("boardList", pMap);
		} catch(DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return boardDetail;
	}

	// [[[[[[[[[[ 회원 게시글 수정 (블라인드) ]]]]]]]]]]
	public int boardUpdate(Map<String, Object> pMap) {
		logger.info("admin boardUpdate : pMap => " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.update("boardAUpdate", pMap);
			logger.info("result : " + result);
		} catch (DataAccessException e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
	
	// [[[[[[[[[[ 관리자 게시글 삭제 ]]]]]]]]]]
	public int boardDelete(Map<String, Object> pMap) {
		logger.info("admin boardDelete : pMap => " + pMap);
		int result = 0;
		try {
			result = sqlSessionTemplate.delete("boardDelete", pMap);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

}
