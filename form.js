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
var errorElement = document.getElementById("errors");
var messages = [];
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var refCode = document.getElementById("refCode");
var refMsg = document.getElementById("refMsg");
var ref1 = document.getElementById("30-1");
var ref2 = document.getElementById("30-2");

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

refCode.addEventListener("blur", event => {
  fetch(
    `https://43k8h1qbx6.execute-api.us-west-1.amazonaws.com/default/BRG-referral-code-check?refcode=${refCode.value}`,
    {
      headers: {
        "x-api-key": "gFZ52tAaHi9nr2diLWCwYi3qctC0x309lOdd7IY4"
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);

      if (data.refcode === "" || data.refcode == null) {
      } else {
        if (data.percent == "not found") {
          refMsg.innerHTML = "Referral code not valid";
        } else {
          refMsg.innerHTML = "Referral code applied";
          ref1.innerHTML = data.percent;
          ref2.innerHTML = data.percent;
        }
      }
    })
    .catch(err => {
      console.log("there was an error");
      console.log(err);
    });
});

// handle form submission
form.addEventListener("submit", function(e) {
  e.preventDefault();
  var fetchValue;

  if (refCode.value == null || refCode.value == "") {
    fetchValue = "null";
  } else {
    fetchValue = refCode.value;
  }

  console.log(fetchValue);

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
  } else {
    form.submit();
    var div = document.createElement("div");
    var h2 = document.createElement("h2");
    var thankYou = document.createTextNode("Thank You");
    var p = document.createElement("p");
    var paragraph = document.createTextNode(
      "Your form has been successfully submitted. You will receive an email shortly with the next steps on completing the contract."
    );
    var rootDiv = document.getElementById("rootForm");
    p.appendChild(paragraph);
    p.classList.add("thankYouMessage");
    h2.appendChild(thankYou);
    h2.style.cssText = "text-align: center;font-size: 3rem;padding: 2rem";
    h2.classList.add("thankYouHeader");
    div.appendChild(h2);
    div.appendChild(p);
    div.style.cssText = "text-align: center;";
    rootDiv.innerHTML = "";
    rootDiv.appendChild(div);
  }

  var placeSearch, autocomplete;

  var componentForm = {
    // street_number: "short_name",
    // route: "long_name"
    // locality: "long_name",
    // administrative_area_level_1: "short_name",
    // country: "long_name",
    // postal_code: "short_name"
  };

  function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      { types: ["geocode"] }
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(["address_component"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener("place_changed", fillInAddress);
  }

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
      document.getElementById(component).value = "";
      document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }

    document.getElementById("autocomplete").value =
      place.address_components[0]["long_name"] +
      " " +
      place.address_components[1]["long_name"];

    document.getElementById("city").value =
      place.address_components[3]["long_name"];

    var val;

    place.address_components.forEach(e => {
      if (e.types[0] == "administrative_area_level_1") {
        val = e.long_name;
      } else if (e.types[0] == "postal_code") {
        document.getElementById("zipcode").value = e.long_name;
      }
    });
    var sel = document.getElementById("state");
    var opts = sel.options;
    for (var opt, j = 0; (opt = opts[j]); j++) {
      if (opt.value == val) {
        sel.selectedIndex = j;
        break;
      }
    }
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  google.maps.event.addDomListener(window, "load", initAutocomplete);

  console.log("loaded");
});
