const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const inputs = document.querySelectorAll(".date-input");
const spans = document.querySelectorAll(".purple-span");
const errors = document.querySelectorAll(".error-message");
const inputContainer = document.querySelector(".input-container");
const submitBtn = document.querySelector("#submit-btn");

const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkForErrors();
  if (!inputContainer.classList.contains("error")) {
    updateSpans();
  }
});

function checkForErrors() {
  inputContainer.classList.remove("error");
  inputs.forEach((input, index) => {
    clearErrors(index);
    if (input.value === "") showError(index, "This field is required");

    if (index === 0) {
      if (parseInt(input.value) > 31 || parseInt(input.value) < 1)
        showError(index, "Must be a valid day");
    } else if (index === 1) {
      if (parseInt(input.value) > 12 || parseInt(input.value) < 1)
        showError(index, "Must be a valid month");
    }
  });
  if (
    parseInt(inputs[2].value) > getCurrentDate().getFullYear() &&
    parseInt(inputs[1].value) - 1 >= getCurrentDate().getMonth() &&
    parseInt(inputs[0].value) >= getCurrentDate().getDate()
  )
    showError(0, "Must be in the past");
  checkDate();
}

function checkDate() {
  if (dayInput.value > daysInMonths[monthInput.value - 1])
    showError(0, "Must be a valid date");
  if (getUserDate().getTime() > getCurrentDate().getTime())
    showError(0, "Must be a past date");
}

function showError(index, message) {
  inputContainer.classList.add("error");
  errors[index].innerHTML = message;
  errors[index].style.visibility = "visible";
}

function clearErrors(index) {
  errors[index].innerHTML = "";
  errors[index].style.visibility = "hidden";
}

function getCurrentDate() {
  return new Date();
}

function getUserDate() {
  return new Date(
    parseInt(yearInput.value),
    parseInt(monthInput.value) - 1,
    parseInt(dayInput.value)
  );
}

function countDifference() {
  let yearsDiff = getCurrentDate().getFullYear() - getUserDate().getFullYear();
  let monthsDiff = getCurrentDate().getMonth() - getUserDate().getMonth();
  let daysDiff = getCurrentDate().getDate() - getUserDate().getDate();

  if (monthsDiff < 0) {
    yearsDiff--;
    monthsDiff = monthsDiff + 12;
  }
  if (daysDiff < 0) {
    monthsDiff--;
    daysDiff = daysInMonths[getUserDate().getMonth()] + daysDiff;
  }

  return [yearsDiff, monthsDiff, daysDiff];
}

function updateSpans() {
  spans.forEach((span, index) => {
    span.innerHTML = countDifference()[index];
  });
}
