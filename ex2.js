document.getElementById("outer").onclick = (evt) => {
    const id = evt.target.id;
   
    console.log("Hi from div number: " + id)
    document.getElementById("p-text").innerText = id;
}