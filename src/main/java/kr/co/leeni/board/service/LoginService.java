package kr.co.leeni.board.service;

import kr.co.leeni.board.mapper.LoginMapper;
import kr.co.leeni.board.model.LoginVO;
import kr.co.leeni.board.model.MemberVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

  private final LoginMapper loginMapper;

  public Map<String, Object> login(LoginVO loginVO) {

    Map<String, Object> returnMap = new HashMap<>();

    LoginVO loginResVO = loginMapper.selectById(loginVO);
    /* 없는 아이디 */
    if( loginResVO == null ) {
      returnMap.put("result", -1);
      return returnMap;
    }

    int errCnt = loginResVO.getErrCnt();

    MemberVO memberVO = loginMapper.matchPassword(loginVO);

    if( memberVO != null && memberVO.getErrCnt() < 5) {
      /* 로그인성공, 에러카운트 초기화 */
      loginMapper.resetErrCnt(loginVO);
      returnMap.put("result", 0);
      returnMap.put("memberVO", memberVO);
      return returnMap;
    }

    /* 틀린 비밀번호 */
    if( memberVO == null) {
      if ( errCnt < 5 ) {
        loginMapper.increaseErrCnt(loginVO);
        errCnt++;
      }
    }

    returnMap.put("result", errCnt);
    return returnMap;
  }
}
