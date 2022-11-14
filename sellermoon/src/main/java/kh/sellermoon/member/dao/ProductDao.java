package kh.sellermoon.member.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.vo.MdVO;

@Service
public class ProductDao {
	Logger logger = LoggerFactory.getLogger(ProductDao.class);

	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;

	public List<MdVO> getProducts(Map<String, Object> map) throws Exception {
		return sqlSessionTemplate.selectList("getAllProducts", map);
	}


	public MdVO getProductByNo(int no) throws Exception {
		return sqlSessionTemplate.selectOne("getProductByNo", no);
	}

	
}