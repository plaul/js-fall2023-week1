let originalCountry;
let originalFill;
document.getElementById("svg2").onclick = (evt) => {
  const countryNode = evt.target;
  const isoCode = countryNode.id;
  console.log(isoCode)
  if (originalCountry) {
    originalCountry.style.fill = originalFill
    document.getElementById("info").style.display = "none"
  }
  originalCountry = countryNode
  originalFill = countryNode.style.fill
  countryNode.style.fill = "steelblue"
  if (isoCode === "ru") {
    countryNode.style.fill = "black"
  }
  if (isoCode === "ua") {
    countryNode.style.fill = "green"
  }


  if (isoCode.length > 2) {
    return //No need to fetch
  }
  fetch(`https://countries.plaul.dk/api/countries/${isoCode}`)
    .then(res => {
      if (res.status >= 400) {
        throw `No data found for [${isoCode}`
      }
      return res.json()
    })
    .then(info => {
      document.getElementById("info").style.display = "block"
      document.getElementById("name").innerText = info.name.common
      document.getElementById("un-member").innerText = info.unMember
      let currencies = [];
      for (prop in info.currencies) {
        currencyAsString = `${prop}, name: ${info.currencies[prop].name}, symbol: ${info.currencies[prop].symbol}`
        currencies.push(currencyAsString)
      }
      document.getElementById("currencies").innerText = currencies.join(" - ")
      document.getElementById("capital").innerText = info.capital
      document.getElementById("borders").innerText = info.borders.join(",")
      document.getElementById("flag").setAttribute("src", info.flag)

    })
    .catch(e => console.log(e))


}