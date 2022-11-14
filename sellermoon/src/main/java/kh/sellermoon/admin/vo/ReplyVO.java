package kh.sellermoon.admin.vo;

import lombok.Data;

@Data
public class ReplyVO {
	int 	reply_no 			= 0;
	int 	board_no 			= 0;
	String 	reply_writer 		= "";
	String 	reply_content 		= "";
	String 	reply_date 			= "";
	String 	reply_blind 		= "";
	int 	reply_like 			= 0;
	int 	reply_dislike 		= 0;
	int 	reply_report_count 	= 0;
}
