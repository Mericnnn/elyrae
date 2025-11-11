import fetch from "node-fetch";

export const handler = async (event) => {
  const allowedOrigin = "https://raad-administratie.nl";
  const secretKey = "r4ad_Adm1n_offerte_2025_secret!@#";

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

    if (body.token !== secretKey) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ success: false, message: "Ongeldige sleutel" }),
      };
    }

    const origin = event.headers.origin || "";
    if (!origin.includes("raad-administratie.nl")) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ success: false, message: "Ongeldig domein" }),
      };
    }

    const formspreeEndpoint = "https://formspree.io/f/mqawkyvw"; // jouw Formspree endpoint
    await fetch(formspreeEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        naam: body.naam,
        email: body.email,
        telefoon: body.telefoon,
        bedrijf: body.bedrijf,
        dienst: body.dienst,
        bericht: body.bericht,
      }),
    });

    console.log("✅ Offerte-aanvraag verstuurd via Formspree:", body);

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
