package kh.sellermoon.admin.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import kh.sellermoon.admin.logic.StoreLogic;

@Controller
@RequestMapping("/admin/store/*")
@SessionAttributes({ "admin_id", "admin_name", "admin_pw" })
public class StoreController {
	Logger logger = LogManager.getLogger(StoreController.class);
	@Autowired
	private StoreLogic storeLogic = null;

	@GetMapping("storeList")
	public String storeList(Model model, @RequestParam Map<String, Object> pMap) {
		logger.info("storeList 호출 성공");
		List<Map<String, Object>> storeList = null;
		storeList = storeLogic.storeList(pMap);
		logger.info(storeList);
		model.addAttribute("storeList", storeList);
		// return "store/storeList";
		return "store/storeList";
	}

	// @RequestMapping(value = "/detail")
	@GetMapping("storeDetail")
	public String storeDetail(Model model, @RequestParam Map<String, Object> pMap) {
		logger.info("storeDetail 호출 성공");
		List<Map<String, Object>> storeList = null;
		storeList = storeLogic.storeDetail(pMap);
		model.addAttribute("storeList", storeList);
		return "forward:detail.jsp";
	}

	//@ResponseBody
	@GetMapping("storeInsert")
	public String storeInsert(@RequestParam Map<String, Object> pMap) {
		logger.info("storeInsert 호출 성공");
		logger.info("pMap");
		int result = 0;
		result = storeLogic.storeInsert(pMap);
		logger.info(result);
		return "redirect:http://localhost:3000/admin/store";
	}
	

	@GetMapping("read")
	// @RequestMapping(value="/storeUpdate", method =RequestMethod.GET)
	public Object read(Model model, @RequestParam Map<String, Object> pMap) {
		logger.info("storeUpdate 호출 성공");
		List<Map<String, Object>> storeList = null;
		storeList = storeLogic.storeList(pMap);
		model.addAttribute("storeList", storeList);
	
		return "forward:read.jsp";
	}
	@GetMapping("storeUpdate")
	//@RequestMapping(value="/storeUpdate", method = RequestMethod.GET)
	public Object storeUpdate(@RequestParam Map<String, Object> pMap) {
		logger.info("storeUpdate 호출 성공");
		int result = 0;
		result = storeLogic.storeUpdate(pMap);
		logger.info(result);
		final String redirectUrl = "redirect:http://localhost:3000/admin/store";
	      return redirectUrl;
	}
//	@GetMapping("storeDelete")
//	public Object storeDelete(@RequestParam Map<String, Object> pMap) {
//		logger.info("storeDelete 호출 성공");
//		int result = 0;
//		result = storeLogic.storeDelete(pMap);
//		return "redirect:storeList";
//	}

}
