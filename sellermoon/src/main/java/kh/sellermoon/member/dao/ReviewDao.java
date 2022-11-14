package kh.sellermoon.member.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.vo.PointVO;
import kh.sellermoon.member.vo.ReviewVO;


@Service
public class ReviewDao {
	Logger logger = LoggerFactory.getLogger(ReviewDao.class);
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	// 리뷰 등록
	public int insertReview(ReviewVO rVO) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("insertReview", rVO);
			logger.info("리뷰 등록 rVO : " + rVO);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
	
	// 리뷰 작성시 1000원 지급
	public int reviewPoint(PointVO pVO) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("reviewPoint", pVO);
			logger.info("리뷰 등록 포인트 pVO : " + pVO);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
	
	// 하나의 상품 모든 리뷰 보기
	public List<Map<String, Object>> oneMdAllReview(Map<String, Object> pMap) {
		List<Map<String, Object>> allR = null;
		logger.info("한 개 상품 모든 리뷰 보기 호출 성공");
		allR = sqlSessionTemplate.selectList("OneMdAllReview", pMap);
		logger.info(allR.toString());
		return allR;
	}
	
	// 1명의 회원 모든 리뷰 보기 (마이페이지)
	public List<Map<String, Object>> memberReview(Map<String, Object> pMap) {
		logger.info("1명의 회원 모든 리뷰 보기 호출 성공");
		List<Map<String, Object>> memR = null;
		memR = sqlSessionTemplate.selectList("OneMemAllReview", pMap);
		logger.info(memR.toString());
		return memR;
	}
	
	// 리뷰 좋아요
	public int likeReview(ReviewVO rVO) {
		logger.info("리뷰 좋아요 호출 성공");
		int result = 0;
		try {
			result = sqlSessionTemplate.update("likeReview", rVO);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// 리뷰 수정
	public int modReview(ReviewVO rVO) {
		logger.info("리뷰 수정 호출 성공");
		int result = 0;
		try {
			result = sqlSessionTemplate.update("updReview", rVO);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// 리뷰 삭제
	public int delReview(ReviewVO rVO) {
		logger.info("리뷰 삭제 호출 성공");
		int result = 0;
		try {
			result = sqlSessionTemplate.delete("delReview", rVO);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// 리뷰 수정 위한 view
	public ReviewVO modViewReview(ReviewVO rVO) {
		ReviewVO allR = null;
		logger.info("리뷰 수정 view 호출 성공");
		allR = sqlSessionTemplate.selectOne("updforReview", rVO);
		logger.info(allR.toString());
		return allR;
	}
	
	// 리뷰 등록 전 구매회원인지 확인
	public int chkReviewOrder(Map<String, Object> pMap) {
		logger.info("구매회원 확인 호출 성공");
		int result = 0;
		try {
			result = sqlSessionTemplate.selectOne("chkOrderR", pMap);
			logger.info("result : " + result);
			logger.info("pMap : " + pMap.toString());
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
	

}
