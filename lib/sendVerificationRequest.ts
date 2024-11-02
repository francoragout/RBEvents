import React from "react";
import { render } from "@react-email/render";
import Email from "../emails/verification-email";

export async function sendVerificationRequest(params: any) {
  const { identifier: to, provider, url } = params;
  const { host } = new URL(url);
  const emailHtml = await render(React.createElement(Email, { url, host }));

  const requestBody = {
    from: provider.from,
    to,
    subject: `Correo de verificación`,
    html: String(emailHtml),
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error("Resend error: " + JSON.stringify(errorResponse));
  }
}
