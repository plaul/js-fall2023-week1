//EDIT A CAR START
const SERVER_URL = "http://localhost:8080/api/cars"
document.getElementById("btn-find-car-edit").onclick = findCarToEdit
const btnSave = document.getElementById("btn-save")
btnSave.onclick = saveCar
document.getElementById("btn-new-car").onclick = newCar
document.getElementById("btn-cancel").onclick = cancel
document.getElementById("btn-allow-edit").onclick = allowEdit
document.getElementById("btn-delete").onclick = deleteCar
const form = document.getElementById("add-edit-car-form")
const idInputField = document.getElementById("input-id")
let method = "POST"
let id = "";

function findCarToEdit(evt) {
  id = idInputField.value
  if (id === "") {
    setStatus("No id provided", true)
    return
  }
  setReadOnlyOnAllInput(true)
  setStatus("")
  //Observe admin to get bestDiscount
  fetch(SERVER_URL + "/admin/" + id)
    .then(res => {
      if (!res.ok) {
        throw new Error("Car not found")
      }
      return res.json()
    })
    .then(car => setInputFields(car))
    .catch(err => setStatus(err, true))
}

function setInputFields(car) {
  idInputField.value = ""
  document.getElementById("id").value = car.id
  document.getElementById("brand").value = car.brand
  document.getElementById("model").value = car.model
  document.getElementById("pricePrDay").value = car.pricePrDay
  document.getElementById("bestDiscount").value = car.bestDiscount
}

function saveCar(evt) {
  evt.preventDefault()
  const formData = new FormData(form);
  const carToSubmit = Object.fromEntries(formData)
  if (carToSubmit.brand === "" ||
    carToSubmit.model === "" ||
    carToSubmit.pricePrDay === "" ||
    carToSubmit.bestDiscount === "") {
    setStatus("Required input fields missing", true)
    return
  }
  //If we have an id, it must be an edit
  const carId = document.getElementById("id").value
  const POST_PUT_URL = carId === "" ? SERVER_URL : SERVER_URL + "/" + id

  const options = {
    "method": method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carToSubmit)
  }
  fetch(POST_PUT_URL, options)
    .then(res => res.json())
    .then(car => {
      setStatus(`Car successful added/edited (${JSON.stringify(car)}) `)
      resetInputFields()
    })
}

function resetInputFields() {
  form.reset()
  const inputs = form.querySelectorAll("input")
  inputs.forEach(input => input.readOnly = true)
}

function setReadOnlyOnAllInput(isReadonly) {
  const inputs = form.querySelectorAll("input")
  inputs.forEach(input => input.readOnly = isReadonly)
  btnSave.disabled = isReadonly;
}

function allowEdit(evt) {
  evt.preventDefault()
  if (document.getElementById("id").value === "") {
    setStatus("No car loaded to edit", true)
  }
  setReadOnlyOnAllInput(false)
  method = "PUT"
}

function newCar(evt) {
  evt.preventDefault()
  resetInputFields()
  setReadOnlyOnAllInput(false)
  setStatus("")
  document.getElementById("brand").focus()
  method = "POST"
}
function cancel(evt) {
  evt.preventDefault()
  setReadOnlyOnAllInput(true)
  resetInputFields()
  setStatus("")
}

function deleteCar(evt) {
  evt.preventDefault()
  const idToDelete = document.getElementById("id").value
  if (idToDelete === "") {
    setStatus("No car loaded to delete", true)
    return
  }
  fetch(SERVER_URL + "/" + idToDelete,{method:"DELETE"})
    .then(res => {
      if (!res.ok) {
        throw new Error("Could not delete car")
      }
      return res.json()
    })
    .then(()=>{
      setStatus(`Car '${idToDelete}' was deleted"`)
      resetInputFields()
    })
    .catch(error => setStatus(error,true))
}

function setStatus(msg, isError) {
  const status = document.getElementById("status-add-edit")
  status.style.color = isError ? "red" : "black"
  status.innerText = msg
}