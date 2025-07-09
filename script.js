let bookArray = [];
let fdata = [];
const key = "key";
const aggiungi = document.getElementsByClassName("aggiungi");
const scartaButtons = document.getElementsByClassName("pippo");
const carrello = document.getElementById("carrello");
const cards = document.getElementById("cards-row");

console.log(JSON.parse(localStorage.getItem(key)));

if (localStorage.getItem(key)) {
  bookArray = JSON.parse(localStorage.getItem(key));
} else {
  bookArray = [];
}
for (let j = 0; j < bookArray.length; j++) {
  carrello.innerHTML += `
  <li class="list-group-item d-flex justify-content-between"><span class="span">
              ${bookArray[j].title}</span><a onclick="scarta(event)" href="javascript:void(0)" class="btn btn-danger canccar"
                >Scarta</a
              >
            </li>
          `;
}

const drawCards = function () {
  for (let i = 0; i < fdata.length; i++) {
    cards.innerHTML += `<div class="col col-12 col-md-6 col-lg-4 mb-3">
            <div class="card " style="height: 450px" >
              <img
                src=${fdata[i].img}
                class="card-img-top"
                alt="copertina"
                style="height: 200px; width: auto; object-fit: contain "
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${fdata[i].title}</h5>
                <p class="card-text flex-grow-1">Prezzo: <span class="price">${fdata[i].price}</span>$</p>
                <a href="javascript:void(0)" class="btn btn-success mb-1 aggiungi" onclick="aggiungiCarrello(event)" >Aggiungi al carrello</a>
                <a href="javascript:void(0)" class="btn btn-danger pippo" onclick="elimina(event)" >Scarta</a>
              </div>
            </div>
          </div>`;
  }
};

const scarta = function (e) {
  let t = e.target.closest(".list-group-item");
  let text = t.querySelector("span").innerText;
  console.log(text);
  let ind = bookArray.findIndex((p) => p.title === text);
  bookArray.splice(ind, 1);
  localStorage.setItem(key, JSON.stringify(bookArray));
  console.log(bookArray);
  t.remove();
};

const aggiungiCarrello = function (e) {
  let cont = e.target.closest(".card-body");
  let h = cont.querySelector("h5").textContent;
  console.log(cont.querySelector("h5").textContent);
  let book = fdata.find((p) => p.title === h);
  console.log(book);
  bookArray.push(book);
  localStorage.setItem(key, JSON.stringify(bookArray));
  carrello.innerHTML += `
          <li class="list-group-item d-flex justify-content-between"><span class="span">
              ${book.title}</span><a onclick="scarta(event)" href="javascript:void(0)" class="btn btn-danger canccar"
                >Scarta</a
              >
            </li>
          `;
};

const elimina = function (e) {
  console.log(e.target.closest(".col"));
  e.target.closest(".col").style.display = "none";
};

const getData = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("La chiamata non torna 200");
      }
    })
    .then((data) => {
      console.log(data);

      fdata = data;
      drawCards();
    })
    .catch((err) => {
      console.log("errore", err);
    });
};

getData();
