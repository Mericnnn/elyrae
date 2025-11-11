const offerteForm = document.getElementById("offerteForm");
const offerteStatusMsg = document.getElementById("offerteStatusMsg");

offerteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(offerteForm).entries());
  const secretKey = "r4ad_Adm1n_offerte_2025_secret!@#"; // zelfde als OFFERTE_SECRET_KEY

  offerteStatusMsg.textContent = "Versturen...";

  try {
    const response = await fetch("/.netlify/functions/offerte-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, token: secretKey }),
    });

    const data = await response.json();

    if (data.success) {
      offerteStatusMsg.textContent = "Offerteaanvraag succesvol verstuurd! We nemen binnen 24u contact op.";
      offerteForm.reset();
    } else {
      offerteStatusMsg.textContent = `⚠️ Versturen mislukt: ${data.message || "Probeer later opnieuw."}`;
    }
  } catch (err) {
    console.error(err);
    offerteStatusMsg.textContent = "Er ging iets mis. Probeer later opnieuw.";
  }
});
