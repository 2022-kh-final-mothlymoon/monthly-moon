package kh.sellermoon.member.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.dao.ReviewDao;
import kh.sellermoon.member.vo.PointVO;
import kh.sellermoon.member.vo.ReviewVO;

@Service
public class ReviewLogic {
	Logger logger = LoggerFactory.getLogger(ReviewLogic.class);
	
	@Autowired
	private ReviewDao reviewDao = null;

	public int insertReview(ReviewVO rVO, PointVO pVO) {
		logger.info("리뷰 등록 호출 성공");
		int result = reviewDao.insertReview(rVO);
		// 리뷰 등록 성공하면 포인트 지급
		if (result == 1) {
			pVO.setMember_no(rVO.getMember_no());
			logger.info("pVO member_no===> " + pVO.getMember_no());
			int result2 = reviewDao.reviewPoint(pVO);
			logger.info("리뷰 포인트 등록 호출 성공");
			logger.info("result2 ===> "+ result2);
			return result2;
		}
		return result;
	}

	// 하나의 상품 모든 리뷰 보기
	public List<Map<String, Object>> oneMdAllReview(Map<String, Object> pMap) {
		logger.info("한 개 상품 모든 리뷰 보기 호출 성공");
		List<Map<String, Object>> allR = reviewDao.oneMdAllReview(pMap);
		return allR;
	}

	// 1명의 회원 모든 리뷰 보기 (마이페이지)
	public List<Map<String, Object>> memberReview(Map<String, Object> pMap) {
		logger.info("1명의 회원 모든 리뷰 보기 호출 성공");
		List<Map<String, Object>> memR = reviewDao.memberReview(pMap);
		return memR;
	}
	
	// 리뷰 좋아요
	public int likeReview(ReviewVO rVO) {
		logger.info("리뷰 좋아요 호출 성공");
		int result = reviewDao.likeReview(rVO);
		return result;
	}

	// 리뷰 수정
	public int modReview(ReviewVO rVO) {
		logger.info("리뷰 수정 호출 성공");
		int result = reviewDao.modReview(rVO);
		return result;
	}

	// 리뷰 삭제
	public int delReview(ReviewVO rVO) {
		logger.info("리뷰 삭제 호출 성공");
		int result = reviewDao.delReview(rVO);
		return result;
	}
	
	// 리뷰 수정 위한 view
	public ReviewVO modViewReview(ReviewVO rVO) {
		logger.info("리뷰 수정 view 호출 성공");
		return reviewDao.modViewReview(rVO);
	}

	// 리뷰 등록 전 구매회원인지 확인
	public int chkReviewOrder(Map<String, Object> pMap) {
		logger.info("구매회원 확인 호출 성공");
		int result = reviewDao.chkReviewOrder(pMap);
		return result;
	}

}
