$(function () {
  console.log('document is ready');
    var totalAnnualSalary = 0;

  $('form').on('submit', function (event) {
    event.preventDefault();


    var formData = {};
    var formAsArray = $(this).serializeArray();
    console.log($(this).serializeArray());
    formAsArray.forEach(function (input) {
      formData[input.name] = input.value;
    });

    totalAnnualSalary += parseFloat(formData.employeeAnnualSalary);
    console.log(totalAnnualSalary);
    console.log(parseFloat(formData.employeeAnnualSalary));
    appendMonthlyExpenditure(totalAnnualSalary);

    appendDom(formData);

    clearForm();
  });
});




function appendMonthlyExpenditure(annSalExp) {

  var $totalAnnualSalaries = annSalExp;

  $('#monthlySalary').find('h2').text("Monthly Salary Expenditure: $" + (Math.round( parseFloat($totalAnnualSalaries)*100/12))/100 );
};



function appendDom(emp) {
  var $empFName = $('<div class="employee"></div>');
  var $empLName = $('<div class="employee"></div>');
  var $empID = $('<div class="employee"></div>');
  var $empJobTitle = $('<div class="employee"></div>');
  var $empAnnualSalary = $('<div class="employee"></div>');


//  var $emp = $('<div class="employee"></div>'); // create a div jQuery object

  $empFName.append('<p>' + emp.employeeFirstName + '</p>');
  $empLName.append('<p>' + emp.employeeLastName + '</p>');
  $empID.append('<p>' + emp.employeeIdNumber + '</p>');
  $empJobTitle.append('<p>' + emp.employeeJobTitle + '</p>');
  $empAnnualSalary.append('<p>$ ' + emp.employeeAnnualSalary + '</p>');



//  $emp.append(emp.employeeIdNumber + ' ' + emp.employeeJobTitle + ' ');
//  $emp.append(emp.employeeAnnualSalary)

//  $('#employees').append($emp); // append our div to the DOM
    $('#employees').find('.FName').append($empFName);
    $('#employees').find('.LName').append($empLName);
    $('#employees').find('.ID').append($empID);
    $('#employees').find('.Title').append($empJobTitle);
    $('#employees').find('.AnnSal').append($empAnnualSalary);


}

function clearForm() {
  $('form').find('input[type=text]').val('');
  $('form').find('input[type=number]').val('');
}
