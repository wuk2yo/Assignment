package kr.co.leeni.board.controller;

import kr.co.leeni.board.model.MemberVO;
import kr.co.leeni.board.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
  public String memberListPage(Model model) {
    List<MemberVO> memberVOList = memberService.selectMemberList();
    log.info("##memberVOList: {}", memberVOList.get(0));
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
  public int save(MemberVO memberVO) {

    Map<String, Object> returnMap = new HashMap<String, Object>();

    int result = Integer.parseInt(String.valueOf(returnMap.get("result")));

    return result;
  }

}
