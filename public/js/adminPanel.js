$(function () {
  $('.przycisk').on('click', function () {
    const wartosc = $('#textForm')[0].value;
    if(wartosc.length == 0) return null;
    const path = `/api/find?search=${wartosc}&type=playlist`;

    axios
      .get(path)
      .then(res => wyswietl(res.data, res.status))
      .then($('#textForm')[0].value = '')
      .catch(err => {
        let div = $("#containerM");
        let P = document.createElement("p");
        P.setAttribute("class", "akapit");
        P.innerHTML = "Brak playlist";
        div.append(P);
        console.error(err);
      });
  })
});

function wyswietl(data, status) {
  //#region Usunięcie jeśli coś już jest
  if ($("#containerM").children().length >= 1) {
    $("#containerM").each(function () {
      $(this).remove($(this).firstChild);
    });

    let divn = `<div class="containerMid" id="containerM"></div>`;
    $("#searchPlaylist").append(divn);
  }
  //#endregion

  let div = $("#containerM");

  if (data.result != null) {
    data.result.forEach(function (element) {
      var p = `<p><a href="/spotify/playlist/${element.id}">${element.name}<a/></p>`;
      $('#containerM').append(p);
    });
  }
  else {
    let p = `<p class="akapit">Brak playlist</p>`;
    div.append(p);
  }
}