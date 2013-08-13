var pointer = 0;


function populateCountries() {
  console.log("clicked populate countries");
}

function populateAll() {
  console.log("clicked populate all");
}

function addHandlebarScripts() {
  $("head").append($("<script id='country-template' type='text/x-handlebars-template'><div><p><span class='flag {{abbreviation}}'></span> {{country}} ({{abbreviation}})</p></div></script>"));
  $("head").append($("<script id='data-template' type='text/x-handlebars-template'>{{#each countries}}{{> country}}{{/each}}</script>"));
}

// Create the event bindings
$(document).ready(function() {
  addHandlebarScripts();

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
