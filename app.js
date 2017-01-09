$(function () {
  var totalAnnualSalary = 0;
  var formData = {};

  $('form').on('submit', function (event) {
    event.preventDefault();



    var formAsArray = $(this).serializeArray();

    formAsArray.forEach(function (input) {
      formData[input.name] = input.value;
    });

    formData.employeeSecretID = Math.floor((Math.random() * 10000000) + 1);
    // an identifier for deleting data later.

    if (isNaN(parseFloat(formData.employeeAnnualSalary))) {
      formData.employeeAnnualSalary = 0;
    } // ensures enployeeAnnualSalary is a number.

    totalAnnualSalary += parseFloat(formData.employeeAnnualSalary);
    appendMonthlyExpenditure(totalAnnualSalary);

    appendDom(formData);

    clearForm();
  });


  $('#employees').on('click','button', function()  {
    // this function deletes data and resets the totalAnnualSalary
    if (!confirm("Are you sure you want to delete :" + formData.employeeFirstName + " " + formData.employeeLastName + "?")) {
      return;
    };
    
    var getSecretID = $(this).attr('data-secID');
    // takes the data attribute from the button clicked
    // var getSecretID = $(this).data('secID'); //doesn't work...?

    var removedEmployeeSalary = parseFloat($('.AnnSal').children("." + getSecretID).text().split(' ')[1]);
    // to get the value of the annual salary being deleted.
    // .split because the "$ " added to the salary.
    totalAnnualSalary -= removedEmployeeSalary;
    appendMonthlyExpenditure(totalAnnualSalary);
    // modifies the global variable totalAnnualSalary and re-appends to the DOM

    $("." + getSecretID).remove(); // removes everything with the secretID class!
  });

});


function appendMonthlyExpenditure(annSalExp) {
  // function for appending the Monthly Salary in the Dom
  var $totalAnnualSalaries = annSalExp;

  $('#monthlySalary').find('h2').text("Monthly Salary Expenditure: $" + (Math.round( parseFloat($totalAnnualSalaries)*100/12))/100 );
};


function appendDom(emp) {
  // function for appending the employee data in the DOM
  var $empFName = $('<div class="'+ emp.employeeSecretID  +'"></div>');
  var $empLName = $('<div class="'+ emp.employeeSecretID  +'"></div>');
  var $empID = $('<div class="'+ emp.employeeSecretID  +'"></div>');
  var $empJobTitle = $('<div class="'+ emp.employeeSecretID  +'"></div>');
  var $empAnnualSalary = $('<div class="'+ emp.employeeSecretID  +'"></div>');
  var $empDeleteButton = $('<div class="'+ emp.employeeSecretID  +'"></div>');


  $empFName.append('<p>' + emp.employeeFirstName + '</p>');
  $empLName.append('<p>' + emp.employeeLastName + '</p>');
  $empID.append('<p>' + emp.employeeIdNumber + '</p>');
  $empJobTitle.append('<p>' + emp.employeeJobTitle + '</p>');
  $empAnnualSalary.append('<p>$ ' + emp.employeeAnnualSalary + '</p>');
  $empDeleteButton.append('<p><button data-secID="' + emp.employeeSecretID + '">Delete</button></p>');
  // add data to delete button for catching the specific class for use during deletion.

  $('#employees').find('.FName').append($empFName);
  $('#employees').find('.LName').append($empLName);
  $('#employees').find('.ID').append($empID);
  $('#employees').find('.Title').append($empJobTitle);
  $('#employees').find('.AnnSal').append($empAnnualSalary);
  $('#employees').find('.DelButton').append($empDeleteButton);
};


function clearForm() {
  // this function resets all of the values in the form for entering another ee
  $('form').find('input[type=text]').val('');  // resets all text to empty string
  $('form').find('input[type=number]').val(null); // resets number to null
}
