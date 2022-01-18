/////////////////////////////////////////////////////////////
// Variables Iniciales

const base_url = "http://localhost:8080"
let base_url_front = "http://127.0.0.1:5500/front"
let paymentBox = document.getElementById('box-payment');




/////////////////////////////////////////////////////////////
// Funciones


let main = () => {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const token = params.token;
    let tokenElement = document.getElementById("token");
    // params.delete("token")
    // TODO: remove token from url
    console.log(params.token);

    if (token) {
        tokenElement.innerText = token;
        getUserData(token);
        getAllOrders(token);
    } else
        window.location.href = `/front/index.html`

}


//1) Evento para mostrar las ordenes
function getAllOrders(token) {

    const url_orders = `${base_url}/pedidos`;

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

            let divOut = document.getElementById('txtOut');
            let txtOut = "";
            for (let k in data) {
                txtOut += `<p id="orderId2"> Order Id: <b>${data[k].id}</b><br/></p>`;
                txtOut += `<p id="orderState"> State: <b>${data[k].state}</b><br/></p>`;
                txtOut += `<p id="orderPrice">Total Price: <b>${data[k].totalPrice}</b><br/></p>`;
                txtOut += `<p id="orderAddress"> Address: <b>${data[k].AgendaId}</b><br/></p>`;

                let arrayState = ["Pending for the payment", "Payment completed. Preparing Order"];

                if (!arrayState.includes(data[k].state)) {
                    txtOut += `
        <button class="btn btn-success btn-payment"  data-order-id="${data[k].id}" data-token-user="${token}">
          Pay the order
        </button>
          <hr/>`
                }

            }

            divOut.innerHTML = txtOut;

            //Seleccionamos todo lo que tenga la clase ".btn-payment"
            const buttonsPayment = document.querySelectorAll('.btn-payment')

            //Le agregamos eventos
            for (let i = 0; i < buttonsPayment.length; i++) {
                buttonsPayment[i].addEventListener('click', payment_event);
            }


        })
        .catch(error => {
            console.log(error)
        });

}


//2 Función para mostrar datos del usuario 
let getUserData = (token) => {

    const url_usuarios = `${base_url}/usuarios`;

    fetch(url_usuarios, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authentication': `${token}`
            }
        })
        .then(response => response.json())
        .then(data => {

            let divUserData = document.getElementById('userData');
            let txtOut = "";


            txtOut += `<p id="userId"> Id: <b>${data.id}</b><br/></p>`;
            //txtOut += `<p id="username"> Username: <b>${data.username}</b><br/></p>`;
            txtOut += `<p id="name">Name: <b>${data.name}</b><br/></p>`;
            //txtOut += `<p id="email"> Email: <b>${data.email}</b><br/></p>`;
            //txtOut += `<p id="mobile"> Mobile: <b>${data.mobile}</b><br/></p>`;
            txtOut += `<p id="disabled"> Disabled Status: <b>${data.disabled}</b><br/><hr/></p>`;

            divUserData.innerHTML = txtOut;

        })
        .catch(error => {
            console.log(error)
        });


}

/////////////////////////////////////////////////////////////
// Invocaciones

main();



/////////////////////////////////////////////////////////////
// Eventos 



// 1) Función que consume los endpoints de paypL
let payment_event = (e) => {

    e.preventDefault();
    const orderId = e.target.getAttribute("data-order-id");
    const token = e.target.getAttribute("data-token-user");

    window.location.href = `${base_url_front}/payments.html?orderId=${orderId}&token=${token}`;


}