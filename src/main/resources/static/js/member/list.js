let addrPopup;

/**
 * 회원 조회
 */
const searchBtn = () => {

}

/* 회원 등록 모달 오픈 */
const saveBtn = () => {
  $(".modal").css("display", 'block');
}

/**
 * 회원 삭제
 */
const deleteBtn = () => {

}

/**
 * 회원 등록
 */
const modalSaveBtn = () => {

}

/* 회원 등록 모달 닫기 */
const modalCancelBtn = () => {
  $(".modal").css("display", 'none');
}

/* 카카오 주소 검색 팝업 */
const searchAddrBtn = () => {
  addrPopup = new daum.Postcode({
    oncomplete: function(data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
      // 예제를 참고하여 다양한 활용법을 확인해 보세요.
    }
  }).open({popupKey: "addrPop"});
}



window.addEventListener('load', () => {
  $('#searchBtn').on('click', searchBtn);
  $('#saveBtn').on('click', saveBtn);
  $('#deleteBtn').on('click', deleteBtn);
  $('#modalSaveBtn').on('click', modalSaveBtn);
  $('#modalCancelBtn').on('click', modalCancelBtn);
  $('#searchAddrBtn').on('click', searchAddrBtn);
})