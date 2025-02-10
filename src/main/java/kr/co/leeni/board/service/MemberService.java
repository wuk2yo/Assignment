package kr.co.leeni.board.service;

import kr.co.leeni.board.mapper.LoginMapper;
import kr.co.leeni.board.mapper.MemberMapper;
import kr.co.leeni.board.model.MemberVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

  private final MemberMapper memberMapper;

  public List<MemberVO> selectMemberList(){
    memberMapper.selectMemberList();
    return memberMapper.selectMemberList();
  };

  public Map<String, Object> save(MemberVO memberVO) {

    Map<String, Object> returnMap = new HashMap<String, Object>();

    /* 아이디 존재유무 확인 */
    int Cnt = memberMapper.selectById(memberVO);

    if ( Cnt > 0 ) {
      returnMap.put("result", -1);
    } else {
      memberVO.setPwd("0000");
      memberMapper.saveMember(memberVO);
      returnMap.put("result", 0);
    }
    return returnMap;
  }
}
