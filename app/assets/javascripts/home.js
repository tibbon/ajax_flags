var pointer = 0;

function populateCountries() {

  $.ajax({
          type: 'GET',
          url: '/countries/' + $('#step-input').val() + '/' + pointer,
          dataType: 'json'
      }).done(function(data) {
          if (data) {
            pointer += parseInt($('#step-input').val(), 10);
          }
          else {
            pointer = false;
          }

          var source = $("#country-template").html();
          var template = Handlebars.compile(source);
          _.each(data, function(country) {
            $('#content').append(template(country));
          });
      }).fail(function(request, status, error) {
          //Error handling
          console.log(error);
      });
}

function populateAll() {
  $.ajax({
          type: 'GET',
          url: '/countries/all/' + pointer,
          dataType: 'json'
      }).done(function(data) {
          pointer = false;
          var source = $("#country-template").html();
          var template = Handlebars.compile(source);
          _.each(data, function(country) {
            $('#content').append(template(country));
          });
      }).fail(function(request, status, error) {
          //Error handling
          console.log(error);
      });
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
