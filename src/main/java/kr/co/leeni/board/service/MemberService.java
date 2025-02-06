package kr.co.leeni.board.service;

import kr.co.leeni.board.mapper.MemberMapper;
import kr.co.leeni.board.model.MemberVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

  private final MemberMapper memberMapper;

  public List<MemberVO> selectMemberList(){
    memberMapper.selectMemberList();
    return memberMapper.selectMemberList();
  };
}
