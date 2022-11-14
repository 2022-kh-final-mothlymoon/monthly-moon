package kh.sellermoon.member.logic;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.dao.CartDao;
import kh.sellermoon.member.dao.PCartDao;
import kh.sellermoon.member.dao.ProductDao;
import kh.sellermoon.member.vo.CartVO;
import kh.sellermoon.member.vo.MdVO;

@Service
public class PCartLogic {
	Logger logger = LoggerFactory.getLogger(PCartLogic.class);

	@Autowired
	private PCartDao pCartDao;

	public List<CartVO> getAllCartsVO(Map<String, Object> pMap) throws Exception {
		return pCartDao.getAllCartsVO(pMap);
	}

	public void insertCart(Map<String, Object> pMap) throws Exception {
		logger.info("pmap1:" + pMap);
		// 장바구니에 담긴 특정 상품 개수, cartNo 조회
		Map<String, Object> existMap = pCartDao.existMdInCart(pMap);
		logger.info("existMap0:" + existMap);
		// 장바구니에 이미 해당 상품이 존재하니?
		if(existMap != null) {
			// 이미 장바구니에 담은 해당 상품 갯수
			int cnt =  Integer.parseInt(existMap.get("CARTQUANTITY").toString()); 
			logger.info("cnt:" + cnt);
			
			// 새로 담으려는 상품 갯수
			int quantity = Integer.parseInt(pMap.get("cartQuantity").toString()); 
			logger.info("quantity:" + quantity);
			
			quantity += cnt; 

			pMap.put("quantity", quantity);
			pMap.put("cartNo", existMap.get("CARTNO"));
			
			logger.info("existMap:" + existMap);
			logger.info("pmap2:" + pMap);
			
			pCartDao.updateCart(pMap);
			
		} else {
			pCartDao.insertCart(pMap);
		}
	}

	public void updateCart(Map<String, Object> cartMap) throws Exception {
		pCartDao.updateCart(cartMap);

	}

	public void deleteCart(Map<String, Object> cartMap) throws Exception {
		pCartDao.deleteCart(cartMap);
	}

	public void orderCart(Map<String, Object> pMap) throws Exception {
		String orderType= pMap.get("orderType").toString();
		
		if(orderType.equals("T")) {
			//String orderNumber = pCartDao.getOrderNumber();
			//테이블 연관관계 수정되면 위의 주석 해제, 아래 구문 삭제하기! -- 지금은 상수 값 "2"으로 박아놓음...
			String orderNumber = "2"; 
			String date = pMap.get("date").toString();
			
			date = date.replace('T', ' ');
			date = date.replace('Z', ' ');
			
			pMap.put("orderNo", orderNumber);
			pMap.put("startDate", date);
		
			pCartDao.insertSubs(pMap);
		}
		
		List<String> arr = (List<String>) pMap.get("cartNo");
		
		for(String no : arr) {
			logger.info(no);
			pMap.put("cartNo", no);
			pCartDao.deleteCart(pMap);
		}
	}
}
