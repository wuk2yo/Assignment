
const loginBtn = () => {
  const userId = $('#userId').val();
  const userPwd = $('#userPwd').val();

  const data = {
    'id' : userId,
    'pwd' : userPwd
  }
  console.log( data );

  $.ajax({
    url : getContextPath() + '/login',
    type : 'POST',
    contentType : 'application/json',
    data : JSON.stringify(data),
    success : function(data){
      console.log('data');
      console.log(data);


      switch (true) {
        case (data === 0):
          location.href = getContextPath() + '/member/list';
          break;
        case (data === -1):
          console.log(`아이디틀림`);
          break;
        case (data === 5):
          console.log(`잠김계정`);
          break;
        case ( data > 2 ):
          console.log(`비밀번호${data}틀림`);
          break;
        case ( data < 3 ):
          console.log(`비밀번호 틀림`);
          break;
      }
    },
    error : function(request, status, error){
    }
  })
}



window.addEventListener('load', () => {
  $('#loginBtn').on('click', loginBtn);
})