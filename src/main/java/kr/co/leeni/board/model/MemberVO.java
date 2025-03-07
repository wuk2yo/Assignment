package kr.co.leeni.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberVO {
  private String id;
  private String name;
  private String phone;
  private String basicAddr;
  private String detailAddr;
  private String zipCode;
  private String grade;
  private Integer errCnt;
  private String createTime;
}
