
import { Resend } from "resend";
import * as React from "react";
import { render } from "@react-email/render";
import NewEventEmail from "@/emails/new-event-email";
import VerificationRequestEmail from "@/emails/verification-request-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewEvent(email: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "no-reply@rbeventos.org",
      to: email,
      subject: "Nuevo evento pendiente",
      react: NewEventEmail(name) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function sendVerificationRequest(params: any) {
  const { identifier: to, provider, url } = params;
  const { host } = new URL(url);
  const emailHtml = await render(React.createElement(VerificationRequestEmail, { url, host }));

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
