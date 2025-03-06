package kr.co.leeni.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchDto {

  private String searchType;
  private String searchWord;
  private String searchStartDate;
  private String searchEndDate;
  private String searchGrade;

  private int totalCount;

}
