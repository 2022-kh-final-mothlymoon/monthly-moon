package kh.sellermoon.admin.vo;

import lombok.Data;

@Data
public class BoardVO {
	private int 	board_no 			= 0;
	private int 	member_no 			= 0;
	private String 	board_title 		= "";
	private String 	board_content 		= "";
	private int 	board_written_date 	= 0;
	private int 	board_like 			= 0;
	private int 	board_dislike 		= 0;
	private String 	board_category 		= "";
	private String 	board_blind 		= "";
	private int 	board_report_count 	= 0;
	private int		board_hit			= 0;
}
