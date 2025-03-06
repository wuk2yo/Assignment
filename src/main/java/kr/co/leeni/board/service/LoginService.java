package kr.co.leeni.board.service;

import kr.co.leeni.board.mapper.LoginMapper;
import kr.co.leeni.board.model.LoginDto;
import kr.co.leeni.board.model.MemberDto;
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

  public Map<String, Object> login(LoginDto loginDto) {

    Map<String, Object> returnMap = new HashMap<>();

    LoginDto loginResVO = loginMapper.selectById(loginDto);
    /* 없는 아이디 */
    if( loginResVO == null ) {
      returnMap.put("result", -1);
      return returnMap;
    }

    int errCnt = loginResVO.getErrCnt();

    MemberDto memberDto = loginMapper.matchPassword(loginDto);

    if( memberDto != null && memberDto.getErrCnt() < 5) {
      /* 로그인성공, 에러카운트 초기화 */
      loginMapper.resetErrCnt(loginDto);
      returnMap.put("result", 0);
      returnMap.put("memberDto", memberDto);
      return returnMap;
    }

    /* 틀린 비밀번호 */
    if( memberDto == null) {
      if ( errCnt < 5 ) {
        loginMapper.increaseErrCnt(loginDto);
        errCnt++;
      }
    }

    returnMap.put("result", errCnt);
    return returnMap;
  }
}
