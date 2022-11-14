package kh.sellermoon.member.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.dao.CartDao;
import kh.sellermoon.member.dao.ProductDao;
import kh.sellermoon.member.vo.MdVO;

@Service
public class ProductLogic {
	Logger logger = LoggerFactory.getLogger(ProductLogic.class);

	@Autowired
	private ProductDao productDao;
	
	public List<MdVO> getProducts(Map<String, Object> map) throws Exception {
		List<MdVO> products = productDao.getProducts(map);
		return products;
	}

	public MdVO getProductByNo(int no) throws Exception {
		return productDao.getProductByNo(no);
	}
}
