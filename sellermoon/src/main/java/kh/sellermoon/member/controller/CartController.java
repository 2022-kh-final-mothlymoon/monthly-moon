//package kh.sellermoon.member.controller;
//
//import java.io.BufferedOutputStream;
//import java.io.File;
//import java.io.FileOutputStream;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//
//import kh.sellermoon.member.logic.CartLogic;
//import kh.sellermoon.member.vo.MdVO;
//
//import com.google.gson.Gson;
//import kh.util.HangulConversion;
//import kh.util.HashMapBinder;
//
//@Controller
//@RequestMapping("/cart/*")
//public class CartController {
//	Logger logger = LoggerFactory.getLogger(CartController.class);
//
//	@Autowired(required=false)
//	private CartLogic cartLogic = null;
//	private final String filePath = "C:\\Users\\workspace_spring\\basic\\src\\main\\webapp\\pds";
//	
//	@ResponseBody
//	@GetMapping(value="helloworld", produces="text/plain;charset=UTF-8")
//	public String helloWorld(){
//		return "한글도 되나용?";
//	}
//	@ResponseBody
//	@GetMapping(value="jsonFormat", produces="application/json;charset=UTF-8")
//	public String jsonFormat(){
//		List<Map<String,Object>> names = new ArrayList<>();
//		Map<String,Object> rmap = new HashMap<>();
//		rmap.put("mem_id", "tomato");
//		rmap.put("mem_name", "토마토");
//		names.add(rmap);
//		rmap = new HashMap<>();
//		rmap.put("mem_id", "apple");
//		rmap.put("mem_name", "사과");
//		names.add(rmap);
//		Gson g = new Gson();
//		String temp = g.toJson(names);
//		return temp;
//	}
//	// 사이드 관전 포인트! : 파라미터에 req, res가 없다
//	@GetMapping("testParam")
//	public String testParam(@RequestParam String mem_id) {
//		logger.info("testParam 호출 성공 " + mem_id);
//		return "redirect:/test/testList.jsp";
//	}
//	/*
//	 * dev_web과 basic 비용 계산 해보기 Map 선언만 함 - @RequestParam HashMapBinder가 필요없어짐
//	 * ModelAndView도 필요 없음 - Model로 대체 리턴타입 : ModelAndView -> String
//	 */
//	@GetMapping("cartList")
//	public String cartList(Model model, @RequestParam Map<String,Object> pMap) {
//		logger.info("cartList 호출 성공--> "+pMap); // cb_search:b_title컬럼 b_writer b_content, tb_search: title
//		List<Map<String, Object>> cartList = null;
//		cartList = cartLogic.cartList(pMap);
//		model.addAttribute("cartList", cartList);
////		return "forward:cartList.jsp";//webapp/cart/
//		//pojo 1-3 ModelAndView경우와 동일
//		return "cart/cartList";//WEB-INF/views/cart/        // 고쳐져야 할 코드!!!!
//	}
//
//	@GetMapping("cartUpdate")
//	public Object cartUpdate(@RequestParam Map<String, Object> pMap) {
//		logger.info("cartUpdate 호출 성공");
//		int result = 0;
//		result = cartLogic.cartUpdate(pMap);
//		// jsp에서 시작해서 action으로!(for update) 그 다음 action에서 (select) >>>>>(forward)>>>>> cartList.jsp
//		return "redirect:cartList";
//	}
//
//	@GetMapping("cartDetail")
//	public String cartDetail(Model model, @RequestParam Map<String,Object> pMap) {
//		logger.info("cartDetail 호출 성공"); 
//		List<Map<String,Object>> cartList = null;
//		cartList = cartLogic.cartDetail(pMap); 
//		model.addAttribute("cartList", cartList);
//		return "forward:read.jsp";
//	}
//	
//	@GetMapping("cartDelete")
//	public Object cartDelete(@RequestParam Map<String,Object> pMap) {
//		logger.info("cartDelete 호출 성공");
//		int result = 0;
//		result = cartLogic.cartDelete(pMap);
//		// jsp에서 시작해서 action으로!(for update) 그 다음 action에서 (select) >>>>>(forward)>>>>> cartList.jsp
//		return "redirect:cartList";
//	}
//	
//	@PostMapping("cartInsert")
//	public String cartInsert(MultipartHttpServletRequest mpRequest, @RequestParam(value = "bs_file", required = false) MultipartFile bs_file) {
//		int result = 0;
//		Map<String, Object> pMap = new HashMap<>();
//		HashMapBinder hmb = new HashMapBinder(mpRequest);
//		hmb.mbind(pMap);
//		logger.info("cartInsert 호출 성공 ==> "+pMap);
//		if(!bs_file.isEmpty()) {
//			String filename= bs_file.getOriginalFilename();
//			String savePath = "C:\\workspace_spring\\demo0921\\src\\main\\webapp\\pds";
//			// 파일 풀 네임 담기
//			String fullPath = savePath+"\\"+filename;
//			try {
//				// File객체는 파일 명을 객체화 해줌
//				File file = new File(fullPath);
//				// cart_sub_t에 파일크기를 담기 위해
//				byte[] bytes = bs_file.getBytes();
//				BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
//				// 실제로 파일 내용이 채워짐
//				bos.write(bytes);
//				bos.close();
//				long size = file.length();
//				double d_size = Math.floor(size/1024.0); //kb
//				logger.info("size: "+d_size);
//				pMap.put("bs_file", filename);
//				pMap.put("bs_size", d_size);
//				logger.info("파일 정보 : "+pMap.get("bs_file")+", "+pMap.get("bs_size"));
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}
//		result = cartLogic.cartInsert(pMap);
//		return "redirect:http://localhost:3000/cart";
//	}
//}
