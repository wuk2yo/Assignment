// 영어, 숫자만 입력가능
function regexId(str) {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.text(str);
}

// 한글만 입력 가능
function regexName(str) {
  const regex = /^[ㄱ-ㅎ|가-힣]+$/;
  return regex.text(str);
}

// 숫자, 하이픈만 허용
function regexPhone(str) {
  const regex = /[^0123456789-]/g;
  return regex.text(str);
}



// URL ContextPath 가져 오기
function getContextPath(){
  var hostIndex = location.href.indexOf( location.host ) + location.host.length;
  return location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
}

