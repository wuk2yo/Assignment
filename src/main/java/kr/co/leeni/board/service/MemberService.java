package kr.co.leeni.board.service;

import kr.co.leeni.board.mapper.MemberMapper;
import kr.co.leeni.board.model.MemberDto;
import kr.co.leeni.board.model.SearchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

  private final MemberMapper memberMapper;

  /**
   * 회원 조회
   * @param searchDto
   * @return returnMap
   */
  public Map<String, Object> selectMemberList(SearchDto searchDto){

    Map<String, Object> returnMap = new HashMap<String, Object>();

    int totalCount = memberMapper.selectMemberCount(searchDto);
    System.out.println("totalCount = " + totalCount);

    if (totalCount < 1) {
        returnMap.put("memberList", Collections.emptyList());

      return returnMap;
    }

    System.out.println("searchDto = " + searchDto);
    List<MemberDto> list =  memberMapper.selectMemberList(searchDto);
    System.out.println("searchDto2 :" + searchDto);
    returnMap.put("memberList", list);
    returnMap.put("searchDto", searchDto);

    return returnMap;

  };

  public Map<String, Object> save(MemberDto memberDto) {

    Map<String, Object> returnMap = new HashMap<String, Object>();

    /* 아이디 존재유무 확인 */
    int Cnt = memberMapper.selectById(memberDto);
    if ( Cnt > 0 ) {
      returnMap.put("result", -1);

    } else {

      log.info("secondmemberDto:{}", memberDto);
      memberMapper.saveMember(memberDto);
      returnMap.put("result", 0);
    }
    return returnMap;
  }
}
