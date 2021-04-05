$(function () {
  $(".przycisk").on("click", function () {
    const wartosc = $('#textForm')[0].value;
    if (wartosc.length == 0) return null;
    const path = `/api/find?search=${wartosc}&type=track`;

    axios
      .get(path)
      .then(res => wyswietl(res.data, res.status))
      .then($('#textForm')[0].value = '')
      .catch(err => {
          let div = $("#containerM");
          let P = document.createElement("p");
          P.setAttribute("class", "akapit");
          P.innerHTML = "Brak piosenek";
          div.append(P);
          console.error(err);
      });
  });
});

function wyswietl(data, status) {
  //#region Usunięcie jeśli coś już jest
  if ($("#containerM").children().length >= 1) {
    $("#containerM").each(function () {
      $(this).remove($(this).firstChild);
    });

    let divn = `<div class="containerMid" id="containerM"></div>`;
    $("#main").append(divn);
  }
  let div = $("#containerM");

  if (data.result != null) {
    data.result.forEach(function (element) {
      // let btn = document.createElement("button");
      let a = ``;
      if (element.prewiewURL != null) {
        a = ` - <a href="${element.prewiewURL}" class="link">Posłuchaj fragmentu</a>`
      }

      let btn = `<a href="/spotify/addSong/${element._id}"><button>Dodaj propozycję</button></a>`;

      let p = `<p class="akapit">${element.title} / ${element.artist}${a} ${btn}</p>`;
      div.append(p);
    });
  }
  else {
    let p = `<p class="akapit">Brak piosenek</p>`;
    div.append(p);
  }
}