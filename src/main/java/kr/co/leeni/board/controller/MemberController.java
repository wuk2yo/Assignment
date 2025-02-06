package kr.co.leeni.board.controller;

import kr.co.leeni.board.model.MemberVO;
import kr.co.leeni.board.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

  private final MemberService memberService;

  @GetMapping("/list")
  public String memberListPage(Model model) {
    List<MemberVO> memberVOList = memberService.selectMemberList();
    log.info("##memberVOList: {}", memberVOList.get(0));
    model.addAttribute("memberList", memberVOList);
    return "/member/list";
  }

}
