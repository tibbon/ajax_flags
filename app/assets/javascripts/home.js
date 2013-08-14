var pointer = 0;

var Country = {

  counter: 1,
  step: 5,

  populateCountries: function() {
    var source = $('#data-template').html(),
      step = Country.setStep(),
      toRender,
      templatedHTML,
      template,
      i, max;

    if(Country.counter < 271) {
     $.ajax({
        url: '/countries/'+Country.counter+'/'+step,
        type: 'get',
        dataType: 'json'
      }).done(function(data) {
          i  = Country.counter;
          max = i + parseInt(step);
          toRender = {'countries': data};
          templatedHTML = Handlebars.compile(source)(toRender);
          $('#content').append(templatedHTML);
          for(i; i < max; i++) {
            $('#country-'+i).click(function() {
              alert(this.id.split('-')[1] + ". Created on: " + $(this)[0].dataset.date.split('T')[0]);
            });
          }
          Country.counter += parseInt(step);
      });
    }
  },

  setStep: function() {
    if(Country.step != 300) {
      return $('#step-input').val();
    } else {
      return Country.step;
    }
  }
};

// Create the event bindings
$(document).ready(function() {
  // Demonstrates using a function name as the event handler instead of including the function inside (like we're used to seeing)
  // This is useful when re-binding events (certain events are unbound when clicking on the various buttons)
  Handlebars.registerPartial("country", $('#country-template').html());
  $('#populate-button').click(Country.populateCountries);
  $('#all-button').click(allButtonClick);
  $('#reset-button').click(function() {
    // this function resets the button and scroll bindings, and sets pointer to 0
    pointer = 0;
    Country.counter = 1;
    Country.step = 5;
    $('#content').html('');
    $(window).unbind('scroll').scroll(scrollFunction);
    $('#populate-button').unbind('click').click(Country.populateCountries);
    $('#all-button').unbind('click').click(allButtonClick);
  });

  $(window).scroll(scrollFunction);

  function scrollFunction() {
    var win = $(window);
    // Infinite scroll math!
    if(win.height() + win.scrollTop() >= $(document).height()) {
      Country.populateCountries();
    }
  }

  // Disables other buttons and scroll event so we don't get duplicate data
  // This serves as a demonstration; we could also just set pointer = false
  function allButtonClick() {
    $(window).unbind('scroll');
    $('#populate-button').unbind('click');
    $('#all-button').unbind('click');
    Country.step = 300;
    Country.populateCountries();
  }

});
