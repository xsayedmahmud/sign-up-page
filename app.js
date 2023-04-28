const form = document.querySelector("form");
const fName = document.querySelector("#fName");
const lName = document.querySelector("#lName");
const email = document.querySelector("#email");

const phonenum = document.querySelector("#phonenum");

// password validation below

const pwd = document.querySelector("#pwd");
const eightChar = document.querySelector("#eightChar");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const aNumber = document.querySelector("#a-number");
const repetition = document.querySelector("#repetition");
const usingnames = document.querySelector("#usingnames");
const pwdMeter = document.querySelector("#pwdMeter");
const pwdLabel = document.querySelector("#pwdLabel");
const pwdErrorMsg = document.querySelector(".pwdErrorMsg");

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
    pwd.setCustomValidity("");
    if (pwdValue.length >= 12) {
      pwdMeter.value = 3;
      pwdLabel.textContent = "Strong";
    } else {
      pwdMeter.value = 2;
      pwdLabel.textContent = "Medium";
    }
  } else {
    pwdErrorMsg.textContent = "Please enter a valid password";
    if (pwdValue.length > 0) {
      pwdMeter.value = 1;
      pwdLabel.textContent = "Weak";
    } else {
      pwdMeter.value = 0;
      pwdLabel.textContent = "";
    }
  }
}

pwd.addEventListener("input", validatePassword);

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
