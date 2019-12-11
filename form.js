window.onload = () => {
  const merchantID = document.querySelector('input[name="MerchantID"]');
  const merchantIDIssuer = document.querySelector(
    'input[name="MerchantIDIssuer"]'
  );
  const form = document.getElementById("brownstone-form");
  const errorElement = document.getElementById("error");

  form.addEventListener("submit", e => {
    let messages = [];
    if (merchantID.value) {
      if (merchantIDIssuer.value === "" || merchantIDIssuer.value == null) {
        messages.push(
          "Merchant Issuer ID is required if Merchant ID is entered"
        );
      }
    }

    if (merchantIDIssuer.value) {
      if (merchantID.value === "" || merchantID.value == null) {
        messages.push(
          "Merchant ID is required if Merchant ID Issuer is entered"
        );
      }
    }

    if (messages.length > 0) {
      e.preventDefault();
      alert("prevented");
      errorElement.innerText = messages.join(", ");
    }
  });
};
