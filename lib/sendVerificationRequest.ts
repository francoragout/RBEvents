import React from "react";
import { render } from "@react-email/render";
import Email from "../emails/verification-email";

export async function sendVerificationRequest(params: any) {
  const { identifier: to, provider, url } = params;
  const { host } = new URL(url);
  const emailHtml = render(React.createElement(Email, { url, host }));

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `Sign in to ${host}`,
      html: emailHtml,
      text: text({ url, host }),
    }),
  });

  if (!res.ok)
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
