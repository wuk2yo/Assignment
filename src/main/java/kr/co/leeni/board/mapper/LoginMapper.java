package kr.co.leeni.board.mapper;

import kr.co.leeni.board.model.LoginVO;
import kr.co.leeni.board.model.MemberVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
  LoginVO selectById(LoginVO loginVO);

  MemberVO matchPassword(LoginVO loginVO);

  void increaseErrCnt(LoginVO loginVO);

  void resetErrCnt(LoginVO loginVO);
}
