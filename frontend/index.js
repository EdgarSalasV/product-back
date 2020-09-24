"use strict";
document.addEventListener("DOMContentLoaded", async () => {
  console.log("¡Estamos en vivo!");
  let productList = await getProducts();
  appendProductListToTable(productList);
});

//FUNCTIONS

async function getProducts() {
  const dataFetch = await fetch("http://127.0.0.1:8080/products", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
  });
  let productList = await dataFetch.json();

  return await productList.data;
}

function appendProductListToTable(productList) {
  let properties = Object.keys(productList[0]).filter(
    (i) => i == "codigo" || i == "sku"
  );
  let tbody = document.getElementById("tbody");
  let thead = document.getElementById("thead");

  for (const producto of properties) {
    let td = document.createElement("th");
    const textContent = document.createTextNode(producto);
    td.appendChild(textContent);
    thead.appendChild(td);
  }

  for (const producto of productList) {
    let tr = document.createElement("tr");
    properties.forEach((element) => {
      let td = document.createElement("td");
      let a = document.createElement("a");
      a.innerHTML = `<a href="#" onClick="showProductDetails()">${producto[element]}</a>`;
      td.appendChild(a);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
}

function filterFunction() {
  let input, filter;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();

  let tbody = document.getElementById("tbody");
  let trList = tbody.getElementsByTagName("tr");
  let td = tbody.getElementsByTagName("td");

  for (let i = 0; i < trList.length; i++) {
    let tds = trList[i].querySelectorAll("td");

    let txtValueCodigo = tds[0].textContent;
    let txtValueSKu = tds[1].innerText;
    const isMatching =
      txtValueCodigo.toUpperCase().indexOf(filter) > -1 ||
      txtValueSKu.toUpperCase().indexOf(filter) > -1;
    if (isMatching) {
      trList[i].style.display = "";
    } else {
      trList[i].style.display = "none";
    }
  }
}
function showProductDetails() {
  let productsDetailDiv = document.getElementById("productsDetail");
  productsDetailDiv.style.display = "block";
}
