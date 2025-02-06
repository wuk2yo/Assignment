package kr.co.leeni.board.controller;

import jakarta.servlet.http.HttpSession;
import kr.co.leeni.board.model.LoginVO;
import kr.co.leeni.board.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/")
    public String loginPage() {
        return "login/login";
    }

    @ResponseBody
    @PostMapping("/login")
    public int login(@RequestBody LoginVO loginVO, HttpSession session) {

        Map<String, Object> returnMap = loginService.login(loginVO);

        if ( "0".equals(String.valueOf(returnMap.get("result"))) ) {
            session.setAttribute("memberVO", returnMap.get("memberVO"));
        };

        int result = Integer.parseInt(String.valueOf(returnMap.get("result")));
        
      return result;
    }
}
