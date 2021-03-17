$(function(){
    //alert("cos tam bla bla");
    var $przyciski = $('.przycisk');
    $przyciski.each(function(){
        $(this).click(function(){
            console.log("Działa", $(this)[0].value);
            let value = $(this)[0].value;
            var body = {
                id: 10
            }
            //console.log(body.id);
        //     axios({
        //         method: 'post',
        //         url: '/test',
        //         body: body.id
        //     })
        //         .then(res => console.log(res.data))
        //         .catch(err => console.error(err));
        // });
        axios
            .post('/test', {}, {params: 2137})
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    });
    });
});