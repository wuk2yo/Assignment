
const infoBtn = () => {

}

const logoutBtn = () => {
  $.ajax({
    url : getContextPath() + '/logout',
    type : 'POST',
    contentType: 'application/json',
    success : function(data){
      location.href = getContextPath()
    },
    error : function (request, status, error) {

    }

  })
}


window.addEventListener('load', () => {
  $('#infoBtn').on('click', infoBtn);
  $('#logoutBtn').on('click', logoutBtn);
})