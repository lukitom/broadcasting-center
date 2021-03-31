$(function(){
    function wyswietl(data){
        let div = $("#containerM");
        // ! TODO: wstawić czyszczenie po ponownym wyszukiwaniu
        // while (div.hasChildNodes) {
        //     div.removeChild(div.firstChild);
        // }
        $(".resutlSearch").remove()
        $("#textForm")[0].value = '';
        data.forEach(function(element){
            let p = document.createElement("p");
            let a = document.createElement("a");
            p.setAttribute("class", "resutlSearch");
            a.setAttribute("class", "link");
            a.setAttribute("target", "_blank");
            a.setAttribute("href", element.prewiewURL);
            a.innerHTML = "Posłuchaj fragmentu";
            p.innerHTML = element.title + ' / ' + element.artist + " - ";
            p.append(a);
            div.append(p);
        });
    }

    var przycisk = $(".przycisk");
    przycisk.on("click", function(){
        const wartosc = $('#textForm')[0].value;
        const path = `/api/find?search=${wartosc}&type=track`;

        axios
            .get(path)
            .then(res => wyswietl(res.data))
            .catch(err => console.error(err));
    });
});