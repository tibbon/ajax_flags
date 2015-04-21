var pointer = 0,
    ajax_switch = true;

function populateCountries() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/',
    dataType: 'json'
  }).done(function(data) {
    var increment = parseInt($('#step-input').val(), 10);
    var source = $('#each-country-template').html();
    var template = Handlebars.compile(source);
    var max_limit = _.min([data.countries.length, pointer + increment]);
    for (i = pointer; i < max_limit; i++) {
      $('#content').append(template(data.countries[i]));
    }
    pointer += increment;
    if (pointer >= max_limit) {
      ajax_switch = false;
    }
    addClickEvent();
    console.log(data);
  });
}

function addClickEvent() {
  $('#content').children().unbind('click').click(function() {
      alert(this.dataset.id + " was created at " + this.dataset.created);
  });
}

function populateAll() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/',
    dataType: 'json'
  }).done(function(data) {
    $('#content').html('');
    var source = $('#all-country-template').html();
    var template = Handlebars.compile(source);
    $('#content').append(template(data));
    addClickEvent();
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
    ajax_switch = true;
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
      if (ajax_switch === true) {
        populateCountries();
      }
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
