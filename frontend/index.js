document.addEventListener("DOMContentLoaded", async () => {
  console.log("¡Estamos en vivo!");
  let productList = await getProducts();
  appendProductListToTable(productList);

  
});

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
    console.log("properties", properties);
    properties.forEach((element) => {
      let td = document.createElement("td");
      let textContent = document.createTextNode(producto[element]);
      td.appendChild(textContent);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
    console.log("WD");
  }
}
