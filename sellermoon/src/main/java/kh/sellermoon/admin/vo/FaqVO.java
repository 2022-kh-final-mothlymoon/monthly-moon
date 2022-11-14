package kh.sellermoon.admin.vo;

import lombok.Data;

@Data
public class FaqVO {
	private int faq_no;
	private String admin_id;
	private String faq_category;
	private String faq_title; 
	private String faq_content;
	private String faq_write_date;
	private int faq_view_count;
}
