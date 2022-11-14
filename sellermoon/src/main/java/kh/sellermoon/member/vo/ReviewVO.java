package kh.sellermoon.member.vo;

import lombok.Data;

@Data
public class ReviewVO {
	
	public int getMd_review_no() {
		return md_review_no;
	}
	public void setMd_review_no(int md_review_no) {
		this.md_review_no = md_review_no;
	}
	public int getMember_no() {
		return member_no;
	}
	public void setMember_no(int member_no) {
		this.member_no = member_no;
	}
	public int getMd_no() {
		return md_no;
	}
	public void setMd_no(int md_no) {
		this.md_no = md_no;
	}
	public String getMd_review_content() {
		return md_review_content;
	}
	public void setMd_review_content(String md_review_content) {
		this.md_review_content = md_review_content;
	}
	public String getMd_review_written_date() {
		return md_review_written_date;
	}
	public void setMd_review_written_date(String md_review_written_date) {
		this.md_review_written_date = md_review_written_date;
	}
	public int getMd_review_like() {
		return md_review_like;
	}
	public void setMd_review_like(int md_review_like) {
		this.md_review_like = md_review_like;
	}
	public int getMd_star() {
		return md_star;
	}
	public void setMd_star(int md_star) {
		this.md_star = md_star;
	}
	public String getBest_review() {
		return best_review;
	}
	public void setBest_review(String best_review) {
		this.best_review = best_review;
	}
	private int     md_review_no           = 0;
	private int     member_no              = 0;
	private int     md_no                  = 0;
	private String  md_review_content      = "";
	private String  md_review_written_date = "";
	private int     md_review_like         = 0;
	private int     md_star                = 0;
	private String  best_review            = "";

}
