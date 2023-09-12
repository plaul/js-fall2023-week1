//@ts-check


const SERVER_URL = "http://localhost:8080/api/cars"


//GET ALL CARS START
document.getElementById("btn-get-all").onclick = getAllUsers

function getAllUsers() {
  fetch(SERVER_URL)
    .then(res => res.json())
    .then(cars => makeTable(cars))
    .catch(err => document.getElementById("error-all-cars").innerText = err)
}

function makeTable(cars) {
  const tableRows = cars.map(car => `
     <tr>
       <td>${car.id}</td>
       <td>${car.brand}</td>
       <td>${car.model}</td>
       <td>${car.pricePrDay}</td>
     </tr>
   `).join("\n")
  //OK this week, from next week and forward you have to protect against XSS
  document.getElementById("tbody").innerHTML = tableRows
}
//GET ALL CARS END

//GET A SINGLE CAR START
document.getElementById("btn-find-car").onclick = findCar

function findCar() {
  const id = /** @type {HTMLInputElement} */ (document.getElementById("input-car-id")).value;
  fetch(SERVER_URL + '/' + id)
    .then(res => {
      if (!res.ok) {
        throw new Error("Car not found")
      }
      return res.json()
    })
    .then(car => renderUserDetails(car))
    .catch(error => document.getElementById("err-find-car").innerText = error)

}

function renderUserDetails(car) {
  document.getElementById("car-id").innerText = car.id
  document.getElementById("car-brand").innerText = car.brand
  document.getElementById("car-model").innerText = car.model
  document.getElementById("car-price").innerText = car.pricePrDay

}
//GET A SINGLE CAR END




//ADD A CAR START

const formAddCar = /** @type {HTMLFormElement} */  (document.getElementById('new-car-form'));
document.getElementById("add-new-btn").onclick = newCar
document.getElementById("btn-submit-car").onclick = submitCar

function submitCar (e) {
  e.preventDefault();
  const formData = new FormData(formAddCar);
  const carDataFromForm = Object.fromEntries(formData)
  console.log(carDataFromForm)
  const options = {
    method: 'POST',
    body: JSON.stringify(carDataFromForm),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(SERVER_URL, options)
   .then(res=>res.json())
   .then(result =>  document.getElementById("new-car-status").innerText =
    "New car added with ID: " + result.id + `(${JSON.stringify(result)})`)
}

function newCar(evt ){
  evt.preventDefault()
  document.getElementById("brand-id").value=""
  document.getElementById("model-id").value=""
  document.getElementById("pricePrDay-id").value=""
  document.getElementById("bestDiscount-id").value=""

}

//ADD A CAR END


