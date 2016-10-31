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
  // /w/api.php?action=query&format=json&origin=*&prop=extracts&titles=Main+Page&generator=search&exsentences=2&exlimit=10&exintro=1&explaintext=1&exsectionformat=raw&gsrsearch=tesla
    // https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=tesla&callback=angular.callbacks._1

  function success(json) {
    console.log(json);
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
