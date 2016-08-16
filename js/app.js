onload = function () {
  var employees = [{'firstName': 'John', 'lastName': 'Doe', 'salary': '$ 1000', 'position': 'Manager'}]
    , numberOfEmployees = employees.length
    , MAX_AVERAGE_SALARY = 2000
    , $numberOfEmployees = document.getElementById('numberOfEmployees')
    , $averageSalary = document.getElementById('averageSalary')
    , $limit = document.getElementById('limit')
    , limit = 1
    , $addEmployeeButton = document.getElementsByClassName('addEmployee')[0];

  $addEmployeeButton.addEventListener('click', function (event) {
    var newEmployee = createEmployee(employees);
    if (typeof newEmployee === 'string') {
      alert (newEmployee);
      return;
    }

    var isDuplicate = employees.some(function (employee) {
      return employee.firstName === newEmployee.firstName && employee.lastName === newEmployee.lastName;
    });
    if (isDuplicate) {
      alert('This employee has already added');
      return;
    }

    employees.push(newEmployee);
    addNewEmployee(newEmployee);

    numberOfEmployees = employees.length;
    $numberOfEmployees.innerHTML = numberOfEmployees;
    $limit.setAttribute('min', numberOfEmployees);
    
    var averageSalary = calculateAverageSalary(employees);
    $averageSalary.innerHTML = averageSalary;

    if (numberOfEmployees === limit || averageSalary >= MAX_AVERAGE_SALARY) {
      this.hidden = true;
    }
  });

  $limit.addEventListener('change', function (event) {
    limit = parseInt($limit.value);
    var isHidden = $addEmployeeButton.hidden;

    if (numberOfEmployees >= limit && !isHidden) {
      $addEmployeeButton.hidden = true;
    } else if (numberOfEmployees < limit && isHidden) {
      $addEmployeeButton.hidden = false;
    }
  });
}

function createEmployee(arrayOfEmployees) {
  var newEmployee = {};
  var employee = arrayOfEmployees[0];
  var employeeInfo = Object.keys(employee);

  for (var index = 0; index < employeeInfo.length; index++) {
    var category = employeeInfo[index]
      , categoryData = prompt('Enter ' + category, employee[category]);

    valid = validation(categoryData, category);
    if (!valid) {
      categoryData = categoryData.trim();
      newEmployee[category] = categoryData;
    } else {
      return valid;
    }
  }
  return newEmployee;
}

function validation(textForValidation, category) {
  var result, regExp;

  if (!textForValidation) {
    return 'You didn\'t enter ' + category;
  } else {
    if (category === 'salary') {
      regExp = /^\$ [\d]+$/;
    } else {
      regExp = /^[a-zA-Z]+[ a-zA-Z]*$/;
    }
    result = regExp.test(textForValidation);
  }
  if (!result) {
    result = 'Wrong format of ' + category;
  } else {
    result = false;
  }
  return result;
}

function addNewEmployee(newEmployee) {
  var $employeeList = document.getElementsByClassName('employeeList')[0]
    , $employee = $employeeList.firstElementChild.cloneNode(true)
    , employeeInfo = Object.keys(newEmployee);

  employeeInfo.forEach(function (item) {
    $employee.querySelector('span.' + item).innerHTML = newEmployee[item];
  });
  $employeeList.appendChild($employee);
}

function calculateAverageSalary(arrayOfEmployees) {
  var sum = arrayOfEmployees.reduce(function (sum, employee) {
    var salary = parseInt(employee.salary.slice(1));
    return sum + salary;
  }, 0);
  return parseInt(sum / arrayOfEmployees.length);
}