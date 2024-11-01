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
    subject: `Iniciar sesión en: ${host}`,
    html: emailHtml,
    text: text({ url, host }),
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

function text({ url, host }: { url: string; host: string }) {
  return `Iniciar sesión ${host}\n${url}\n\n`;
}
