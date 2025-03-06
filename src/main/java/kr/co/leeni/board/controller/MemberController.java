package kr.co.leeni.board.controller;

import jakarta.servlet.http.HttpSession;
import kr.co.leeni.board.model.MemberDto;
import kr.co.leeni.board.model.SearchDto;
import kr.co.leeni.board.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

  private final MemberService memberService;

  @GetMapping("/list")
  public String memberListPage() {
    return "/member/list";
  }

  /**
   * 회원 리스트 가져오기
   * @param searchDto
   * @return returnMap
   */
  @ResponseBody
  @PostMapping("/list")
  public Map<String, Object> memberListPage(@ModelAttribute final SearchDto searchDto) {

    Map<String, Object> returnMap = new HashMap<String, Object>();

    return returnMap = memberService.selectMemberList(searchDto);
  }

  /**
   * 회원 등록
   * @param memberDto
   * @return result : 0 성공 / -1 실패
   */
  @ResponseBody
  @PostMapping("/save")
  public int save(@RequestBody MemberDto memberDto, HttpSession session) {

    MemberDto loginMember = (MemberDto) session.getAttribute("memberDto");

    memberDto.setUpdateId(loginMember.getId());
    //초기비밀번호
    memberDto.setPwd("0000");

    Map<String, Object> returnMap = new HashMap<String, Object>();

    returnMap = memberService.save(memberDto);

    int result = Integer.parseInt(String.valueOf(returnMap.get("result")));

    return result;
  }

}
