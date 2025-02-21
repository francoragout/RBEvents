import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Img,
} from "@react-email/components";
import * as React from "react";

export default function NewEventEmail(name: string) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo evento pendiente</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://rbeventos.org/rbeventosemail.png`}
            alt="RBEventos"
            style={logo}
          />
          <Heading style={codeTitle}>
            Tienes un nuevo evento pendiente: &apos;{name}&apos;
          </Heading>
          <Text style={codeDescription}>
            Inicia sesión en RB Eventos con el mismo email registrado.
          </Text>
          <Section style={buttonContainer}>
            <Button
              href="https://rbeventos.org/authentication"
              style={button}
              target="_self"
            >
              Ir a RB Eventos
            </Button>
          </Section>
          <Text style={paragraph}>
            Si no solicitaste este correo puedes ignorarlo con seguridad.
          </Text>
          <Text style={paragraph}>
            Contacto{" "}
            <Link href="rbeventos.tuc@gmail.com" style={link}>
              rbeventos.tuc@gmail.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const logo = {
  borderRadius: 21,
  width: 200,
  height: 200,
  display: "block",
  margin: "0 auto",
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  textAlign: "center" as const,
  color: "#000000",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  borderRadius: "5px",
  marginTop: "20px",
  width: "480px",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "3% 5%",
};

const codeTitle = {
  textAlign: "center" as const,
  color: "#000000",
};

const codeDescription = {
  textAlign: "center" as const,
  color: "#000000",
};

const buttonContainer = {
  margin: "27px auto",
  width: "auto",
};

const button = {
  backgroundColor: "hsl(346.8, 77.2%, 49.8%)",
  borderRadius: "5px",
  fontWeight: "600",
  color: "#fff",
  textAlign: "center" as const,
  padding: "12px 24px",
  margin: "0 auto",
};

const paragraph = {
  color: "#444444",
  letterSpacing: "0",
  padding: "0 40px",
  margin: "0",
  textAlign: "center" as const,
};

const link = {
  color: "#444444", // Ensure link color is dark grey
  textDecoration: "underline",
};
