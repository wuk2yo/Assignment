package kr.co.leeni.board.controller;

import jakarta.servlet.http.HttpSession;
import kr.co.leeni.board.model.MemberVO;
import kr.co.leeni.board.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

  private final MemberService memberService;

  @GetMapping("/list")
  public String memberListPage(MemberVO memberVO, Model model) {

    List<MemberVO> memberVOList = memberService.selectMemberList(memberVO);

    model.addAttribute("memberList", memberVOList);

    return "/member/list";
  }

  /**
   * 회원 등록
   * @param memberVO
   * @return result : 0 성공 / -1 실패
   */
  @ResponseBody
  @PostMapping("/save")
  public int save(@RequestBody MemberVO memberVO, HttpSession session) {

    MemberVO loginMember = (MemberVO) session.getAttribute("memberVO");


    memberVO.setUpdateId(loginMember.getId());
    //초기비밀번호
    memberVO.setPwd("0000");


    Map<String, Object> returnMap = new HashMap<String, Object>();

    returnMap = memberService.save(memberVO);

    int result = Integer.parseInt(String.valueOf(returnMap.get("result")));

    return result;
  }

}
