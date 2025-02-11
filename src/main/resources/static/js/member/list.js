const elementsRegx = function (data) {

  const regexMap = [
    {
      division: 'id',
      regx: /^[a-zA-Z0-9]+$/,
      message : {
        regx : '아이디는 영어, 숫자만 입력 가능합니다.',
        empty : '아이디를 입력해주세요.'
      }
    },
    {
      division: 'name',
      regx: /^[ㄱ-ㅎ|가-힣]+$/,
      message : {
        regx : '이름은 한글만 입력 가능합니다.',
        empty : '이름을 입력해주세요.'
      }
    },
    {
      division: 'phone',
      regx: /^[0-9-]*$/,
      message : {
        regx : '핸드폰 번호는 숫자, 하이픈(-)만 입력 가능합니다.',
        empty : '핸드폰 번호를 입력해주세요.'
      }
    },{
      division: 'zipCode',
      regx: /^[0-9]*$/,
      message : {
        regx : '우편번호는 숫자만 입력 가능합니다.',
        empty : '우편번호를 입력해주세요.'
      }
    },{
      division: 'basicAddr',
      message : {
        empty : '도로명 주소를 입력해주세요.'
      }
    },{
      division: 'detailAddr',
      message : {
        empty : '상세주소를 입력해주세요.'
      }
    },{
      division: 'grade',
      message : {
        empty : '등급을 입력해주세요.'
      }
    },
  ];

  /*$.map(regexMap, function(value, index) {
    const dataValue = data[value.division];

    console.log(`division => ${value.division} | result => ${value.regx.test(dataValue) ? '성공' : value.msg}`);

    const result = value.regx.test(dataValue);

  });*/


  for (let i = 0; i < regexMap.length; i++) {
    const regexMapValues = regexMap[i];
    const dataValue = data[regexMapValues.division];

    // 빈값
    if (dataValue === '') {
      return regexMapValues.message.empty;
    }

    // 정규식
    if ( regexMapValues.regx !== undefined ) {
      if (!regexMapValues.regx.test(dataValue)) {
        return regexMapValues.message.regx;
      }
    }
  }

  return '';
}

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

  const regxMessage = elementsRegx(data);

  if (regxMessage) {
    alert(regxMessage);
    return;
  }

  $.ajax({
    url : getContextPath() + '/member/save',
    type :'POST',
    contentType : 'application/json',
    data : JSON.stringify(data),
    success : function(data){
      if ( data === 0) {
        alert ("등록되었습니다.");
        modalCancelBtn();
        document.location.href = document.location.href;
        return;
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