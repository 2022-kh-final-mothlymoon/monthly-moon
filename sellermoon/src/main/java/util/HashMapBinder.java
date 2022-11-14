package util;

import java.io.File;
import java.util.Enumeration;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public class HashMapBinder {
   Logger logger = LogManager.getLogger(HashMapBinder.class);
   HttpServletRequest req = null;
   MultipartHttpServletRequest mreq = null;
   public HashMapBinder(MultipartHttpServletRequest mreq) {
      this.mreq = mreq;
   }
   public void mbind(Map<String,Object> pMap) {
      pMap.clear();//  초기화를 해줌
      Enumeration<String> em = mreq.getParameterNames();
      while(em.hasMoreElements()) {
         //key값 꺼내기
         String key = em.nextElement();//b_title, b_writer, b_content, b_pw 등
         pMap.put(key, mreq.getParameter(key));
      }
      logger.info(pMap);
   }//////////end of bind
}