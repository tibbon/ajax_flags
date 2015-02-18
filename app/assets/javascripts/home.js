var pointer = 0,
      number,
      max = pointer + number;


function populateCountries(request_number) {
  number = request_number;
  max = pointer + number;
  Handlebars.registerPartial("country", $('#country-template').html());
  var source = $('#country-template').html(),
        template = Handlebars.compile(source);
  $.ajax({
    url: '/',
    dataType: 'json',
    type: 'GET'
  }).done(function(data){
    for(pointer; pointer < max && data.countries.length; pointer ++) {
      var templateHTML = template(data.countries[pointer]);
      console.log(templateHTML);
      $('#content').append(templateHTML);
    }
  });

}

function populateAll() {
  Handlebars.registerPartial("country", $('#country-template').html());
  var source = $('#data-template').html(),
        template = Handlebars.compile(source),
        templateHTML;
  $.ajax({
    url: '/',
    dataType: 'json',
    type: 'GET'
  }).done(function(data){
    var templateHTML = template(data);
    $('#content').append(templateHTML);
    countryInfo();
  });

}

function countryInfo(){

  $('.flag').click(function(){
    var classInfo = this.className;
    $.ajax({
      url: '/',
      dataType: 'json',
      type: 'GET'
    }).done(function(data){
      debugger;
      for(var i = 0; i < data.countries.length; i++) {
        if(classInfo.slice(-2) === data.countries[i].abbreviation) {
          alert("This country was entered in the database on " + data.countries[i].created_at + " and has an id number of " + data.countries[i].id );
        }
      }
    });
  });

}



// Create the event bindings
$(document).ready(function() {
  // Demonstrates using a function name as the event handler instead of including the function inside (like we're used to seeing)
  // This is useful when re-binding events (certain events are unbound when clicking on the various buttons)
  $('#populate-button').click(populateCountriesClick);
  $('#all-button').click(function(){
    allButtonClick();
  });

  $('#reset-button').click(function() {
    // this function resets the button and scroll bindings, and sets pointer to 0
    pointer = 0;
    $('#content').html('');
    $(window).unbind('scroll').scroll(scrollFunction);
    $('#populate-button').unbind('click').click(populateCountriesClick);
    $('#all-button').unbind('click').click(allButtonClick);

  });

  $(window).scroll(scrollFunction);

  function scrollFunction() {
    var win = $(window);
    // Infinite scroll math!
    if(win.height() + win.scrollTop() >= $(document).height()) {
      if (pointer < 272) {
        populateCountries(parseInt($('#step-input').val()));
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

  function populateCountriesClick(){
    $(window).unbind('scroll');
    $('#all-button').unbind('click');
    number = parseInt($('#step-input').val());
    console.log(number);
    populateCountries(number);
  }

});
