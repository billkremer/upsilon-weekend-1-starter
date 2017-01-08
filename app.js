$(function () {
//  console.log('document is ready');
  var totalAnnualSalary = 0;

  $('form').on('submit', function (event) {
    event.preventDefault();


    var formData = {};
    var formAsArray = $(this).serializeArray();

    formAsArray.forEach(function (input) {
      formData[input.name] = input.value;
    });

    formData.employeeSecretID = Math.floor((Math.random() * 10000000) + 1);
    // an identifier for deleting data later.
    console.log(formData.employeeSecretID);

    if (isNaN(parseFloat(formData.employeeAnnualSalary))) {
      formData.employeeAnnualSalary = 0;
    } // ensures enployeeAnnualSalary is a number.

    totalAnnualSalary += parseFloat(formData.employeeAnnualSalary);
    appendMonthlyExpenditure(totalAnnualSalary);

    appendDom(formData);

    clearForm();
  });


  $('#employees').click('button', function()  {
    var temp = $(this).find('.employee').attr('class').split(' ')[1];
    // searches up the DOM and returns the secretID of the button pressed
    $("." + temp).remove(); // removes everything with the secretID class!
  });

});



function appendMonthlyExpenditure(annSalExp) {
  // function for appending the Monthly Salary in the Dom
  var $totalAnnualSalaries = annSalExp;

  $('#monthlySalary').find('h2').text("Monthly Salary Expenditure: $" + (Math.round( parseFloat($totalAnnualSalaries)*100/12))/100 );
};


function appendDom(emp) {
  var $empFName = $('<div class="employee '+ emp.employeeSecretID  +'"></div>');
  var $empLName = $('<div class="employee '+ emp.employeeSecretID  +'"></div>');
  var $empID = $('<div class="employee '+ emp.employeeSecretID  +'"></div>');
  var $empJobTitle = $('<div class="employee '+ emp.employeeSecretID  +'"></div>');
  var $empAnnualSalary = $('<div class="employee '+ emp.employeeSecretID  +'"></div>');
  var $empDeleteButton = $('<div class="employee '+ emp.employeeSecretID  +'"></div>');


  $empFName.append('<p>' + emp.employeeFirstName + '</p>');
  $empLName.append('<p>' + emp.employeeLastName + '</p>');
  $empID.append('<p>' + emp.employeeIdNumber + '</p>');
  $empJobTitle.append('<p>' + emp.employeeJobTitle + '</p>');
  $empAnnualSalary.append('<p>$ ' + emp.employeeAnnualSalary + '</p>');
  $empDeleteButton.append('<p><button>Delete</button></p>');


  $('#employees').find('.FName').append($empFName);
  $('#employees').find('.LName').append($empLName);
  $('#employees').find('.ID').append($empID);
  $('#employees').find('.Title').append($empJobTitle);
  $('#employees').find('.AnnSal').append($empAnnualSalary);
  $('#employees').find('.DelButton').append($empDeleteButton);
};


function clearForm() {
  $('form').find('input[type=text]').val('');
  $('form').find('input[type=number]').val(null);
}
