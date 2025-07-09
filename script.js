let bookArray = [];
const key = "key";
const aggiungi = document.getElementsByClassName("aggiungi");
const scartaButtons = document.getElementsByClassName("pippo");
const carrello = document.getElementById("carrello");
console.log(JSON.parse(localStorage.getItem(key)));
if (localStorage.getItem(key)) {
  bookArray = JSON.parse(localStorage.getItem(key));
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

/*const canccar = document.getElementsByClassName("canccar");
for (j = 0; j < canccar.length; j++) {
  canccar[j].addEventListener("click", (e) => {
    let ar = JSON.parse(localStorage.getItem(key));
    let t = e.target.closest(".list-group-item");
    let text = t.querySelector("span").innerText;
    console.log(text);
    let ind = ar.findIndex((p) => p.title === text);
    ar.splice(ind, 1);
    localStorage.setItem(key, JSON.stringify(ar));
    console.log(ar);
    t.style.visibility = "hidden";
  });
}*/

const scarta = function (e) {
  let ar = JSON.parse(localStorage.getItem(key));
  let t = e.target.closest(".list-group-item");
  let text = t.querySelector("span").innerText;
  console.log(text);
  let ind = ar.findIndex((p) => p.title === text);
  ar.splice(ind, 1);
  localStorage.setItem(key, JSON.stringify(ar));
  console.log(ar);
  t.remove();
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
      const cards = document.getElementById("cards-row");
      for (let i = 0; i < data.length; i++) {
        cards.innerHTML += `<div class="col col-12 col-md-6 col-lg-4 mb-3">
            <div class="card " style="height: 450px" >
              <img
                src=${data[i].img}
                class="card-img-top"
                alt="copertina"
                style="height: 200px; width: auto; object-fit: contain "
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text flex-grow-1">Prezzo: <span class="price">${data[i].price}</span>$</p>
                <a href="javascript:void(0)" class="btn btn-success mb-1 aggiungi" >Aggiungi al carrello</a>
                <a href="javascript:void(0)" class="btn btn-danger pippo" >Scarta</a>
              </div>
            </div>
          </div>`;
      }

      for (let i = 0; i < scartaButtons.length; i++) {
        scartaButtons[i].addEventListener("click", (e) => {
          console.log(e.target.closest(".col"));
          e.target.closest(".col").style.display = "none";
        });
      }

      for (let i = 0; i < aggiungi.length; i++) {
        aggiungi[i].addEventListener("click", (e) => {
          let cont = e.target.closest(".card-body");
          let h = cont.querySelector("h5").textContent;
          console.log(cont.querySelector("h5").textContent);
          let book = data.find((p) => p.title === h);
          console.log(book);
          bookArray.push(data.find((p) => p.title === h));
          localStorage.setItem(key, JSON.stringify(bookArray));

          carrello.innerHTML += `
          <li class="list-group-item d-flex justify-content-between"><span class="span">
              ${book.title}</span><a onclick="scarta(event)" href="javascript:void(0)" class="btn btn-danger canccar"
                >Scarta</a
              >
            </li>
          `;
        });
      }
    })
    .catch((err) => {
      console.log("errore", err);
    });
};

getData();
