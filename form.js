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
