window.addEventListener("load", () => {
  const orgNameField = document.querySelector('input[name="Company"]');
  const addressField = document.querySelector('input[name="AddressLine1"]');
  const cityField = document.querySelector('input[name="City"]');
  const stateField = document.querySelector('select[name="State"]');
  const zipcodeField = document.querySelector('input[name="ZipCode"]');
  const merchantYesNoField = document.querySelector('select[name="MoreMIDs"]');
  const firstNameField = document.querySelector('input[name="FirstName"]');
  const lastNameField = document.querySelector('input[name="LastName"]');
  const emailField = document.querySelector('input[name="Email"]');
  const verifyEmailField = document.querySelector('input[name="Email2"]');
  const secondaryEmailField = document.querySelector(
    'input[name="SecondaryEmail"]'
  );
  const verifySecondaryEmailField = document.querySelector(
    'input[name="SecondaryEmail2"]'
  );
  const serviceAgreementField = document.querySelector(
    'input[name="ServiceAgreement"]'
  );
  const merchantIdField = document.querySelector('input[name="MerchantID"]');
  const merchantIDIssuerField = document.querySelector(
    'input[name="MerchantIDIssuer"]'
  );
  const signatureRadio = document.getElementById("signature");
  const signLaterRadio = document.getElementById("signLater");
  const signatureField = document.getElementById("signature");

  const form = document.getElementById("mainForm");
  var radios = form.elements["ServiceAgreement"];

  const errorElement = document.getElementById("errors");
  let messages = [];

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  for (radio in radios) {
    radios[radio].onclick = function() {
      if (this.value == "ReadAndAgree") {
        signatureField.type = "text";
      } else {
        signatureField.type = "hidden";
      }
    };
  }

  const verifyValue = (element, text) => {
    if (element.value === "" || element.value == null) {
      element.classList.add("error-border");
      messages.push(text);
    } else {
      element.classList.remove("error-border");
    }
  };

  const verifyOptionValue = (element, text) => {
    if (
      element.options[element.selectedIndex].value === "" ||
      element.options[element.selectedIndex].value == null
    ) {
      element.classList.add("error-border");
      messages.push(text);
    } else {
      element.classList.remove("error-border");
    }
  };

  form.addEventListener("submit", e => {
    messages = [];
    merchantIDIssuerField.classList.remove("error-border");
    merchantIdField.classList.remove("error-border");
    if (merchantIdField.value) {
      if (
        merchantIDIssuerField.value === "" ||
        merchantIDIssuerField.value == null
      ) {
        merchantIDIssuerField.classList.add("error-border");
        messages.push(
          "Merchant Issuer ID is required if Merchant ID is entered"
        );
      }
    }

    if (merchantIDIssuerField.value) {
      if (merchantIdField.value === "" || merchantIdField.value == null) {
        merchantIdField.classList.add("error-border");
        messages.push(
          "Merchant ID is required if Merchant ID Issuer is entered"
        );
      }
    }

    verifyValue(orgNameField, "please enter an organization name");
    verifyValue(addressField, "Please enter an address");
    verifyValue(cityField, "Please enter a city");
    verifyOptionValue(stateField, "Please select a state");
    verifyValue(zipcodeField, "Please enter a Zipcode");
    verifyOptionValue(
      merchantYesNoField,
      'Please select a value for "Has your organization used multiple Merchant ID numbers from 2004-2019?"'
    );
    verifyValue(firstNameField, "Please enter a first name");
    verifyValue(lastNameField, "Please enter a last name");

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

    if (messages.length > 0) {
      e.preventDefault();
      errorElement.innerHTML = " ";
      const ul = document.createElement("ul");
      messages.map(error => {
        const li = document.createElement("li");
        const text = document.createTextNode(error);
        li.appendChild(text);
        ul.appendChild(li);
        errorElement.appendChild(ul);
      });
      // errorElement.innerText = messages.join(", ");
    }
  });
  console.log("in");
});
console.log("out");
