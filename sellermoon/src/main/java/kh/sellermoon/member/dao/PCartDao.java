package kh.sellermoon.member.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.vo.CartVO;
import kh.sellermoon.member.vo.MdVO;
import org.apache.logging.log4j.LogManager;

@Service
public class PCartDao {
	Logger logger = LoggerFactory.getLogger(PCartDao.class);

	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;

	public List<CartVO> getAllCartsVO(Map<String, Object> map) throws Exception {
		return sqlSessionTemplate.selectList("getAllPCartListVO", map);
	}
	
	public Map<String, Object> existMdInCart(Map<String, Object> map) throws Exception {
		return sqlSessionTemplate.selectOne("existMdInCart", map);
	}
	
	public void insertCart(Map<String, Object> pMap) throws Exception {
		sqlSessionTemplate.insert("insertCart", pMap);
	}

	public void updateCart(Map<String, Object> cartMap) throws Exception {
		sqlSessionTemplate.update("updateCart", cartMap);
	}

	public void deleteCart(Map<String, Object> cartMap) throws Exception {
		sqlSessionTemplate.delete("deleteCart", cartMap);
	}

	public String getOrderNumber() {
		return sqlSessionTemplate.selectOne("getOrderNumber");
	}

	public void insertSubs(Map<String, Object> pMap) {
		sqlSessionTemplate.insert("insertSubs", pMap);
	}
}