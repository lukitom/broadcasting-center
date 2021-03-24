$(function(){
    function wyswietl(data){
        // ! TODO: wstawić czyszczenie po ponownym wyszukiwaniu

        if($("#containerM").children().length>=1){// coś się spierdoliło
            $("#containerM").each( function(){
                $(this).remove($(this).firstChild);
            });
            let divn = document.createElement("div");
            divn.setAttribute("class", "containerMid");
            divn.setAttribute("id", "containerM");
            $("#main").append(divn);
        }
        let div = $("#containerM");
        
        data.forEach(function(element){
            let p = document.createElement("p");
            let a = document.createElement("a");
            p.setAttribute("class", "akapit");
            a.setAttribute("class", "link");
            a.setAttribute("href", element.prewiewURL);
            a.innerHTML = "Posłuchaj fragmentu";
            p.innerHTML = element.title + ' / ' + element.artist + " - ";
            p.append(a);
            div.append(p);
        });
    }
    $(".przycisk").on("click", function(){
        const wartosc = $('#textForm')[0].value;
        const path = `/api/find?titleSearch=${wartosc}`;

        axios
            .get(path)
            .then(res => wyswietl(res.data))
            .catch(err => console.error(err));
    });
});