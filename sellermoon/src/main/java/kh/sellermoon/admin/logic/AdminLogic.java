package kh.sellermoon.admin.logic;

import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.admin.dao.AdminDao;
import kh.sellermoon.admin.vo.AdminVO;

@Service
public class AdminLogic {
	Logger logger = LoggerFactory.getLogger(AdminLogic.class);
	@Autowired
	private AdminDao adminDao = null;
	
	public AdminVO login(Map<String, Object> pMap) {
		logger.info("login 호출");
		AdminVO aVO = null;
		aVO = adminDao.login(pMap);
		return aVO;
	}

	public List<Map<String, Object>> memberList(Map<String, Object> pMap) {
		logger.info("회원 정보 호출 성공");
		List<Map<String, Object>> memberList = null;
		memberList = adminDao.memberList(pMap);
		return memberList; 
	}

}
