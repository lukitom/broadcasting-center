$(function () {
  $('.przycisk').on('click', function () {
    const wartosc = $('#textForm')[0].value;
    if(wartosc.length == 0) return null;
    const path = `/api/find?search=${wartosc}&type=playlist`;

    console.log(`Wartość: ${wartosc}`);
    console.log(`Ścieżka: ${path}`);

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

    let divn = document.createElement("div");
    divn.setAttribute("id", "containerMid");
    divn.setAttribute("id", "containerM");
    $("#searchPlaylist").append(divn);
  }
  //#endregion

  let div = $("#containerM");

  if (data.result != null) {
    data.result.forEach(function (element) {
      console.log(element)
      // let p = document.createElement("p");
      // let btn = document.createElement("button");
      // p.setAttribute("class", "akapit");
      // p.innerHTML = element.title + ' / ' + element.artist;
      // if (element.prewiewURL != null) {
      //   let a = document.createElement("a");
      //   a.setAttribute("class", "link");
      //   a.setAttribute("href", element.prewiewURL);
      //   a.innerHTML = "Posłuchaj fragmentu";
      //   p.innerHTML += " - ";
      //   p.append(a);
      // }
      // div.append(p);


      var p = `<p><a href="/spotify/playlist/${element.id}">${element.name}<a/></p>`;

      $('#containerM').append(p);
    });
  }
  else {
    let P = document.createElement("p");
    P.setAttribute("class", "akapit");
    P.innerHTML = "Brak playlist";
    div.append(P);
  }
}