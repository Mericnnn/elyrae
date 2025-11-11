import nodemailer from "nodemailer";

export const handler = async (event) => {
  const allowedOrigin = "https://raad-administratie.nl";
  const secretKey = process.env.OFFERTE_SECRET_KEY; // Zet dit in Netlify Environment

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

    // SMTP transporter voor TransIP
    const transporter = nodemailer.createTransport({
      host: "smtp.transip.email",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Mail samenstellen
    await transporter.sendMail({
      from: `"RAAD Administratie" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Nieuwe offerteaanvraag van ${body.naam}`,
      html: `
        <p><strong>Naam:</strong> ${body.naam}</p>
        <p><strong>Bedrijf:</strong> ${body.bedrijf || "–"}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Telefoon:</strong> ${body.telefoon}</p>
        <p><strong>Dienst:</strong> ${body.dienst}</p>
        <p><strong>Bericht:</strong><br>${body.bericht}</p>
      `,
    });

    console.log("✅ Offerte-aanvraag verzonden:", body);

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
