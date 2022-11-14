package kh.sellermoon.member.logic;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import kh.sellermoon.member.controller.RestMemberController;
import kh.sellermoon.member.dao.MemberDao;
import kh.sellermoon.member.vo.MemberVO;
import kh.sellermoon.member.vo.PointVO;

@Service
public class KaKaoLoginLogic {
	Logger logger = LoggerFactory.getLogger(KaKaoLoginLogic.class);
	@Autowired
	private MemberDao memberDao = null;
	@Autowired
	private MemberLogic memberLogic = null;

	public String getKakaoAccessToken(String code) {
		String access_Token = "";
		String refresh_Token = "";
		String reqURL = "https://kauth.kakao.com/oauth/token";
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			// POST 요청을 위해 기본값이 false인 setDoOutput을 true로
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);

			// POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=9af54edd96e17a898bbe15f6a35bdf9d"); // TODO REST_API_KEY 입력
			sb.append("&redirect_uri=http://localhost:3000/kakaologin"); // TODO 인가코드 받은 redirect_uri 입력
			sb.append("&code=" + code);
			bw.write(sb.toString());
			bw.flush();

			// 결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			// 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body : " + result);

			// Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);

			access_Token = element.getAsJsonObject().get("access_token").getAsString();
			refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

			System.out.println("access_token : " + access_Token);
			System.out.println("refresh_token : " + refresh_Token);

			br.close();
			bw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return access_Token;
	}

	public MemberVO createKakaoUser(String token) throws Exception {
		MemberVO mVO = new MemberVO(); // 로그인 한 회원 정보 담을 VO
		PointVO pVO = new PointVO(); // 카카오 로그인해도 포인트 주기
		String reqURL = "https://kapi.kakao.com/v2/user/me";
		// access_token을 이용하여 사용자 정보 조회
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setRequestProperty("Authorization", "Bearer " + token); // 전송할 header 작성, access_token전송

			// 결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			// 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body : " + result);

			// Gson 라이브러리로 JSON파싱
			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);

			JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
			JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
			String nickname = properties.getAsJsonObject().get("nickname").getAsString();
			String email = kakao_account.getAsJsonObject().get("email").getAsString();
			// 카카오 로그인 한 user 정보 db 저장하기 전
			// 이미 있는 회원이면 db에 저장된 정보 불러오기
			MemberVO kakaoChk = memberDao.kakaoCheck(email);
			if (kakaoChk == null) {
				int member_no = memberDao.getMNo();
				String member_code = memberLogic.getTempPassword();
				mVO.setMember_email(email);
				mVO.setMember_name(nickname);
				mVO.setMember_no(member_no);
				mVO.setMember_code(member_code);
				br.close();
			} else {
				return kakaoChk;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		MemberVO kakaoVO = memberDao.kakaoRegister(mVO);
		// 처음 카카오 로그인시 회원가입 point 지급
		logger.info("kakaoVO no ====> "+kakaoVO.getMember_no());
		pVO.setMember_no(kakaoVO.getMember_no());
		memberDao.registerPoint(pVO);
		return kakaoVO;
	}

}
