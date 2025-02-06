package kr.co.leeni.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginVO {
  private String id;
  private String pwd;
  private int errCnt;
}
