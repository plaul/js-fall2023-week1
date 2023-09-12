
document.getElementById("abv-btn").onclick = filterOnAbv

fetchBeers()

function fetchBeers() {
    fetch("https://api.punkapi.com/v2/beers")
        .then(res => res.json())
        .then(data => {
            makeRows(data)
            beers = data;
        })
}

function makeRows(beers) {
    const rows = beers.map(b => `<tr>
        <td>${b.name}</td>
        <td>${b.tagline}</td>
        <td>${b.abv}</td>
        <td>${b.ibu}</td>    
      `).join("\n")
    const row = document.getElementById("table-rows")
    document.getElementById("table-rows").innerHTML = rows
}

function filterOnAbv() {
    alert("Filtering on ABV")
    const abvMin = document.getElementById("filter-abv").value
    const filteredBeers = beers.filter(beer => beer.abv > abvMin);
    makeRows(filteredBeers)
}


