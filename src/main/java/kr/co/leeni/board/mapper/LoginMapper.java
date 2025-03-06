package kr.co.leeni.board.mapper;

import kr.co.leeni.board.model.LoginDto;
import kr.co.leeni.board.model.MemberDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
  LoginDto selectById(LoginDto loginDto);

  MemberDto matchPassword(LoginDto loginDto);

  void increaseErrCnt(LoginDto loginDto);

  void resetErrCnt(LoginDto loginDto);
}
