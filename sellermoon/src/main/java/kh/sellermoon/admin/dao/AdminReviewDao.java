package kh.sellermoon.admin.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.vo.AmdVO;
import kh.sellermoon.member.vo.PointVO;
import kh.sellermoon.member.vo.ReviewVO;


@Service
public class AdminReviewDao {
	Logger logger = LoggerFactory.getLogger(AdminReviewDao.class);
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;

	public List<Map<String, Object>> adminReview(Map<String, Object> pMap) {
		logger.info("관리자 리뷰 보기 호출 성공");
		List<Map<String, Object>> aR = null;
		aR = sqlSessionTemplate.selectList("admReview", pMap);
		return aR;
	}

	public int bestReview(ReviewVO rVO) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("bestReview", rVO);
			logger.info("베스트 리뷰 호출 성공");
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	public int bestPoint(PointVO pVO) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("bestPoint", pVO);
			logger.info("베스트 리뷰 포인트 등록 호출 성공");
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	public List<Map<String, Object>> selectReview(Map<String, Object> pMap) {
		logger.info("상품리스트 호출 성공");
		List<Map<String, Object>> selectView = null;
		selectView = sqlSessionTemplate.selectList("selectBox", pMap);
		return selectView;
	}

}
