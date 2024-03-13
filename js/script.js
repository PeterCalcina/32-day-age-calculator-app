let inputYear = document.getElementById('year');
let inputMonth = document.getElementById('month');
let inputDay = document.getElementById('day');

let errors = document.querySelectorAll('.error');
let labels = document.querySelectorAll('label');

// Resultado de la fecha

let year_result = document.getElementById('year_result');
let month_result = document.getElementById('month_result');
let day_result = document.getElementById('day_result');

function calculateAge() {
  let isValidDay = validateDay();
  let isValidMonth = validateMonth();
  let isValidYear = validateYear();

  isValidDay ? hiddenError(0, inputDay) : showError(0, inputDay);
  isValidMonth ? hiddenError(1, inputMonth) : showError(1, inputMonth);
  isValidYear ? hiddenError(2, inputYear) : showError(2, inputYear);

  if (isValidDay && isValidMonth && isValidYear) {
    let actualDate = moment();
    let birthday = moment(`${inputYear.value}-${inputMonth.value}-${inputDay.value}`);

    let preciseDate = moment.preciseDiff(actualDate, birthday, true);

    year_result.textContent = preciseDate.years;
    month_result.textContent = preciseDate.months;
    day_result.textContent = preciseDate.days;
  }
}

function validateYear() {
  let currentYear = new Date().getFullYear();

  if (inputYear.value === '') {
    errors[2].textContent = 'This field is required';
    return false;
  } else if (inputYear.value > currentYear) {
    errors[2].textContent = 'Must be in the past';
    return false;
  }

  return true;
}

function validateMonth() {
  if (inputMonth.value === '') {
    errors[1].textContent = 'This field is required';
    return false;
  } else if (inputMonth.value < 1 || inputMonth.value > 12) {
    errors[1].textContent = 'Must be a valid month';
    return false;
  }

  return true;
}

function validateDay() {
  if (inputDay.value === '') {
    errors[0].textContent = 'This field is required';
    return false;
  } else if (!isValidDay(inputDay.value, inputMonth.value, inputYear.value)) {
    errors[0].textContent = 'Must be a valid date';
    return false;
  }

  return true;
}

function isValidDay(day, month, year) {
  // Obtenemos el último día del mes
  let lastDay = new Date(day, month, 0).getDate();

  // Verificamos si el día ingresado es válido
  if (day < 1 || day > lastDay) {
    return false;
  }

  // Verificamos si el año es bisiesto
  let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  // Verificamos si el día 29 de febrero es válido en un año bisiesto
  if (month === 2 && day === 29 && !isLeapYear) {
    return false;
  }

  return true;
}

/* Mostramos los mensajes de error */
function showError(position, input) {
  errors[position].classList.add('active');
  labels[position].classList.add('error');
  input.classList.add('error');
}

/* Ocultamos los mensajes de error */
function hiddenError(position, input) {
  errors[position].classList.remove('active');
  labels[position].classList.remove('error');
  input.classList.remove('error');
}