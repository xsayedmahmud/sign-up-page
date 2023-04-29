const form = document.querySelector("form");

const phonenum = document.querySelector("#phonenum");

//name validation below

const fName = document.querySelector("#fName");
const fNameLabel = document.querySelector('label[for="fName"]');
const fNameErrorMsg = document.querySelector(".fNameErrorMsg");

const lName = document.querySelector("#lName");
const lNameLabel = document.querySelector('label[for="lName"]');
const lNameErrorMsg = document.querySelector(".lNameErrorMsg");

const nameRegex = /^[a-z ,.'-]+$/i;

function validateName(nameInput, nameLabel, nameErrorMsg) {
  const nameValue = nameInput.value;
  const curNameLabel = nameLabel.textContent;

  if (nameValue === "") {
    nameErrorMsg.textContent = `Please enter a ${curNameLabel}`;
    nameLabel.style.display = "none";
  } else if (!nameRegex.test(nameValue)) {
    nameErrorMsg.textContent = `Name cannot contain special characters except ,.'-`;
    nameLabel.style.display = "none";
  } else {
    nameErrorMsg.textContent = "";
    nameLabel.style.display = "block";
  }
}

fName.addEventListener("input", () => {
  validateName(fName, fNameLabel, fNameErrorMsg);
});

fName.addEventListener("blur", () => {
  if (fName.value.length === 0) {
    fNameErrorMsg.classList.add("unfocus");
  }
  validateName(fName, fNameLabel, fNameErrorMsg);
});

fName.addEventListener("focus", () => {
  fNameLabel.classList.add("labelUp");
  if (fNameErrorMsg.classList.contains("unfocus")) {
    fNameErrorMsg.classList.remove("unfocus");
  }
});

lName.addEventListener("input", () => {
  validateName(lName, lNameLabel, lNameErrorMsg);
});

lName.addEventListener("blur", () => {
  if (lName.value.length === 0) {
    lNameErrorMsg.classList.add("unfocus");
  }

  validateName(lName, lNameLabel, lNameErrorMsg);
});

lName.addEventListener("focus", () => {
  lNameLabel.classList.add("labelUp");
  if (lNameErrorMsg.classList.contains("unfocus")) {
    lNameErrorMsg.classList.remove("unfocus");
  }
});

// email validation below

const email = document.querySelector("#email");
const emailLabel = document.querySelector('label[for="email"]');
const emailErrorMsg = document.querySelector(".emailErrorMsg");
const emailRegex =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

function validateEmail(emailInput, emailLabel, emailErrorMsg) {
  let emailValue = emailInput.value;

  if (email.value === "") {
    emailLabel.style.display = "none";
    emailErrorMsg.textContent = "Please enter an email address";
  } else if (!emailRegex.test(emailValue)) {
    emailErrorMsg.textContent = "Please enter a valid email address";
    emailLabel.style.display = "none";
  } else {
    emailErrorMsg.textContent = "";
    emailLabel.style.display = "block";
  }
}

email.addEventListener("input", () => {
  validateEmail(email, emailLabel, emailErrorMsg);
});

email.addEventListener("blur", () => {
  if (email.value === "") {
    emailErrorMsg.classList.add("unfocus");
  }
  validateEmail(email, emailLabel, emailErrorMsg);
});

email.addEventListener("focus", () => {
  emailLabel.classList.add("labelUp");
  if (emailErrorMsg.classList.contains("unfocus")) {
    emailErrorMsg.classList.remove("unfocus");
  }
});

// password validation below

const pwd = document.querySelector("#pwd");
const eightChar = document.querySelector("#eightChar");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const aNumber = document.querySelector("#a-number");
const repetition = document.querySelector("#repetition");
const usingnames = document.querySelector("#usingnames");
const pwdMeter = document.querySelector("#pwdMeter");
const pwdMeterLabel = document.querySelector("#pwdMeterLabel");
const pwdErrorMsg = document.querySelector(".pwdErrorMsg");
const pwdLabel = document.querySelector('label[for="pwd"]');

const eightCharPattern = /^.{8,}$/;
const uppercasePattern = /[A-Z]/;
const lowercasePattern = /[a-z]/;
const aNumberPattern = /[\d]/;
const repetitionPattern = /(.)\1/;

function validatePassword() {
  const pwdValue = pwd.value;
  const firstN = fName.value;
  const lastN = lName.value;

  eightChar.checked = eightCharPattern.test(pwdValue);
  uppercase.checked = uppercasePattern.test(pwdValue);
  lowercase.checked = lowercasePattern.test(pwdValue);
  aNumber.checked = aNumberPattern.test(pwdValue);
  usingnames.checked = checkNames(pwdValue, firstN, lastN);

  if (pwdValue === "") {
    repetition.checked = false;
    pwdLabel.style.display = "none";
  } else {
    repetition.checked = !repetitionPattern.test(pwdValue);
  }

  if (
    eightChar.checked &&
    uppercase.checked &&
    lowercase.checked &&
    aNumber.checked &&
    repetition.checked &&
    usingnames.checked
  ) {
    if (pwdValue.length >= 12) {
      pwdMeter.value = 3;
      pwdMeterLabel.textContent = "Strong";
      pwdLabel.style.display = "block";
      pwdErrorMsg.textContent = "";
    } else {
      pwdMeter.value = 2;
      pwdMeterLabel.textContent = "Medium";
      pwdLabel.style.display = "block";
      pwdErrorMsg.textContent = "";
    }
  } else {
    pwdErrorMsg.textContent = "Please enter a valid password";
    if (pwdValue.length > 0) {
      pwdMeter.value = 1;
      pwdMeterLabel.textContent = "Weak";
    } else {
      pwdMeter.value = 0;
      pwdMeterLabel.textContent = "";
    }
  }
}

pwd.addEventListener("input", validatePassword);

pwd.addEventListener("blur", () => {
  if (pwd.value === "") {
    pwdErrorMsg.classList.add("unfocus");
  }
  validatePassword();
});

pwd.addEventListener("focus", () => {
  pwdLabel.classList.add("labelUp");
  if (pwdErrorMsg.classList.contains("unfocus")) {
    pwdErrorMsg.classList.remove("unfocus");
  }
});

// helper function

function checkNames(pwdValue, firstN, lastN) {
  pwdValue = pwdValue.toLowerCase();
  firstN = firstN.toLowerCase();
  lastN = lastN.toLowerCase();

  if (pwdValue === "") {
    return false;
  }

  if (
    pwdValue !== firstN &&
    pwdValue !== lastN &&
    pwdValue !== `${firstN}${lastN}` &&
    pwdValue !== `${lastN}${firstN}`
  ) {
    return true;
  } else {
    return false;
  }
}
