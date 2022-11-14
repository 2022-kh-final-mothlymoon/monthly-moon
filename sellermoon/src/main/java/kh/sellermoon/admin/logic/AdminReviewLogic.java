package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.AdminReviewDao;
import kh.sellermoon.admin.vo.AmdVO;
import kh.sellermoon.member.vo.PointVO;
import kh.sellermoon.member.vo.ReviewVO;

@Service
public class AdminReviewLogic {
	Logger logger = LoggerFactory.getLogger(AdminReviewLogic.class);

	@Autowired
	private AdminReviewDao reviewDao = null;

	// 관리자 리뷰 보기
	public List<Map<String, Object>> adminReview(Map<String, Object> pMap) {
		logger.info("관리자 리뷰 보기 호출 성공");
		List<Map<String, Object>> aR = null;
		aR = reviewDao.adminReview(pMap);
		return aR;
	}

	// 베스트 리뷰 선정
	public int bestReview(ReviewVO rVO, PointVO pVO) {
		logger.info("베스트 리뷰 호출 성공");
		int result = reviewDao.bestReview(rVO);
		// 베스트 리뷰 등록 성공하면 포인트 지급
		if (result == 1) {
			logger.info("rVO member_no===> " + rVO.getMember_no());
			pVO.setMember_no(rVO.getMember_no());
			logger.info("pVO member_no===> " + pVO.getMember_no());
			int result2 = reviewDao.bestPoint(pVO);
			logger.info("베스트 리뷰 포인트 등록 호출 성공");
			logger.info("result2 ===> "+ result2);
			return result2;
		}
		return result;
	}

	public List<Map<String, Object>> selectReview(Map<String, Object> pMap) {
		logger.info("상품리스트 호출 성공");
		List<Map<String, Object>> selectView = null;
		selectView = reviewDao.selectReview(pMap);
		return selectView;
	}

}
