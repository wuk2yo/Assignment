package kr.co.leeni.board.mapper;

import kr.co.leeni.board.model.MemberVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberMapper {

  List<MemberVO> selectMemberList();

  int selectById(MemberVO member);

  int save(MemberVO member);
}
