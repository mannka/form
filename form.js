"use strict";

// initialize form element variables
var orgNameField = document.querySelector('input[name="Company"]');
var addressField = document.querySelector('input[name="AddressLine1"]');
var cityField = document.querySelector('input[name="City"]');
var stateField = document.querySelector('select[name="State"]');
var zipcodeField = document.querySelector('input[name="ZipCode"]');
var merchantYesNoField = document.querySelector('select[name="MoreMIDs"]');
var firstNameField = document.querySelector('input[name="FirstName"]');
var lastNameField = document.querySelector('input[name="LastName"]');
var emailField = document.querySelector('input[name="Email"]');
var verifyEmailField = document.querySelector('input[name="Email2"]');
var secondaryEmailField = document.querySelector(
  'input[name="SecondaryEmail"]'
);
var verifySecondaryEmailField = document.querySelector(
  'input[name="SecondaryEmail2"]'
);
var serviceAgreementField = document.querySelector(
  'input[name="ServiceAgreement"]'
);
var merchantIdField = document.querySelector('input[name="MerchantID"]');
var merchantIDIssuerField = document.querySelector(
  'input[name="MerchantIDIssuer"]'
);
var startYearField = document.querySelector('select[name="MerchantIDStart"]');
var endYearField = document.querySelector('select[name="MerchantIDEnd"]');
var form = document.getElementById("mainForm");
var signatureField = document.getElementById("signature");
var radios = form.ServiceAgreement;
var agreeDiv = document.getElementById("agreeSection");
// var agreeRadio = document.getElementById("readAndAgree");
// var signLaterRadio = document.getElementById("signLater");
var errorElement = document.getElementById("errors");
var messages = [];
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// function to verify there is a value for input fields
function verifyValue(element) {
  if (element.value === "" || element.value == null) {
    element.classList.add("error-border");
    messages.push(`please enter ${element.placeholder}`);
  } else {
    element.classList.remove("error-border");
  }
}

// funciton to verify there is a value for option fields
function verifyOptionValue(element, text) {
  if (
    element.options[element.selectedIndex].value === "" ||
    element.options[element.selectedIndex].value == null
  ) {
    element.classList.add("error-border");
    messages.push(text);
  } else {
    element.classList.remove("error-border");
  }
}

// loop through radios and show signature field if checked
// var prev = null;
for (var i = 0; i < radios.length; i++) {
  radios[i].addEventListener("change", function() {
    // prev ? console.log(prev.value) : null;
    // if (this !== prev) {
    //   prev = this;
    // }
    // console.log(this.value);
    if (this.value === "ReadAndAgree") {
      signatureField.type = "text";
    } else {
      signatureField.value = "";
      signatureField.type = "hidden";
    }
  });
}

// handle form submission
form.addEventListener("submit", function(e) {
  // ensure the messages is cleared on each submit and remove error borders
  messages = [];

  // verify inputs and options have values
  verifyValue(orgNameField);
  verifyValue(addressField);
  verifyValue(cityField);
  verifyOptionValue(stateField, "Please select a State");
  verifyValue(zipcodeField);
  verifyOptionValue(
    merchantYesNoField,
    'Please select a value for "Has your organization used multiple Merchant ID numbers from 2004-2019?"'
  );

  // check if merchants fields have value and verify
  if (
    merchantIdField.value ||
    merchantIDIssuerField.value ||
    startYearField.value ||
    endYearField.value
  ) {
    verifyValue(merchantIdField);
    verifyValue(merchantIDIssuerField);
    verifyOptionValue(startYearField, "Please select Start year");
    verifyOptionValue(endYearField, "Please select End year");
  }

  verifyValue(firstNameField);
  verifyValue(lastNameField);

  if (verifyEmailField.value != emailField.value) {
    emailField.classList.add("error-border");
    verifyEmailField.classList.add("error-border");
    messages.push("Email address does not match");
  } else {
    emailField.classList.remove("error-border");
    verifyEmailField.classList.remove("error-border");
  }

  if (
    emailField.value === "" ||
    emailField.value == null ||
    !emailField.value.match(mailformat)
  ) {
    emailField.classList.add("error-border");
    messages.push("Please enter a valid email");
  } else {
    emailField.classList.remove("error-border");
  }

  if (!secondaryEmailField.value.length == 0) {
    if (verifySecondaryEmailField.value != secondaryEmailField.value) {
      secondaryEmailField.classList.add("error-border");
      verifySecondaryEmailField.classList.add("error-border");
      messages.push("Secondary email address does not match");
    } else {
      secondaryEmailField.classList.remove("error-border");
      verifySecondaryEmailField.classList.remove("error-border");
    }

    if (!secondaryEmailField.value.match(mailformat)) {
      secondaryEmailField.classList.add("error-border");
      messages.push("Please enter a valid secondary email");
    } else {
      secondaryEmailField.classList.remove("error-border");
    }
  }

  // check if radio is checked
  if (radios.value === "" || radios.value == null) {
    messages.push("please agree to the service agreement");
    agreeDiv.classList.add("error-border");
  } else {
    agreeDiv.classList.remove("error-border");
  }

  if (radios.value === "ReadAndAgree") {
    verifyValue(signatureField, "Please enter a Signature");
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerHTML = " ";
    var ul = document.createElement("ul");
    messages.map(function(error) {
      var li = document.createElement("li");
      var text = document.createTextNode(error);
      li.appendChild(text);
      ul.appendChild(li);
      errorElement.appendChild(ul);
    });
    // errorElement.innerText = messages.join(", ");
  }
});

console.log("loaded");
