const overstapForm = document.getElementById("overstapForm");
const statusMsg = document.getElementById("statusMsg");

overstapForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(overstapForm).entries());
  const secretKey = "r4ad_Adm1n_ov3rstap_2025_secret!@#"; // zelfde als OVERSTAP_SECRET_KEY

  statusMsg.textContent = "Versturen...";

  try {
    const response = await fetch("/.netlify/functions/overstap-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, token: secretKey }),
    });

    const data = await response.json();

    if (data.success) {
      statusMsg.textContent = "Overstapaanvraag succesvol verstuurd! We nemen binnen 24u contact op.";
      overstapForm.reset();
    } else {
      statusMsg.textContent = `⚠️ Versturen mislukt: ${data.message || "Probeer later opnieuw."}`;
    }
  } catch (err) {
    console.error(err);
    statusMsg.textContent = "Er ging iets mis. Probeer later opnieuw.";
  }
});
