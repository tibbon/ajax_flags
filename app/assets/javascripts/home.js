var pointer = 0;


function populateCountries() {
  if (pointer < 272) {
    $.ajax({
      type: 'GET',
      url: '/data',
      dataType: 'json'
    }).done(function(data){
      console.log(data);
      Handlebars.registerPartial("country", $('#country-template').html());
      var max = pointer + parseInt($('#step-input').val(), 10);
      var source = $('#country-template').html();
      var template = Handlebars.compile(source);
      var templateHTML;
      for(pointer; pointer < max; pointer++ ) {
        // console.log(pointer);
        // console.log(source);
        // console.log(template)
        templateHTML = template(data.data[pointer]);
        console.log(templateHTML)
        $('#content').append(templateHTML);
      }
    });
  }
}



function populateAll() {
  $.ajax({
    type: 'GET',
    url: '/data',
    dataType: 'json'
  }).done(function(data){
    console.log(data);
    Handlebars.registerPartial("country", $('#country-template').html());
    var source = $('#data-template').html();
    var template = Handlebars.compile(source);
    var templateHTML = template(data);
    $('#content').append(templateHTML);
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
