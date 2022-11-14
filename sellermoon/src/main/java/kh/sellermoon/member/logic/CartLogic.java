package kh.sellermoon.member.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.dao.CartDao;
import kh.sellermoon.member.vo.CartVO;

@Service
public class CartLogic {
	Logger logger = LoggerFactory.getLogger(CartLogic.class);

	@Autowired
	private CartDao cartDao;

	public List<CartVO> getAllCartList(int no) throws Exception {
		return cartDao.getAllCartList(no);
	}

	public String getCart() throws Exception {
		return cartDao.getCart();
	}

	public int cartDelete(Map<String, Object> pMap) {
		int result = 0;
		result = cartDao.cartDelete(pMap);
		return result;
	}
}
