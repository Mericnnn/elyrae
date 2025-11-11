const form = document.getElementById("overstapForm");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form).entries());
  const secretKey = "r4ad_Adm1n_ov3rstap_2025_secret!@#"; // zelfde als backend

  statusMsg.textContent = "⏳ Versturen...";

  try {
    const response = await fetch("/.netlify/functions/overstap-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, token: secretKey }),
    });

    const data = await response.json();

    if (data.success) {
      statusMsg.textContent = "✅ Aanvraag succesvol verstuurd! We nemen spoedig contact op.";
      form.reset();
    } else {
      statusMsg.textContent = "⚠️ Versturen mislukt, probeer later opnieuw.";
    }
  } catch (err) {
    console.error(err);
    statusMsg.textContent = "❌ Er ging iets mis. Probeer later opnieuw.";
  }
});