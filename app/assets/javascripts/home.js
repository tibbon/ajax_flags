var pointer = 0;
var currentOffset = 0;

function getCountries(limit, myOffset) {
  var offset = myOffset;
  var limit = limit;
   $.ajax({
   url: '/countries/' + limit + '/' + offset,
   dataType: 'json',
   type: 'GET'
  }).done(function(data){

    var countries = "";

    $.each(data, function(index, country) {
      countries += "<div><p><span class='flag " + country.abbreviation + "'></span> "
      + country.name + " " + country.abbreviation + "</p></div>";
    });

    $("#content").append(countries);

  }).fail(function(request, statur, error) {
    console.log(error);
  });

}

function populateCountries() {
  var definedLimit = parseInt($('#step-input').val());
  getCountries(definedLimit, currentOffset);
  currentOffset += definedLimit;
}

function populateAll() {
  getCountries(999, 0);
}



// Create the event bindings
$(document).ready(function() {
  // Demonstrates using a function name as the event handler instead of including the function inside (like we're used to seeing)
  // This is useful when re-binding events (certain events are unbound when clicking on the various buttons)
  $('#populate-button').click(populateCountries);
  $('#all-button').click(allButtonClick);
  $('#reset-button').click(function() {
    // this function resets the button and scroll bindings, and sets pointer to 0
    pointer = 0;
    currentOffset = 0;
    $('#content').html('');
    $(window).unbind('scroll').scroll(scrollFunction);
    $('#populate-button').unbind('click').click(populateCountries);
    $('#all-button').unbind('click').click(allButtonClick);
  });

  $(window).scroll(scrollFunction);

  function scrollFunction() {
    var win = $(window);
    // Infinite scroll math!
    if(win.height() + win.scrollTop() >= $(document).height()) {
      populateCountries();
    }
  }

  // Disables other buttons and scroll event so we don't get duplicate data
  // This serves as a demonstration; we could also just set pointer = false
  function allButtonClick() {
    $(window).unbind('scroll');
    $('#populate-button').unbind('click');
    $('#all-button').unbind('click');
    populateAll();
  }

});

