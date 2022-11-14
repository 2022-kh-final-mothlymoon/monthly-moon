package kh.sellermoon.member.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.sellermoon.member.vo.MemberVO;
import kh.sellermoon.member.vo.PointVO;

@Service
public class MemberDao {
	Logger logger = LoggerFactory.getLogger(MemberDao.class);
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;

	// 회원가입
	public int memberRegister(MemberVO mVO) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("memberRegister", mVO);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// 카카오 로그인
	public MemberVO kakaoRegister(MemberVO mVO) {
		try {
			sqlSessionTemplate.update("kakaoRegister", mVO);
			logger.info("카카오 로그인 호출 성공");
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return mVO;
	}
	
	// 네이버 로그인
	public MemberVO naverRegister(MemberVO mVO) {
		try {
			sqlSessionTemplate.update("naverRegister", mVO);
			logger.info("네이버 로그인 호출 성공");
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return mVO;
	}
	
	// 카카오/네이버 로그인 시 중복체크
	public MemberVO kakaoCheck(String member_email) {
		MemberVO mVO = sqlSessionTemplate.selectOne("kakaoCheck", member_email);
		logger.info("카카오/네이버 로그인 호출 성공");
		return mVO;

	}

	// 회원가입시 2000원 지급
	public int registerPoint(PointVO pVO) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("registerPoint", pVO);
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// 추천인 코드 입력시 2000원 지급
	public int recommendPoint(PointVO pVO) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("recommendPoint", pVO);
			logger.info("result : " + result);
			logger.info("추천인코드 적립금 지급성공");
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// 추천받은 회원 찾기
	public MemberVO recommendMem(String member_code) {
		logger.info("추천회원찾기 호출 성공");
		return sqlSessionTemplate.selectOne("recommendMem", member_code);
	}

	// 로그인
	public MemberVO memberLogin(MemberVO mVO) {
		logger.info("memberLogin 호출 성공");
		return sqlSessionTemplate.selectOne("memberLogin", mVO);
	}

	// 회원정보 수정
	public int memberModify(MemberVO mVO) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("memberModify", mVO);
			logger.info("result : " + result);
			logger.info("회원정보수정 호출 성공");
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// 회원번호 채번
	public int getMNo() {
		logger.info("getMNo 호출 성공");
		int result = 0;
		try {
			result = sqlSessionTemplate.selectOne("getMNo");
			logger.info(result + "");
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// 이메일 중복체크
	public int emailChk(String member_email) {
		logger.info("이메일 중복체크 호출 성공");
		int result = 0;
		try {
			result = sqlSessionTemplate.selectOne("emailChk", member_email);
			logger.info(result + "");
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// 이메일 찾기
	public MemberVO findEmail(MemberVO mVO) {
		logger.info("이메일 찾기 호출 성공");
		return sqlSessionTemplate.selectOne("findEmail", mVO);
	}

	// 비밀번호 찾기
	public int findPassword(MemberVO mVO) {
		logger.info("비밀번호 찾기 호출 성공");
		int result = sqlSessionTemplate.selectOne("findPassword", mVO);
		return result;
	}

	// 비밀번호 수정
	public int updatePass(MemberVO mVO) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("updatePass", mVO);
			logger.info("비밀번호 수정 호출 성공");
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}
	
	public int updateTemp(MemberVO mVO) {
		int result = 0;
		try {
			result = sqlSessionTemplate.update("updateTemp", mVO);
			logger.info("임시비밀번호 수정 호출 성공");
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

	// 회원정보 보기
	public MemberVO memInfo(MemberVO mVO) {
		logger.info("회원 정보 보기 호출 성공");
		return sqlSessionTemplate.selectOne("viewMember", mVO);
	}

	// 비밀번호 확인
	public MemberVO passChk(MemberVO mVO) {
		logger.info("비밀번호 확인 호출 성공");
		return sqlSessionTemplate.selectOne("chkPass", mVO);
	}

	// 회원 탈퇴
	public int delMember(MemberVO mVO) {
		int result = 0;
		try {
			result = sqlSessionTemplate.delete("memberDelete", mVO);
			logger.info("회원탈퇴 호출 성공");
			logger.info("result : " + result);
		} catch (Exception e) {
			logger.info("Exception : " + e.toString());
		}
		return result;
	}

}
