/////////////////////////////////////////////////////////////
// Variables Iniciales


const base_url = "http://localhost:8080/api/v1"
let form = document.getElementById('login_form');
let buttons = document.querySelectorAll('.providers button');

////////////////////////////
// Agregamos Eventos

form.addEventListener('submit', login_event);

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', login_provider_event);
}



/////////////////////////////////////////////////////////////
// Eventos


//1) Evento #1 para el Login Normal
function login_event(e) {

 

  ////////////////////////////
  // Variables
    
  e.preventDefault(); // prevent the browser redirection
  let message = document.getElementById('message');
  let token = document.getElementById('token');
  let tokenContainer = document.getElementById('token-container');
  let formData = new FormData(form); //Get all inputs from the form 
  let data = Object.fromEntries(formData); //Convert data into json 
  let url_login=`${base_url}/usuarios/login`

  message.textContent = "";
    
    

  if(data.user.includes("@")){
      console.log("Es un correo");
      data = { email: data.user, password: data.password};
      console.log(data);
  }else {
      console.log("Es un username");
      data = { username: data.user, password: data.password};
      console.log(data);
  }
    
  fetch(url_login, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
  )
  .then(response => response.json())
  .then(data => {

      form.reset();
      
      if(data.Message)
        message.textContent = data.Message;
      else{
        
        //window.alert(data.token);
        //token.textContent = data.token;
        //tokenContainer.style.display = "block";

        console.log(data.token)
        localStorage.setItem('tokenLS', `${data.token}`);
        window.location.href = `/front/orders.html?token=${data.token}`

        /*setTimeout(()=>{
          tokenContainer.style.display = "none";
        },5000)*/
      }
  })
  .catch( error=>{
      form.reset();
      console.log(error)
  });

} /// End of the event
  



//2) Evento para poder logearse
function login_provider_event(event) {
  event.preventDefault();
  const provider = this.getAttribute("data-provider");
  console.log(provider);

  if (provider === "auth0")
    window.location.href = `${base_url}/auth/${provider}/login`;
  else
  window.location.href = `${base_url}/auth/${provider}`;

}



/////////////////////////////////////////////////////////////
// Otros


//No es una funcion es solo para poder capturar el token
//Aqui solo capturamos el token
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const token = params.token;
// params.delete("token")
// TODO: remove token from url
console.log(params.token);