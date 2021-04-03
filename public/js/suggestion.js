$(function () {
    function wyswietl(data, status) {

        if ($("#containerM").children().length >= 1) {
            $("#containerM").each(function () {
                $(this).remove($(this).firstChild);
            });
            let divn = document.createElement("div");
            divn.setAttribute("class", "containerMid");
            divn.setAttribute("id", "containerM");
            $("#main").append(divn);
        }
        let div = $("#containerM");

        if (data.result != null) {
            data.result.forEach(function (element) {
                let p = document.createElement("p");
                let btn = document.createElement("button");
                p.setAttribute("class", "akapit");
                p.innerHTML = element.title + ' / ' + element.artist;
                if (element.prewiewURL != null) {
                    let a = document.createElement("a");
                    a.setAttribute("class", "link");
                    a.setAttribute("href", element.prewiewURL);
                    a.innerHTML = "Posłuchaj fragmentu";
                    p.innerHTML += " - ";
                    p.append(a);
                }
                div.append(p);
            });
        }
        else {
            let P = document.createElement("p");
            P.setAttribute("class", "akapit");
            P.innerHTML = "Brak piosenek";
            div.append(P);
        }
    }
    $(".przycisk").on("click", function () {
        const wartosc = $('#textForm')[0].value;
        const path = `/api/find?search=${wartosc}&type=track`;

        axios
            .get(path)
            .then(res => wyswietl(res.data, res.status))
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