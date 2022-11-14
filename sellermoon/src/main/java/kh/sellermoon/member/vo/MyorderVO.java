package kh.sellermoon.member.vo;

import lombok.Data;

@Data
public class MyorderVO {
	
	  private String 	order_no         = ""; 
	  private String 	order_date       = ""; 
	  private String 	order_type       = ""; 
	  private int 		cart_quantity    = 0; 
	  private String 	md_name       	 = ""; 
	  private String    md_brand 		 = ""; 
	  private int    	md_price         = 0; 
	  private String    md_image_url     = ""; 
	  private String    delivery_status  = ""; 
	  private String    delivery_fee     = ""; 
	  private String    delivery_date    = ""; 
	  private String    delivery_no      = ""; 
	  private String    delivery_company = ""; 
}
