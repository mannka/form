window.onload = () => {
  const merchantID = document.querySelector('input[name="MerchantID"]');
  const merchantIDIssuer = document.querySelector(
    'input[name="MerchantIDIssuer"]'
  );
  const form = document.getElementById("brownstone-form");
  const errorElement = document.getElementById("error");

  form.addEventListener("submit", e => {
    let messages = [];
    if (merchantIDIssuer.value === "" || merchantIDIssuer.value == null) {
      messages.push("Merchant Issuer ID is required if Merchant ID is entered");
    }

    if (messages) {
      e.preventDefault();
      errorElement.innerText = messages.join(", ");
    }
  });

  function validation() {
    var company = document.forms["brownstone-form"]["Company"];

    if (name.value == "") {
      window.alert("Please enter your name.");
      name.focus();
      return false;
    }

    if (address.value == "") {
      window.alert("Please enter your address.");
      address.focus();
      return false;
    }

    if (email.value == "") {
      window.alert("Please enter a valid e-mail address.");
      email.focus();
      return false;
    }

    if (phone.value == "") {
      window.alert("Please enter your telephone number.");
      phone.focus();
      return false;
    }

    if (password.value == "") {
      window.alert("Please enter your password");
      password.focus();
      return false;
    }

    if (what.selectedIndex < 1) {
      alert("Please enter your course.");
      what.focus();
      return false;
    }

    return true;
  }
};

const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};
