$(document).ready(function() {
  var searchForm = $('#search-form');
  var searchButton = $('#search-btn');
  var randomButton = $('#random-btn');
  var resultsHTML = $('.results-container');
  var resultsListHTML = $('.results-container ul');
  var errorsHTML = $('.errors-container');
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
    var resultsTemplate = _.template($('#results-template').html());
    resultsHTML.empty();
    resultsHTML.append(resultsTemplate({
      results: json.query.pages
    }));
    errorsHTML.hide();
    resultsHTML.show('fade');
  }

  function fail(errors, defaultError) {
    errorsHTML.empty();
    errors = errors || 'An error has occured, please try again';
    var errorsTemplate = _.template($('#errors-template').html());
    errorsHTML.empty();
    errorsHTML.append(errorsTemplate({
      errorMessage: errors
    }));
    errorsHTML.show('fade');
  }

  function fetchData() {
    var keyword = $('#search-input').val();
    if (keyword) {
      urlData.gsrsearch = keyword;
      $.ajax({
          method: 'GET',
          datatype: 'json',
          url: url,
          data: urlData
        })
        .done(success)
        .fail(fail);
    } else {
      fail('Please specify a search keyword');
    }
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
