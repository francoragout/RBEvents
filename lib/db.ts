import { PrismaClient } from "@prisma/client";

// Declarar global para incluir la variable prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Inicializar el cliente de Prisma, reutilizar si ya existe en globalThis
export const db = globalThis.prisma || new PrismaClient();

// En entornos de desarrollo, asignar prisma a la instancia de Prisma
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
