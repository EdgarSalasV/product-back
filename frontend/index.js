"use strict";
//MAIN
//DOCUMENT ON READY
document.addEventListener("DOMContentLoaded", async () => {
  console.log("¡DOM LOADED!");
  let productList = await getFetchProducts();
  appendProductListToTable(productList);

  listeninEvents();
});

//FUNCTIONS
async function getFetchProducts() {
  const productList = await getFetchShared("productos");
  return await productList;
}
async function getFetchShared(pathUrl) {
  let resultFetch = await fetch(`http://127.0.0.1:3003/${pathUrl}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
  });
  resultFetch = await resultFetch.json();
  return resultFetch.data;
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
      a.innerHTML = `<a href="#" id="${element}" class="a" >${producto[element]}</a>`;
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

function listeninEvents() {
  //#region TAG a CLASS a
  let aList = document.getElementsByClassName("a");
  for (const a of aList) {
    a.addEventListener("click", async (e) => {
      await showProductDetails(e);
    });
  }
  //#endregion TAG a CLASS a
}

async function showProductDetails(e) {
  // let productsDetailDiv = document.getElementById("productsDetail");
  const value = e.target.textContent;
  const productType = e.target.id;

  const producto = await getFetchProductByCodigoSku(value, productType);

  const viewProduct = getviewProduct(producto);
  //  appendProductToDivDetail(viewProduct);

  // productsDetailDiv.style.display = "block";
  // productsDetailDiv.innerHTML = `<h1>${value}<h1>`;
}

async function getFetchProductByCodigoSku(id, productType) {
  let url = `producto?${productType}=${id}`;
  const producto = await getFetchShared(url);
  return producto;
}
async function getviewProduct(producto) {
  const { descripcion, created_at } = producto;
  const descripcionArray = descripcion.split(".");

  let h1 = document.createElement("h1");
  let p = document.createElement("p");
  const textContentH1 = document.createTextNode(descripcionArray[0]);
  h1.appendChild(textContentH1);
  // h1.innerHTML = descripcionArray[0];
  descripcionArray.forEach((parrafo, i) => {
    const textContentP = document.createTextNode(parrafo);
    if (i > 0) p.appendChild(textContentP);
  });

  let productDiv = document.getElementById("productsDetail");

  let newDiv = document.createElement("div");

  newDiv.setAttribute("id", "productsDetail");
  newDiv.appendChild(h1);
  newDiv.appendChild(p);
  document.querySelector(".containerMain").replaceChild(newDiv, productDiv);
  newDiv.style.display = "block";
}
