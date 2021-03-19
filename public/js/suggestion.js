$(function(){
    var wartosc = $('.textForm').value;
        function wyswietl(data){
            let div = $("#containerM");
            // ! TODO: wstawić czyszczenie po ponownym wyszukiwaniu
            // while (div.hasChildNodes) {  
            //     div.removeChild(div.firstChild);
            // }
            data.forEach(function(element){
                let p = document.createElement("p");
                let a = document.createElement("a");
                a.setAttribute("class", "link");
                a.setAttribute("href", element.prewiewURL);
                a.innerHTML = "Posłuchaj fragmentu";
                p.innerHTML = element.title + " / " + element.artist + " - ";
                p.append(a);
                div.append(p);
            });
        }
    $przycisk = $(".przycisk");
    $przycisk.on("click", function(){
        axios
            .post('/test', {}, {params: wartosc})
            .then(res => wyswietl(res.data))
            .catch(err => console.error(err));
    });
});