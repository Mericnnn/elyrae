const contactForm = document.getElementById("contactForm");
const contactStatusMsg = document.getElementById("contactStatusMsg");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(contactForm).entries());
  const secretKey = "r4ad_Adm1n_contact_2025_secret!@#"; // zelfde als in backend

  contactStatusMsg.textContent = "Versturen...";

  try {
    const response = await fetch("/.netlify/functions/contact-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, token: secretKey }),
    });

    const data = await response.json();

    if (data.success) {
      contactStatusMsg.textContent = "Bericht succesvol verstuurd! We nemen binnen 24u contact op.";
      contactForm.reset();
    } else {
      contactStatusMsg.textContent = "⚠️ Versturen mislukt, probeer later opnieuw.";
    }
  } catch (err) {
    console.error(err);
    contactStatusMsg.textContent = "Er ging iets mis. Probeer later opnieuw.";
  }
});
