/////////////////////////////////////////////////////////////
// Variables Iniciales

const base_url = "http://localhost:8080/api/v1"
let form = document.getElementById('login_form');
form.addEventListener('submit', showAllProducts);


/////////////////////////////////////////////////////////////
// Eventos

//Mostramos Todos los productos en Pantalla
function showAllProducts(e) {

  // prevent the browser redirection
  e.preventDefault();  
  
  // Get all inputs from the form 
  //let order = document.getElementById('order').value
  let token = document.getElementById('token').value

  console.log(token)

  const url_orders = `${base_url}/products`;

  console.log(url_orders)

  fetch(url_orders, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authentication': `${token}`
    }
  })
.then(response => response.json())
.then(data => {
  console.log(data);
  form.reset();

  let divOut = document.getElementById('txtOut');
  let txtOut = "";
    for (let k in data) {
      txtOut += `<p> Name: <b>${data[k].name}</b><br/>`;
      txtOut += `Description: <b>${data[k].description}</b><br/>`;
      txtOut += `Picture: <b>${data[k].picture}</b><br/>`;
      txtOut += `Price: <b>${data[k].price}</b><br/>`;
      txtOut += `Id: <b>${data[k].id}</b><br/><hr/></p>`;
    }
    divOut.innerHTML = txtOut;
})
.catch(error => console.log(error));
}
