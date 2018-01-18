$(document).ready(function () {

  //Dropdowns
  $('select').material_select();

  //Side Nav - Landing Page
  // Initialize collapse button
  $(".button-collapse").sideNav();
  $('.button-collapse').sideNav('hide');

  //Modal Dialog for profile page
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  
  //Modal Dialog Date Picker
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

});