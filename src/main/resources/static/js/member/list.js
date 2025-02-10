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
  const id = $('#saveId').val();
  const name = $('#saveName').val();
  const phone = $('#savePhone').val();
  const zipCode = $('#saveZipCode').val();
  const basicAddr = $('#saveBasicAddr').val();
  const detailAddr = $('#saveDetailAddr').val();
  const grade = $('#saveGrade :selected').val();


  const data = {
    id : id,
    name : name,
    phone : phone,
    zipCode : zipCode,
    basicAddr : basicAddr,
    detailAddr : detailAddr,
    grade : grade
  }

  if( !regexId(id) ) {
    alert('아이디는 영어, 숫자만 입력 가능합니다.')
  }

  if( !regexId(name) ) {
    alert('이름은 한글만 입력 가능합니다.');
  }

  if( !regexId(phone) ) {
    alert('핸드폰 번호는 숫자, 하이픈(-)만 입력 가능합니다.');
  }


  console.log('data: ', data);

  $.ajax({
    url : getContextPath() + '/member/save',
    type :'POST',
    contentType : 'application/json',
    data : JSON.stringify(data),
    success : function(data){
      if ( data > 0) {
        alert ("등록되었습니다.");
        modalCancelBtn();
      } else {
        alert("정상 등록되지 않았습니다.");
        return;
      }
    },
    error : function (request, status, error) {

    }
  })

}

/* 회원 등록 모달 닫기 */
const modalCancelBtn = () => {
  $('#saveId').val('');
  $('#saveName').val('');
  $('#savePhone').val('');
  $('#saveZipCode').val('');
  $('#saveBasicAddr').val('');
  $('#saveDetailAddr').val('');
  $('#saveGrade option[value="C"]').prop("selected", true);
  $(".modal").css("display", 'none');
}

/* 카카오 주소 검색 팝업 */
const searchAddrBtn = () => {
  addrPopup = new daum.Postcode({
    oncomplete: function(data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      $('#saveZipCode').val(data.zonecode);
      $('#saveBasicAddr').val(data.roadAddress);
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