/////////////////////////////////////////////////////////////
// Variables Iniciales


const base_url = "http://localhost:8080/api/v1"
let form = document.getElementById('login_form');

////////////////////////////
// Agregamos Eventos

form.addEventListener('submit', login_event);




/////////////////////////////////////////////////////////////
// Eventos


//1) Evento #1 para el Login Normal
function login_event(e) {

 

  ////////////////////////////
  // Variables
    
  e.preventDefault(); // prevent the browser redirection
  let username = document.getElementById('username').value;
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let mobile = document.getElementById('mobile').value;
  let address = document.getElementById('address').value;
  let password = document.getElementById('password').value;
  let url_signin=`${base_url}/usuarios/signin`


  let userData = {
      username,
      name,
      email,
      mobile,
      address,
      password
  }

  console.log(userData);
    
  fetch(url_signin, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    }
  )
  .then(response => response.json())
  .then(data => {

      //form.reset();
      
    if(data.Message.includes('creado')){
        form.reset();
        window.alert(data.Message)
        window.location.href = `/front/index.html`
     }else
        window.alert(data.Message)
  })
  .catch( error=>{
      //form.reset();
      window.alert(error)
      console.log(error)
  });

} /// End of the event
  