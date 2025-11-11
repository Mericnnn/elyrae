import fetch from "node-fetch";

export const handler = async (event) => {
  const allowedOrigin = "https://raad-administratie.nl"; // jouw domein
  const secretKey = "r4ad_Adm1n_ov3rstap_2025_secret!@#"; // zelfde als in frontend

  const headers = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    // ✅ Token check
    if (body.token !== secretKey) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ success: false, message: "Ongeldige sleutel" }),
      };
    }

    // ✅ Domein check
    const origin = event.headers.origin || "";
    if (!origin.includes("raad-administratie.nl")) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ success: false, message: "Ongeldig domein" }),
      };
    }

    // ✅ Verstuur naar Formspree
    const formspreeEndpoint = "https://formspree.io/f/mgvrenaa"; // jouw endpoint
    await fetch(formspreeEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone,
        bedrijf: body.bedrijf,
        message: body.message,
      }),
    });

    console.log("✅ Overstap-aanvraag verstuurd via Formspree:", body);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("❌ Fout in function:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};