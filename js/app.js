//$.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&gsrsearch=te&gsrlimit=10&prop=info|extracts&inprop=url&format=json&callback=?", processResult);

$(document).ready(function() {
  var searchForm = $('#search-form');
  var searchButton = $('#search-btn');
  var randomButton = $('#random-btn');
  var results = $('.results-container');


  var url = 'https://en.wikipedia.org/w/api.php';
  var urlData = {
    action: 'query',
    generator: 'search',
    gsrnamespace: 0,
    gsrlimit: 10,
    prop: 'extracts',
    titles: 'Main page',
    exsentences: 1,
    exlimit: 10,
    exintro: 1,
    explaintext: 1,
    format: 'json',
    origin: '*'
  };


  function success(json) {
    resultTemplate = _.template($('#results-template').html());
    $('.results-container').append(resultTemplate({
      results: json.query.pages
    }));
    $('.results-container').show();
  }

  function fail() {
    console.log('fail');
  }

  function fetchData() {
    urlData.gsrsearch = $('#search-input').val();
    $.ajax({
        method: 'GET',
        datatype: 'json',
        url: url,
        data: urlData
      })
      .done(success)
      .fail(fail);
  }


  function handleSubmitEvents() {
    searchButton.click(function() {
      fetchData();
    });
    searchForm.submit(function(event) {
      fetchData();
      event.preventDefault();
    });
  }



  function init() {
    handleSubmitEvents();
  }




  init();
});
