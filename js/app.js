//$.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&gsrsearch=te&gsrlimit=10&prop=info|extracts&inprop=url&format=json&callback=?", processResult);

$(document).ready(function() {
    var url = 'https://en.wikipedia.org/w/api.php';
    var data = {
        action: 'query',
        generator: 'search',
        gsrnamespace: 0,
        gsrsearch: 'tesla',
        gsrlimit: 10,
        prop: 'info|extracts',
        inprop: 'url',
        format: 'json',
        origin: '*'
    };

    $.ajax({
            dataType: 'json',
            url: url,
            data: data,
        }).done(success)
        .fail(fail);

    function success(json) {
        console.log(json);
    }
    function fail() {
        console.log('fail');
    }
});
