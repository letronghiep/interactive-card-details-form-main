var form = document.querySelector("#form");
var cardHolderName = document.querySelector("#cardholder-name");
var cardNum = document.querySelector("#card-number");
var cvc = document.querySelector(".card-cvc");
var errorName = document.querySelector(".errorName");
var errorNum = document.querySelector(".errorNum");
var errorExp = document.querySelector(".errorExp");
var errorCVC = document.querySelector(".errorCVC");
var submitBtn = document.querySelector(".submit-btn");
var continueBtn = document.querySelector(".continue-btn");
var cardNumDis = document.querySelector(".card-number-display");
var cardHolderDis = document.querySelector(".cardholder-display");
var expiryMonth = document.querySelector(".expiry-month-display");
var expiryYear = document.querySelector(".expiry-year-display");
var cvcDis = document.querySelector(".cvc-display");
var month = document.querySelector(".month");
var year = document.querySelector(".year");
var thankYou = document.querySelector(".thank-you-header");
var thankYouSection = document.querySelector(".thank-you");
function inputName() {
  cardHolderDis.innerHTML = cardHolderName.value;
  thankYou.innerHTML = `Thank you ${cardHolderName.value}`;
  if (cardHolderDis.innerHTML === "") {
    cardHolderDis.innerHTML = cardHolderName.placeholder;
  }
}
function inputNumber() {
  var value = cardNum.value;
  var formattedCard = value.replace(/[^\d]/g, "");
  formattedCard = formattedCard.substring(0, 16);
  // Split the card number is groups 4
  let cardNumSection = formattedCard.match(/\d{1,4}/g);
  if (cardNumSection !== null) {
    formattedCard = cardNumSection.join(" ");
  }
  if (value !== formattedCard) {
    cardNum.value = formattedCard;
  }
  cardNumDis.innerHTML = cardNum.value;
  if (cardNum.value === "") {
    cardNumDis.innerHTML = cardNum.placeholder;
  }
}
cardNum.addEventListener("input", function (e) {
  inputNumber();
});
function displayMY(selector, selecterDisplay) {
  var Val = selector.value;
  var formattedValue = Val.replace(/[^\d]/g);
  formattedValue = formattedValue.substring(0, 2);
  selector.value = formattedValue;
  if (selector.value === "") {
    selecterDisplay.innerHTML = "";
  } else {
    selecterDisplay.innerHTML = selector.value;
  }
}
cardHolderName.addEventListener("input", function (e) {
  inputName();
});
month.addEventListener("input", function () {
  displayMY(month, expiryMonth);
  if (month.value > 12 || month.value <= 0) {
    errorExp.innerHTML = "Wrong format";

    expiryMonth.innerHTML = month.placeholder;
  } else {
    expiryMonth.innerHTML = month.value;
    errorExp.innerHTML = "";
  }
  if (month.value === "") {
    expiryMonth.innerHTML = month.placeholder;
    errorExp.innerHTML = "";
  }
});
year.addEventListener("input", function () {
  displayMY(year, expiryYear);
});

function checkVal(selecter) {
  if (selecter.value === "") {
    selecter.classList.add("invalid");
  } else {
    selecter.classList.remove("invalid");
  }
}
function inputCvc() {
  let cvcVal = cvc.value;
  cvcVal = cvcVal.substring(0, 3);
  cvc.value = cvcVal;
  if (cvc.value === "") {
    cvcDis.innerHTML = "000";
  } else {
    cvcDis.innerHTML = cvc.value;
  }
}
cvc.addEventListener("input", function (e) {
  inputCvc();
});
// function validateForm() {
//   inputs.forEach((item) => {
//     item.addEventListener("blur", function (e) {
//         checkVal(e.target);

//     });
//   });
// }
// validateForm();
function validateForm() {
  function validateName() {
    let regName = /^[A-Z a-z]+$/;
    if (cardHolderName.value.match(regName)) {
      errorName.innerHTML = "";
    } else {
      errorName.innerHTML = "Please enter cardholder name!";
      return;
    }
  }
  function validateNum() {
    if (cardNum.value.length > 0 && cardNum.value.length < 16) {
      errorNum.innerHTML = "Wrong format!";
    } else if (cardNum.value === "") {
      errorNum.innerHTML = "Can't be blank!";
    } else {
      errorNum.innerHTML = "";
    }
  }
  function validateExpiry() {
    let regMonth = /^(0[0-9]1|1[1-2]){2}$/;
    let regYear = /^[0-9][0-2]{2}$/;
    if (regMonth.test(month.value)) {
      errorExp.innerHTML = "";
    } else if (regMonth.test(month.value) && regYear.test(year.value)) {
      errorExp.innerHTML = "";
    } else if (month.value === "") {
      errorExp.innerHTML = "Can't be blank";
    } else {
      errorExp.innerHTML = "Wrong format";
    }
  }
  function validateCvc() {
    let regCvc = /^[0-9]{3}$/;
    if (cvc.value === "") {
      errorCVC.innerHTML = "Can't be blank";
      ("'");
    } else if (cvc.value.match(regCvc)) {
      errorCVC.innerHTML = "";
    } else {
      errorCVC.innerHTML = "Wrong format!";
    }
  }
  validateName();
  validateNum();
  validateExpiry();
  validateCvc();
  if (
    cardHolderDis.innerHTML == cardHolderName.placeholder ||
    cardNumDis.innerHTML == cardNum.placeholder ||
    expiryMonth.innerHTML == "00" ||
    expiryYear.innerHTML == "00" ||
    cvcDis.innerHTML == "000" ||
    (cardNum.value.length > 0 && cardNum.value.length < 16)
  ) {
    return false;
  } else {
    return true;
  }
}
// Submit Button

submitBtn.addEventListener("click", function (e) {
  validateForm();
  if (validateForm() == false) {
    e.preventDefault();
  } else {
    e.preventDefault();
    form.classList.add("is-confirmed");
    thankYouSection.classList.remove("is-confirmed");
  }
});

// Continue
continueBtn.addEventListener("click", function (e) {
  e.preventDefault();
  thankYouSection.classList.add("is-confirmed");
  form.classList.remove("is-confirmed");
  cardHolderDis.innerHTML = cardHolderName.placeholder;
  cardNumDis.innerHTML = cardNum.placeholder;
  expiryMonth.innerHTML = "00";
  expiryYear.innerHTML = "00";
  cvcDis.innerHTML = "000";
  cardHolderName.value = "";
  cardNum.value = "";
  month.value = "";
  year.value = "";
  cvc.value = "";
});
// aos
AOS.init({
  offset: 200,
  delay: 100,
  duration: 400,
  easing: "ease",
  once: false,
  mirror: false,
  anchorePlacement: "top-bottom",
});
