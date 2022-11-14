package kh.sellermoon.member.vo;

import lombok.Data;

@Data
public class PointVO {
	
	  private int 	 point_no         = 0; 
	  private String point_date       = ""; 
	  private int    point_used_saved = 0; 
	  private int    member_no        = 0; 
	  private int    point_type       = 0; 

}
