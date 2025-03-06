let addrPopup;

let memberList = [];


/* 정규식, message 정의 */
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



const changeSearchType = () => {
    const searchType = $("#searchType option:selected").val();

    switch(searchType) {
      case 'searchTypeCreateTime':
        $('#searchDateDiv').show();
        $('#searchGradeDiv').hide();
        $('#searchWordDiv').hide();
        $('#searchWord').val('');
        $('#searchGrade').val('C').prop('selected', true);
        break;
      case 'searchTypeGrade' :
        $('#searchDateDiv').hide();
        $('#searchGradeDiv').show();
        $('#searchWordDiv').hide();
        $('#searchWord').val('');
        $('#searchStartDate').val('');
        $('#searchEndDate').val('');
        break;
      default:
        $('#searchDateDiv').hide();
        $('#searchGradeDiv').hide();
        $('#searchWordDiv').show();
        $('#searchGrade').val('C').prop('selected', true);
        $('#searchStartDate').val('');
        $('#searchEndDate').val('');
        break;

    }


}

function searchBtn(){
  const searchType = $('#searchType option:selected').val();
  const searchWord = $('#searchWord').val();
  const searchStartDate = $('#searchStartDate').val();
  const searchEndDate = $('#searchEndDate').val();
  const searchGrade = $('#searchGrade').val();

  if ( searchType === 'searchTypeCreateTime') {
    if ( searchStartDate === '' || searchEndDate === '') {
      alert('조회 날짜를 선택해주세요.')
      return;
    }
    const startDate = new Date(searchStartDate);
    const endDate = new Date(searchEndDate);

    if ( startDate > endDate ) {
      alert('조회 날짜 기간을 확인해주세요.')
      return;
    }

  }



  let params = {
    searchType : searchType,
    searchWord : searchWord === undefined ? '' : searchWord,
    searchStartDate : searchStartDate === undefined ? '' : searchStartDate,
    searchEndDate: searchEndDate === undefined ? '' : searchEndDate,
    searchGrade : searchGrade

  }

  $.ajax({
    url : getContextPath() + '/member/list',
    type : 'POST',
    data : params,
    success : function(res) {
      console.log("res",res);
      memberList = res.memberList;
      pageBtn(1);

    },
    error : function (request, status, error) {

    }
  })
}

/**
 * 페이징 처리
 */
function pageBtn(page){

  const pageSize = 10;
  const recordSize = 10;
  const totalCount = memberList.length;

  const currentPage = page;

    let html = '';
    let pagingHtml = '';

    if ( totalCount > 0 ) {

      const startPage = Math.floor((currentPage - 1) / pageSize ) * pageSize + 1;
      const totalPageSize = Math.ceil(totalCount / recordSize);
      const endPage = Math.min(totalPageSize, startPage + pageSize - 1);
      const limit = (currentPage-1) * recordSize;
      const offset = limit + recordSize;
      const list = memberList.slice(limit, offset);

      list.forEach(member => {
        html +=
                `
                  <tr>
                    <td><input type="checkbox"/></td>
                    <td>순번</td>
                    <td>${member.id}</td>
                    <td>${member.name}</td>
                    <td>${member.phone}</td>
                    <td>${member.basicAddr}</td>
                    <td>${member.createTime}</td>
                    <td class="${member.grade}">
                      ${member.grade === 'C' ? '일반 사용자' :
                        member.grade === 'B' ? '중간 관리자' :
                        member.grade === 'A' ? '관리자' :
                        '알 수 없음'}
                    </td>
                    <td>${member.errCnt}</td>
                  </tr>
                `;
      })

      pagingHtml +=
                    `
                      <nav aria-label="Page navigation example">
                        <ul class="pagination">
                    `;


      pagingHtml +=
          currentPage > 1
        ?
          `
            <li class="page-item"><a class="page-link" href="#" onclick="pageBtn(1)">처음</a></li>
            <li class="page-item"><a class="page-link" href="#" onclick="pageBtn(${currentPage - 1})">이전</a></li>
          `
        :
          `
            <li class="page-item disabled"><a class="page-link">처음</a></li>
            <li class="page-item disabled"><a class="page-link">이전</a></li>
          `;

      for ( let i = startPage; i <= endPage; i++ ) {
        pagingHtml +=
            currentPage === i
            ? `<li class="page-item active" aria-current="page"><a class="page-link" href="#">${i}</a></li>`
            : `<li class="page-item"><a class="page-link" href="#" onclick="pageBtn(${i})">${i}</a></li>`;

      }
      pagingHtml +=
          currentPage < totalPageSize
          ?
            `
              <li class="page-item"><a class="page-link" href="#" onclick="pageBtn(${currentPage + 1})">다음</a></li>
              <li class="page-item"><a class="page-link" href="#" onclick="pageBtn(${totalPageSize})">끝</a></li>
            `
          :
            `
              <li class="page-item disabled"><a class="page-link">다음</a></li>
              <li class="page-item disabled"><a class="page-link">끝</a></li>
            `;

      pagingHtml += `
                        </ul>
                      </nav>
                    `;

    } else {
      html =  `
                 <td colspan="9">
                    <div class="no_data_msg">검색된 결과가 없습니다.</div>
                 </td>
              `
      pagingHtml += `
                      <nav aria-label="Page navigation example">
                        <ul class="pagination">
                          <li class="page-item disabled"><a class="page-link">처음</a></li>
                          <li class="page-item disabled"><a class="page-link">이전</a></li>
                          <li class="page-item">
                            <a class="page-link" href="#">1</a>
                          </li>
                          <li class="page-item disabled"><a class="page-link">다음</a></li>
                          <li class="page-item disabled"><a class="page-link">끝</a></li>
                        </ul>
                      </nav>  
                    `
      }
      $('#list').html(html);
      $('#paging').html(pagingHtml);

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



$(document).ready(function(){
  $('#searchBtn').on('click', searchBtn);
  $('#pageBtn').on('click', pageBtn);
  $('#saveBtn').on('click', saveBtn);
  $('#deleteBtn').on('click', deleteBtn);
  $('#modalSaveBtn').on('click', modalSaveBtn);
  $('#modalCancelBtn').on('click', modalCancelBtn);
  $('#searchAddrBtn').on('click', searchAddrBtn);
  $('#searchType').on('change', changeSearchType);

})

$(window).on('load', function(){
  searchBtn();
});