package kh.sellermoon.admin.vo;


import lombok.Data;

@Data
public class NoticeVO {
	private int notice_no;
	private String admin_id;
	private String notice_title;
	private String notice_content; 
	private int notice_hit;
	private String notice_category;
	private String notice_regdate;
	private String notice_file;
}
