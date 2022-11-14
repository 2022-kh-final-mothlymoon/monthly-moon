package kh.sellermoon.member.controller;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kh.sellermoon.member.logic.CartLogic;
import kh.sellermoon.member.logic.MemberLogic;
import kh.sellermoon.member.logic.PCartLogic;
import kh.sellermoon.member.vo.CartVO;
import kh.sellermoon.member.vo.MemberVO;

import com.google.gson.Gson;

@RestController
@RequestMapping("/cart")
public class RestCartController {
	Logger logger = LogManager.getLogger(RestCartController.class);

	@Autowired
	private PCartLogic pCartLogic;

	// 로그인한 유저의 모든 장바구니 목록 조회
	@PostMapping("/list")
	public String getAllCartList(HttpServletRequest req, 
			@RequestBody Map<String, Object> map) {
		
		String result = "";
		try {
//			HttpSession session = req.getSession();
//			logger.info("session id : " + session.getId());
//			
//			Enumeration<String> attributes = req.getSession().getAttributeNames();
//			while (attributes.hasMoreElements()) {
//			    String attribute = (String) attributes.nextElement();
//			    System.err.println("attr: " + attribute+" : "+req.getSession().getAttribute(attribute));
//			}
//			MemberVO member = (MemberVO)session.getAttribute("member");
			//logger.info("member: " + member);
//			int memberNo = member.getMember_no();
			
			//Map<String, Object> map = new HashMap<>();
			//map.put("orderType", type);
			//map.put("no", memberNo);
			logger.info("map > "+ map);
			List<CartVO> cartList = pCartLogic.getAllCartsVO(map);
			Gson g = new Gson();
			result = g.toJson(cartList);

		} catch (Exception e) {
			logger.error("error : " + e.getStackTrace());
			logger.error("error msg : " + e.getMessage());
		}

		return result;
	}

	@PostMapping({ "/", "" })
	public String CartList(HttpServletRequest req, @RequestBody Map<String, Object> pMap) {
		String result = "false";
		try {
			HttpSession session = req.getSession();
			//MemberVO member = (MemberVO)session.getAttribute("member");
			//logger.info("member: " + member);
			//int memberNo = member.getMember_no();

			//pMap.put("memberNo", memberNo);
			logger.info("jsonCartList 호출 성공" + pMap);
			pCartLogic.insertCart(pMap);
			result = "true";

		} catch (Exception e) {
			logger.error("error : " + e.getStackTrace());
			logger.error("error msg : " + e.getMessage());
		}

		return result;
	}
	
	// parameter cartNo, quantity
	@PutMapping({ "/", "" })
	public String updateCart(HttpServletRequest req, @RequestBody Map<String, Object> cartMap) {
		String result = "false";
		try {
			HttpSession session = req.getSession();
			//MemberVO member = (MemberVO)session.getAttribute("member");
			//logger.info("member: " + member);
			//int memberNo = member.getMember_no();
			//int memberNo = 3;

			//cartMap.put("memberNo", memberNo);
			pCartLogic.updateCart(cartMap);
			result = "true";

		} catch (Exception e) {
			logger.error("error : " + e.getStackTrace());
			logger.error("error msg : " + e.getMessage());
		}

		return result;
	}
	
	// parameter cartNo
	@DeleteMapping({ "/", "" })
	public String deleteCart(HttpServletRequest req, @RequestBody Map<String, Object> cartMap) {
		String result = "false";
		try {
			HttpSession session = req.getSession();
			
			//MemberVO member = (MemberVO)session.getAttribute("member");
			//logger.info("member: " + member);
			//int memberNo = member.getMember_no();
			//int memberNo = 3;

			//cartMap.put("memberNo", memberNo);
			logger.info("cartMap: " + cartMap);
			pCartLogic.deleteCart(cartMap);
			result = "true";

		} catch (Exception e) {
			logger.error("error : " + e.getStackTrace());
			logger.error("error msg : " + e.getMessage());
		}

		return result;
	}
	
	@PostMapping("/order")
	public String orderCart(HttpServletRequest req, @RequestBody Map<String, Object> pMap) {
		String result = "false";
		try {
			HttpSession session = req.getSession();
			//MemberVO member = (MemberVO)session.getAttribute("member");
			//logger.info("member: " + member);
			//int memberNo = member.getMember_no();

			//pMap.put("memberNo", memberNo);
			logger.info(pMap);
			pCartLogic.orderCart(pMap);
			result = "true";

		} catch (Exception e) {
			logger.error("error : " + e.getStackTrace());
			logger.error("error msg : " + e.getMessage());
		}

		return result;
	}

}
