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
            <div class="card " style="height: 400px" >
              <img
                src=${data[i].img}
                class="card-img-top"
                alt="copertina"
                style="height: 200px; width: auto; object-fit: contain "
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text flex-grow-1">Prezzo: <span class="price">${data[i].price}</span>$</p>
                <a href="javascript:void(0)" class="btn btn-danger pippo" >Scarta</a>
              </div>
            </div>
          </div>`;
      }

      const scartaButtons = document.getElementsByClassName("pippo");
      for (let i = 0; i < scartaButtons.length; i++) {
        scartaButtons[i].addEventListener("click", (e) => {
          console.log(e.target.closest(".col"));
          e.target.closest(".col").style.display = "none";
        });
      }
    })
    .catch((err) => {
      console.log("errore", err);
    });
};

getData();
