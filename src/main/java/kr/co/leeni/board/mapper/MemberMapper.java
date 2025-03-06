package kr.co.leeni.board.mapper;

import kr.co.leeni.board.model.MemberDto;
import kr.co.leeni.board.model.SearchDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberMapper {

  List<MemberDto> selectMemberList(SearchDto params);

  int selectMemberCount(SearchDto params);

  int selectById(MemberDto member);

  int saveMember(MemberDto member);

}
