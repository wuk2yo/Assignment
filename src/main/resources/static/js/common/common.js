

// URL ContextPath 가져 오기
function getContextPath(){
  var hostIndex = location.href.indexOf( location.host ) + location.host.length;
  return location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
}