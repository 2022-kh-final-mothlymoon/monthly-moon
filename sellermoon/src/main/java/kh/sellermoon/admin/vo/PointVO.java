package kh.sellermoon.admin.vo;

import lombok.Data;

@Data
public class PointVO {
	private int point_no;
	private String point_date;
	private int point_used_saved;
	private int member_no; 
	private int point_type;
}
